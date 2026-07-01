/* ============================================
   Liner — UI Rendering Helpers
   ============================================ */

const UI = {
  // Show a toast notification
  toast(message, duration = 2500) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  },

  // Update sidebar stats
  updateSidebarStats() {
    document.getElementById('stat-entries').textContent = DB.count();
    document.getElementById('stat-streak').textContent = DB.getStreak();
    document.getElementById('stat-total-days').textContent = Object.keys(DB.getAll()).length;
  },

  // Render recent entries on the Today view
  renderRecentEntries() {
    const container = document.getElementById('recent-entries');
    const entries = DB.getRecent(10);

    if (entries.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No entries yet. Start writing!</p></div>';
      return;
    }

    container.innerHTML = entries.map(e => `
      <div class="entry-item">
        <span class="entry-item-mood">${Utils.moodEmoji(e.mood)}</span>
        <div class="entry-item-body">
          <span class="entry-item-date">${Utils.formatDateShort(e.date)}</span>
          <div class="entry-item-text">${Utils.escapeHtml(e.text)}</div>
          ${e.photo ? `<img class="entry-item-photo" src="${Utils.escapeHtml(e.photo)}" alt="Entry photo" loading="lazy">` : ''}
        </div>
        <button class="entry-item-delete" onclick="app.deleteEntry('${e.date}')" title="Delete entry">✕</button>
      </div>
    `).join('');
  },

  // Render On This Day section
  renderOnThisDay(entries) {
    const container = document.getElementById('on-this-day');
    if (!container) return;

    if (entries.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    container.innerHTML = `
      <h2 class="section-title">🕰️ On This Day</h2>
      ${entries.map(e => `
        <div class="entry-item on-this-day-item">
          <span class="entry-item-mood">${Utils.moodEmoji(e.mood)}</span>
          <div class="entry-item-body">
            <span class="entry-item-date">${Utils.formatDateShort(e.date)} • ${Utils.formatRelativeYear(e.date)}</span>
            <div class="entry-item-text">${Utils.escapeHtml(e.text)}</div>
            ${e.photo ? `<img class="entry-item-photo" src="${Utils.escapeHtml(e.photo)}" alt="Entry photo" loading="lazy">` : ''}
          </div>
        </div>
      `).join('')}
    `;
  },

  // Render calendar grid
  renderCalendar(year, month) {
    const grid = document.getElementById('calendar-grid');
    const label = document.getElementById('calendar-month-label');
    const today = Utils.todayISO();

    label.textContent = Utils.getMonthName(year, month);

    const daysInMonth = Utils.getDaysInMonth(year, month);
    const firstDay = Utils.getFirstDayOfMonth(year, month);

    // Get entries for this month
    const monthEntries = DB.getMonth(year, month);
    const entryMap = {};
    monthEntries.forEach(e => { entryMap[e.date] = e; });

    // Get previous month's days for filler
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = Utils.getDaysInMonth(prevYear, prevMonth);

    let html = '';

    // Previous month's trailing days
    const prevMonthStart = daysInPrevMonth - firstDay + 1;
    for (let i = prevMonthStart; i <= daysInPrevMonth; i++) {
      html += `<div class="calendar-day other-month">${i}</div>`;
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = Utils.formatDateISO(d);
      const entry = entryMap[dateStr];
      const isToday = dateStr === today;

      let bgColor = 'var(--heat-0)';
      if (entry) {
        if (entry.mood) {
          const color = Utils.moodColor(entry.mood);
          bgColor = color;
        } else {
          bgColor = 'var(--heat-2)';
        }
      }

      const classes = [
        'calendar-day',
        isToday ? 'today' : '',
        entry ? 'has-entry' : ''
      ].filter(Boolean).join(' ');

      html += `<div class="${classes}" style="background:${bgColor}; opacity:${entry ? 0.85 : 1}" onclick="app.showCalendarDay('${dateStr}')" title="${entry ? Utils.escapeHtml(entry.text.substring(0, 50)) : ''}">${day}</div>`;
    }

    // Fill remaining cells
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      html += `<div class="calendar-day other-month">${i}</div>`;
    }

    grid.innerHTML = html;
  },

  // Show day detail in calendar
  showCalendarDayEntry(dateStr) {
    const detail = document.getElementById('calendar-day-detail');
    const content = document.getElementById('calendar-detail-content');
    const entry = DB.get(dateStr);

    if (!entry) {
      detail.style.display = 'none';
      return;
    }

    detail.style.display = 'block';
    content.innerHTML = `
      <div class="entry-item" style="padding:0; border:none; background:transparent;">
        <span class="entry-item-mood">${Utils.moodEmoji(entry.mood)}</span>
        <div class="entry-item-body">
          <span class="entry-item-date">${Utils.formatDate(entry.date)}</span>
          <div class="entry-item-text">${Utils.escapeHtml(entry.text)}</div>
          ${entry.photo ? `<img class="entry-item-photo" src="${Utils.escapeHtml(entry.photo)}" alt="Entry photo" loading="lazy" style="max-width:200px; border-radius:8px; margin-top:8px;">` : ''}
        </div>
      </div>
    `;
  },

  // Render mood insights
  renderMoodInsights() {
    const stats = DB.getMoodStats();
    const total = Object.values(stats).reduce((a, b) => a + b, 0);

    // Most common mood
    const mostCommon = DB.getMostCommonMood();
    document.getElementById('insight-common').textContent =
      mostCommon ? `${Utils.moodEmoji(mostCommon)} ${Utils.moodLabel(mostCommon)}` : '—';

    // This week
    const weekMood = DB.getThisWeekMood();
    document.getElementById('insight-week').textContent =
      weekMood ? `${Utils.moodEmoji(weekMood)} ${Utils.moodLabel(weekMood)}` : '—';

    // Best streak
    document.getElementById('insight-streak').textContent =
      `${DB.getLongestStreak()} days`;

    // Mood distribution bars
    const barsContainer = document.getElementById('mood-bars');
    const moods = ['amazing', 'great', 'good', 'okay', 'meh', 'stressed', 'tired', 'bad'];
    barsContainer.innerHTML = moods.map(mood => {
      const count = stats[mood] || 0;
      const pct = total > 0 ? (count / total) * 100 : 0;
      return `
        <div class="mood-bar-row">
          <span class="mood-bar-label">${Utils.moodEmoji(mood)}</span>
          <div class="mood-bar-track">
            <div class="mood-bar-fill" style="width:${pct}%; background:${Utils.moodColor(mood)}"></div>
          </div>
          <span class="mood-bar-count">${count}</span>
        </div>
      `;
    }).join('');

    // Mood timeline (last 30 days)
    const timelineContainer = document.getElementById('mood-timeline');
    const allEntries = DB.getRecent(30);
    const allEntriesMap = {};
    allEntries.forEach(e => { allEntriesMap[e.date] = e; });

    // Generate last 30 days
    const today = new Date();
    let timelineHtml = '';
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = Utils.formatDateISO(d);
      const entry = allEntriesMap[dateStr];

      const shortDate = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
      const moodEmoji = entry ? Utils.moodEmoji(entry.mood) : '';
      const score = entry ? Utils.moodScore(entry.mood) : 0;

      timelineHtml += `
        <div class="timeline-day">
          <span class="timeline-date">${shortDate}</span>
          <span class="timeline-mood">${moodEmoji}</span>
          <div class="timeline-bar">
            <div class="timeline-fill" style="width:${score * 20}%; background:${entry ? Utils.moodColor(entry.mood) : 'var(--bg-tertiary)'}"></div>
          </div>
        </div>
      `;
    }
    timelineContainer.innerHTML = timelineHtml;
  },

  // Render search results
  renderSearchResults(query) {
    const container = document.getElementById('search-results');

    if (!query || query.trim() === '') {
      container.innerHTML = '<div class="empty-state"><p>Type to search through your entries</p></div>';
      return;
    }

    const results = DB.search(query);

    if (results.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No matches found ✨</p></div>';
      return;
    }

    container.innerHTML = results.map(e => `
      <div class="search-result-item">
        <span class="search-result-mood">${Utils.moodEmoji(e.mood)}</span>
        <div class="search-result-body">
          <span class="search-result-date">${Utils.formatDate(e.date)}</span>
          <div class="search-result-text">${Utils.highlightText(e.text, query)}</div>
          ${e.photo ? `<img class="entry-item-photo" src="${Utils.escapeHtml(e.photo)}" alt="Entry photo" loading="lazy" style="max-width:80px; border-radius:6px; margin-top:4px;">` : ''}
        </div>
      </div>
    `).join('');
  },

  // Render settings
  renderSettings() {
    const settings = DB.getSettings();
    document.getElementById('theme-select').value = settings.theme || 'system';
  }
};
