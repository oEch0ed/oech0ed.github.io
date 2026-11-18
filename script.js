// Grade bars span 80–100 so the differences between strong grades stay visible.
const rows = [...document.querySelectorAll('.row[data-g]')];
rows.forEach((row) => {
  const g = Number(row.dataset.g);
  row.style.setProperty('--w', `${Math.max(4, ((g - 80) / 20) * 100)}%`);
});

// Semester / highest-first toggle.
const transcript = document.querySelector('.transcript');
const ranked = transcript.querySelector('.ranked');
const rankedSem = transcript.querySelector('.sem--ranked');
const semesters = [...transcript.querySelectorAll('.sem:not(.sem--ranked)')];

const rankedRows = rows
  .map((row) => {
    const clone = row.cloneNode(true);
    const sem = row.closest('.sem').querySelector('h3').textContent;
    const tag = document.createElement('span');
    tag.className = 'row__sem';
    tag.textContent = sem;
    clone.querySelector('.row__name').append(tag);
    clone.classList.add('is-drawn');
    return clone;
  })
  .sort((a, b) => Number(b.dataset.g) - Number(a.dataset.g));
ranked.append(...rankedRows);

document.querySelectorAll('.seg__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    document.querySelectorAll('.seg__btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    transcript.dataset.view = view;
    semesters.forEach((s) => { s.hidden = view === 'grade'; });
    rankedSem.hidden = view !== 'grade';
  });
});

// Draw the bars once, when each semester first scrolls into view.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduce) {
  document.documentElement.classList.add('js-bars');
  semesters.forEach((sem) => sem.querySelectorAll('.row').forEach((r, i) => r.style.setProperty('--i', i)));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.row').forEach((r) => r.classList.add('is-drawn'));
      io.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  semesters.forEach((sem) => io.observe(sem));
}

// Project tabs for the code excerpts.
const tabs = [...document.querySelectorAll('.codetabs [role="tab"]')];
const selectTab = (tab) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.setAttribute('aria-pressed', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
};
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
