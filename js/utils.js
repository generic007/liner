/* ============================================
   Liner — Utilities
   ============================================ */

const Utils = {
  // Date format helpers
  formatDate(date) {
    const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  formatDateShort(date) {
    const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  },

  formatDateISO(date) {
    const d = typeof date === 'string' ? new Date(date + 'T12:00:00') : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  todayISO() {
    return this.formatDateISO(new Date());
  },

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },

  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  },

  getMonthName(year, month) {
    const d = new Date(year, month, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  },

  // Format a relative year for On This Day display
  formatRelativeYear(dateStr) {
    const entryYear = parseInt(dateStr.substring(0, 4), 10);
    const currentYear = new Date().getFullYear();
    const diff = currentYear - entryYear;
    if (diff === 0) return 'Earlier this year';
    if (diff === 1) return '1 year ago';
    return `${diff} years ago`;
  },

  // ── Mood helpers (8 moods) ──
  moodEmoji(mood) {
    const map = {
      great: '😄', good: '🙂', okay: '😐', meh: '😕',
      bad: '😢', stressed: '😤', amazing: '🤩', tired: '🥱'
    };
    return map[mood] || '';
  },

  moodColor(mood) {
    const map = {
      great: 'var(--mood-great)',
      good: 'var(--mood-good)',
      okay: 'var(--mood-okay)',
      meh: 'var(--mood-meh)',
      bad: 'var(--mood-bad)',
      stressed: 'var(--mood-stressed)',
      amazing: 'var(--mood-amazing)',
      tired: 'var(--mood-tired)'
    };
    return map[mood] || 'var(--text-muted)';
  },

  moodLabel(mood) {
    const map = {
      great: 'Great', good: 'Good', okay: 'Okay', meh: 'Meh',
      bad: 'Bad', stressed: 'Stressed', amazing: 'Amazing', tired: 'Tired'
    };
    return map[mood] || mood;
  },

  moodScore(mood) {
    const scores = {
      great: 5, good: 4, okay: 3, meh: 2, bad: 1,
      stressed: 2, amazing: 5, tired: 2
    };
    return scores[mood] || 0;
  },

  // ── Daily writing prompts ──
  getDailyPrompt() {
    const prompts = [
      "What moment from today do you want to remember?",
      "What made you smile today?",
      "One thing you learned today.",
      "What surprised you today?",
      "Describe today in three words.",
      "What are you grateful for right now?",
      "What would you do differently today?",
      "Who made your day better?",
      "What's one small win today?",
      "Where did you feel most present?",
      "What's a sound you heard today?",
      "What did you see that was beautiful?",
      "What would you tell yesterday's you?",
      "What's something kind you did?",
      "What's a question on your mind?",
      "What made today unique?",
      "What are you looking forward to?",
      "What's something you accomplished?",
      "Describe the weather and how it felt.",
      "What made you laugh or smile?",
      "What's one thing that challenged you?",
      "What did you eat that was memorable?",
      "Who did you connect with today?",
      "What did you create today?",
      "What would you want to remember about today in 5 years?",
      "What energy did you feel today?",
      "What did you read, watch, or listen to?",
      "How did you take care of yourself today?",
      "What's something you noticed for the first time?",
      "What would you rate today out of 10 and why?"
    ];
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    return prompts[dayOfYear % prompts.length];
  },

  // ── Debounce ──
  debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  // ── Escape HTML ──
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // ── Highlight search matches ──
  highlightText(text, query) {
    if (!query) return Utils.escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return Utils.escapeHtml(text).replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark>$1</mark>'
    );
  },

  // ── Photo compression ──
  PHOTO_MAX_WIDTH: 800,
  PHOTO_QUALITY: 0.7,

  compressPhoto(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > this.PHOTO_MAX_WIDTH) {
            height = Math.round(height * (this.PHOTO_MAX_WIDTH / width));
            width = this.PHOTO_MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', this.PHOTO_QUALITY);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = ev.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
};
