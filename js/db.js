/* ============================================
   Liner — Local Database
   IndexedDB backed with in-memory cache.
   Public API matches the original localStorage
   interface for backward compatibility.
   ============================================ */

const DB = (() => {
  const DB_NAME = 'liner-db';
  const DB_VERSION = 1;
  const STORE_NAME = 'entries';
  const SETTINGS_KEY = 'liner_settings';

  let _db = null;
  let _cache = {};       // in-memory cache: { dateISO: entry }
  let _ready = false;
  let _readyPromise = null;

  // ── Internal IndexedDB helpers ──

  function _openDB() {
    return new Promise((resolve, reject) => {
      if (_db) { resolve(_db); return; }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const store = database.createObjectStore(STORE_NAME, { keyPath: 'date' });
          store.createIndex('text', 'text', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        _db = event.target.result;
        resolve(_db);
      };

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  function _getAllFromIndexedDB() {
    return new Promise((resolve, reject) => {
      _openDB().then(database => {
        const tx = database.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(new Error('Failed to get all entries'));
      }).catch(reject);
    });
  }

  function _putToIndexedDB(entry) {
    return new Promise((resolve, reject) => {
      _openDB().then(database => {
        const tx = database.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(entry);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to put entry'));
      }).catch(reject);
    });
  }

  function _deleteFromIndexedDB(dateISO) {
    return new Promise((resolve, reject) => {
      _openDB().then(database => {
        const tx = database.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(dateISO);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to delete entry'));
      }).catch(reject);
    });
  }

  function _clearIndexedDB() {
    return new Promise((resolve, reject) => {
      _openDB().then(database => {
        const tx = database.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error('Failed to clear entries'));
      }).catch(reject);
    });
  }

  // ── Cache sync ──

  function _syncCacheFromDB() {
    return _getAllFromIndexedDB().then(entries => {
      _cache = {};
      entries.forEach(e => {
        _cache[e.date] = e;
      });
      _ready = true;
    });
  }

  function _init() {
    if (_readyPromise) return _readyPromise;
    _readyPromise = _syncCacheFromDB();
    return _readyPromise;
  }

  // ── Public API ──

  return {
    /** Promise that resolves when IndexedDB cache is loaded */
    ready: _init(),

    // Get all entries as { dateISO: entry, ... }
    getAll() {
      if (!_ready) console.warn('DB: getAll called before ready');
      return { ..._cache };
    },

    // Get entry by date (ISO string YYYY-MM-DD)
    get(dateISO) {
      if (!_ready) console.warn('DB: get called before ready');
      return _cache[dateISO] || null;
    },

    // Save or update entry for a date
    set(dateISO, entry) {
      const updated = {
        ...entry,
        date: dateISO,
        updatedAt: new Date().toISOString()
      };
      _cache[dateISO] = updated;
      _putToIndexedDB(updated).catch(err => {
        console.error('IndexedDB write failed:', err);
      });
      return updated;
    },

    // Delete entry for a date
    delete(dateISO) {
      delete _cache[dateISO];
      _deleteFromIndexedDB(dateISO).catch(err => {
        console.error('IndexedDB delete failed:', err);
      });
    },

    // Get entries sorted by date descending
    getRecent(limit = 20) {
      return Object.values(_cache)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit);
    },

    // Search entries by text
    search(query) {
      if (!query || query.trim() === '') return [];
      const q = query.toLowerCase().trim();
      return Object.values(_cache)
        .filter(e => e.text && e.text.toLowerCase().includes(q))
        .sort((a, b) => b.date.localeCompare(a.date));
    },

    // Get entries for a specific month
    getMonth(year, month) {
      const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
      return Object.values(_cache).filter(e => e.date && e.date.startsWith(prefix));
    },

    // Get entry count
    count() {
      return Object.keys(_cache).length;
    },

    // Calculate current streak (consecutive days up to today)
    getStreak() {
      const dates = Object.keys(_cache).sort().reverse();
      if (dates.length === 0) return 0;

      const today = Utils.todayISO();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = Utils.formatDateISO(yesterday);

      if (dates[0] !== today && dates[0] !== yesterdayISO) {
        return 0;
      }

      let streak = 1;
      for (let i = 1; i < dates.length; i++) {
        const prev = new Date(dates[i - 1] + 'T12:00:00');
        const curr = new Date(dates[i] + 'T12:00:00');
        const diff = (prev - curr) / 86400000;
        if (Math.round(diff) === 1) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    },

    // Get the longest streak ever
    getLongestStreak() {
      const dates = Object.keys(_cache).sort();
      if (dates.length === 0) return 0;

      let longest = 1;
      let current = 1;

      for (let i = 1; i < dates.length; i++) {
        const prev = new Date(dates[i - 1] + 'T12:00:00');
        const curr = new Date(dates[i] + 'T12:00:00');
        const diff = (curr - prev) / 86400000;
        if (Math.round(diff) === 1) {
          current++;
          longest = Math.max(longest, current);
        } else {
          current = 1;
        }
      }

      return longest;
    },

    // Mood statistics
    getMoodStats() {
      const counts = {
        great: 0, good: 0, okay: 0, meh: 0, bad: 0,
        stressed: 0, amazing: 0, tired: 0
      };
      Object.values(_cache).forEach(e => {
        if (e.mood && counts.hasOwnProperty(e.mood)) {
          counts[e.mood]++;
        }
      });
      return counts;
    },

    // Most common mood
    getMostCommonMood() {
      const stats = this.getMoodStats();
      let max = 0;
      let most = null;
      Object.entries(stats).forEach(([mood, count]) => {
        if (count > max) {
          max = count;
          most = mood;
        }
      });
      return most;
    },

    // Get this week's average mood
    getThisWeekMood() {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);

      let total = 0;
      let count = 0;

      Object.values(_cache).forEach(e => {
        const entryDate = new Date(e.date + 'T12:00:00');
        if (entryDate >= startOfWeek && e.mood) {
          total += Utils.moodScore(e.mood);
          count++;
        }
      });

      if (count === 0) return null;
      const avg = total / count;
      if (avg >= 4.5) return 'great';
      if (avg >= 3.5) return 'good';
      if (avg >= 2.5) return 'okay';
      if (avg >= 1.5) return 'meh';
      return 'bad';
    },

    // Export all data as JSON string
    exportJSON() {
      return JSON.stringify(_cache, null, 2);
    },

    // Import data from JSON string
    importJSON(jsonStr) {
      try {
        const data = JSON.parse(jsonStr);
        if (typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('Invalid format');
        }
        // Validate entries
        Object.entries(data).forEach(([key, val]) => {
          if (!val.date || !val.text) {
            throw new Error(`Invalid entry: ${key}`);
          }
        });
        // Write to cache
        _cache = {};
        Object.entries(data).forEach(([key, val]) => {
          _cache[key] = val;
        });
        // Write to IndexedDB (fire and forget)
        Object.values(data).forEach(entry => {
          _putToIndexedDB(entry).catch(err => {
            console.error('IndexedDB write during import failed:', err);
          });
        });
        return true;
      } catch (e) {
        console.error('Import failed:', e);
        return false;
      }
    },

    // Delete all data
    clearAll() {
      _cache = {};
      _clearIndexedDB().catch(err => {
        console.error('IndexedDB clear failed:', err);
      });
    },

    // Settings (kept in localStorage — tiny data, fast access)
    getSettings() {
      try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        return raw ? JSON.parse(raw) : { theme: 'system' };
      } catch {
        return { theme: 'system' };
      }
    },

    saveSettings(settings) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  };
})();
