/* ============================================
   Liner — Main Application Controller
   ============================================ */

const app = {
  // State
  currentView: 'today',
  selectedMood: null,
  editingDate: null,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth(),
  currentPhoto: null,

  // ── Initialization ──
  init() {
    // Wait for DB to be ready, then initialize
    DB.ready.then(() => {
      this._doInit();
    }).catch(() => {
      // Even if IndexedDB fails, init with empty state
      this._doInit();
    });
  },

  _doInit() {
    // Load settings
    const settings = DB.getSettings();
    this.setTheme(settings.theme || 'system');
    document.getElementById('theme-select').value = settings.theme || 'system';

    // Set today's date
    const today = new Date();
    document.getElementById('today-date').textContent = Utils.formatDate(today);

    // Show daily prompt
    document.getElementById('daily-prompt').textContent = Utils.getDailyPrompt();

    // Load today's entry if exists
    this.loadTodayEntry();

    // Update stats
    UI.updateSidebarStats();

    // Render recent entries
    UI.renderRecentEntries();

    // Render On This Day
    this.renderOnThisDay();

    // Initial calendar render
    UI.renderCalendar(this.calendarYear, this.calendarMonth);

    // Initial mood insights
    UI.renderMoodInsights();

    // Initial settings
    UI.renderSettings();
  },

  // ── View Switching ──
  switchView(view) {
    this.currentView = view;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });

    // Update view title
    const titles = {
      today: 'Today',
      calendar: 'Calendar',
      mood: 'Mood Insights',
      search: 'Search',
      settings: 'Settings'
    };
    document.getElementById('view-title').textContent = titles[view] || 'Liner';

    // Show/hide views
    document.querySelectorAll('.view').forEach(el => {
      el.classList.toggle('active', el.id === `view-${view}`);
    });

    // Refresh data as needed
    if (view === 'mood') {
      UI.renderMoodInsights();
      UI.updateSidebarStats();
    }
    if (view === 'calendar') {
      UI.renderCalendar(this.calendarYear, this.calendarMonth);
    }

    // Close sidebar on mobile
    this.closeSidebar();
  },

  // ── Sidebar ──
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('show');
  },

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('show');
  },

  // ── Entry Management ──
  loadTodayEntry() {
    const todayISO = Utils.todayISO();
    const entry = DB.get(todayISO);

    if (entry) {
      document.getElementById('entry-text').value = entry.text || '';
      this.selectedMood = entry.mood || null;
      this.editingDate = todayISO;
      this.currentPhoto = entry.photo || null;
      this.updateCharCount();
      this.updateMoodSelection();
      this.updateSaveButton();
      this.updatePhotoPreview();
    } else {
      document.getElementById('entry-text').value = '';
      this.selectedMood = null;
      this.editingDate = todayISO;
      this.currentPhoto = null;
      this.updateCharCount();
      this.updateMoodSelection();
      this.updateSaveButton();
      this.updatePhotoPreview();
    }
  },

  setMood(mood) {
    this.selectedMood = mood;
    this.updateMoodSelection();
    this.updateSaveButton();
  },

  updateMoodSelection() {
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.mood === this.selectedMood);
    });
  },

  onEntryChange() {
    this.updateCharCount();
    this.updateSaveButton();
  },

  updateCharCount() {
    const text = document.getElementById('entry-text').value;
    document.getElementById('char-count').textContent = `${text.length} / 500`;
  },

  updateSaveButton() {
    const text = document.getElementById('entry-text').value.trim();
    const hasContent = text.length > 0 || this.selectedMood || this.currentPhoto;
    document.getElementById('btn-save').disabled = !hasContent;
    document.getElementById('btn-clear').disabled = !hasContent;
  },

  // ── Photo Handling ──
  handlePhoto(file) {
    if (!file) return;
    Utils.compressPhoto(file).then(dataUrl => {
      this.currentPhoto = dataUrl;
      this.updatePhotoPreview();
      this.updateSaveButton();
    }).catch(err => {
      console.error('Photo compress failed:', err);
      UI.toast('❌ Failed to process photo');
    });
  },

  removePhoto() {
    this.currentPhoto = null;
    this.updatePhotoPreview();
    this.updateSaveButton();
  },

  updatePhotoPreview() {
    const preview = document.getElementById('photo-preview');
    const img = document.getElementById('photo-preview-img');
    const removeBtn = document.getElementById('photo-remove');

    if (this.currentPhoto) {
      img.src = this.currentPhoto;
      preview.classList.remove('hidden');
      preview.style.display = 'flex';
    } else {
      preview.classList.add('hidden');
      preview.style.display = 'none';
    }
  },

  saveEntry() {
    const text = document.getElementById('entry-text').value.trim();
    if (!text && !this.selectedMood && !this.currentPhoto) return;

    const dateISO = Utils.todayISO();
    const entryData = {
      text: text || '',
      mood: this.selectedMood || null
    };
    if (this.currentPhoto) {
      entryData.photo = this.currentPhoto;
    }

    DB.set(dateISO, entryData);

    UI.toast('✨ Saved!');
    this.loadTodayEntry();
    UI.renderRecentEntries();
    UI.updateSidebarStats();
    UI.renderMoodInsights();
    this.renderOnThisDay();

    // Clear button state
    document.getElementById('btn-save').disabled = true;
    document.getElementById('btn-clear').disabled = true;
  },

  clearEntry() {
    const dateISO = Utils.todayISO();
    if (DB.get(dateISO)) {
      DB.delete(dateISO);
    }
    document.getElementById('entry-text').value = '';
    this.selectedMood = null;
    this.currentPhoto = null;
    this.editingDate = dateISO;
    this.updateMoodSelection();
    this.updateCharCount();
    this.updateSaveButton();
    this.updatePhotoPreview();
    UI.renderRecentEntries();
    UI.updateSidebarStats();
    UI.renderMoodInsights();
    this.renderOnThisDay();
    UI.toast('Entry cleared');
  },

  deleteEntry(dateISO) {
    this.confirmAction('Delete Entry', 'Delete this entry forever?', () => {
      DB.delete(dateISO);
      UI.renderRecentEntries();
      UI.updateSidebarStats();
      UI.renderMoodInsights();
      UI.renderCalendar(this.calendarYear, this.calendarMonth);
      this.renderOnThisDay();
      if (dateISO === Utils.todayISO()) {
        this.loadTodayEntry();
      }
      UI.toast('Deleted');
    });
  },

  // ── On This Day ──
  getOnThisDayEntries() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    const all = DB.getAll();
    return Object.values(all).filter(e => {
      if (!e.date) return false;
      const d = new Date(e.date + 'T12:00:00');
      return d.getMonth() === currentMonth &&
             d.getDate() === currentDay &&
             d.getFullYear() !== currentYear;
    }).sort((a, b) => b.date.localeCompare(a.date));
  },

  renderOnThisDay() {
    if (document.getElementById('on-this-day')) {
      UI.renderOnThisDay(this.getOnThisDayEntries());
    }
  },

  // ── Calendar ──
  calendarNav(delta) {
    this.calendarMonth += delta;
    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }
    UI.renderCalendar(this.calendarYear, this.calendarMonth);
    document.getElementById('calendar-day-detail').style.display = 'none';
  },

  showCalendarDay(dateStr) {
    UI.showCalendarDayEntry(dateStr);
  },

  calendarClearDetail() {
    document.getElementById('calendar-day-detail').style.display = 'none';
  },

  // ── Search ──
  doSearch: Utils.debounce(function(query) {
    UI.renderSearchResults(query);
  }, 200),

  // ── Theme ──
  cycleTheme() {
    const themes = ['system', 'light', 'dark'];
    const current = DB.getSettings().theme || 'system';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    this.setTheme(next);
    const settings = DB.getSettings();
    settings.theme = next;
    DB.saveSettings(settings);
    document.getElementById('theme-select').value = next;
    UI.toast(`Theme: ${next}`);
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update theme-color meta
    const meta = document.getElementById('theme-meta');
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      meta.setAttribute('content', '#1a1a1e');
    } else {
      meta.setAttribute('content', '#f5f0eb');
    }
    // Persist
    const settings = DB.getSettings();
    settings.theme = theme;
    DB.saveSettings(settings);
  },

  // ── Data Management ──
  exportData() {
    const data = DB.exportJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = `liner-backup-${Utils.todayISO()}.json`;
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    UI.toast('📦 Data exported!');
  },

  exportMarkdown() {
    const all = DB.getAll();
    const entries = Object.values(all).sort((a, b) => a.date.localeCompare(b.date));

    let md = `# Liner Journal Export\n\n`;
    md += `Exported on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;
    md += `---\n\n`;

    entries.forEach(e => {
      const displayDate = new Date(e.date + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      md += `## ${displayDate}\n\n`;
      if (e.mood) md += `**Mood:** ${Utils.moodEmoji(e.mood)} ${Utils.moodLabel(e.mood)}\n\n`;
      md += `${e.text}\n\n`;
      if (e.photo) md += `*(photo attached)*\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const filename = `liner-export-${Utils.todayISO()}.md`;
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    UI.toast('📄 Markdown exported!');
  },

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const success = DB.importJSON(e.target.result);
      if (success) {
        UI.toast('📥 Data imported!');
        this.loadTodayEntry();
        UI.renderRecentEntries();
        UI.updateSidebarStats();
        UI.renderMoodInsights();
        UI.renderCalendar(this.calendarYear, this.calendarMonth);
        this.renderOnThisDay();
        event.target.value = '';
      } else {
        UI.toast('❌ Import failed — invalid file');
      }
    };
    reader.readAsText(file);
  },

  confirmDeleteAll() {
    this.confirmAction(
      'Delete Everything?',
      'This will permanently delete ALL your entries. This cannot be undone. Export a backup first if you want to keep your data.',
      () => {
        DB.clearAll();
        this.loadTodayEntry();
        UI.renderRecentEntries();
        UI.updateSidebarStats();
        UI.renderMoodInsights();
        UI.renderCalendar(this.calendarYear, this.calendarMonth);
        UI.toast('All entries deleted');
      }
    );
  },

  // ── Modal ──
  confirmAction(title, text, onConfirm) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').textContent = text;
    document.getElementById('modal-overlay').style.display = 'flex';
    const btn = document.getElementById('modal-confirm-btn');
    btn.onclick = () => {
      this.closeModal();
      onConfirm();
    };
  },

  closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
  },

  // ── Auto-save on page unload ──
  handleBeforeUnload() {
    const text = document.getElementById('entry-text').value.trim();
    if (text || this.selectedMood || this.currentPhoto) {
      const dateISO = Utils.todayISO();
      const entryData = {
        text: text || '',
        mood: this.selectedMood || null
      };
      if (this.currentPhoto) {
        entryData.photo = this.currentPhoto;
      }
      DB.set(dateISO, entryData);
    }
  }
};

// ── Initialize on DOM ready ──
document.addEventListener('DOMContentLoaded', () => app.init());
window.addEventListener('beforeunload', () => app.handleBeforeUnload());
