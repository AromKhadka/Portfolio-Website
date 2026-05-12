/**
 * notes.js — NoteHub module
 * Loads data/notes.json → renders chapter cards by grade
 *
 * JSON shape expected per entry:
 *   { "chapter": "Chapter Title", "file": "path/to/file.pdf" | null }
 *
 * Rules:
 *   - Chapter number label is auto-generated (Ch. 1, Ch. 2 …)
 *   - Download button shown only when file is a non-empty string
 *   - "Coming soon" shown only when file is null
 *   - No subject tags, no type tags — chapter title is the only text
 */

// ── STATE ─────────────────────────────────────────────────────
let notesData   = {};
let activeGrade = 'grade9';

// ── FETCH ─────────────────────────────────────────────────────
async function fetchNotes() {
  try {
    const res = await fetch('data/notes.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    notesData = await res.json();
  } catch (err) {
    console.warn('notes.json fetch failed —', err.message);
    // Minimal fallback: correct syllabus, all files null.
    // Keeps the UI honest — no ghost chapters from old data.
    notesData = getSyllabusSkeleton();
  }
  renderNotes(activeGrade);
}

// ── RENDER ────────────────────────────────────────────────────
function renderNotes(grade) {
  const container = document.getElementById('notesContainer');
  if (!container) return;

  const chapters = notesData[grade];

  if (!chapters || chapters.length === 0) {
    container.innerHTML = `<div class="notes-empty">📭 No chapters listed for this grade yet.</div>`;
    return;
  }

  const cards = chapters.map((entry, i) => {
    const num      = String(i + 1).padStart(2, '0');
    const title    = entry.chapter || 'Untitled Chapter';
    const hasFile  = typeof entry.file === 'string' && entry.file.trim() !== '';

    // Derive a slug-style filename for the download attribute
    const filename = hasFile
      ? entry.file.split('/').pop()   // use actual filename from path
      : '';

    const actionHTML = hasFile
      ? `<a href="${entry.file}" class="note-download" download="${filename}">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
             <polyline points="7 10 12 15 17 10"/>
             <line x1="12" y1="15" x2="12" y2="3"/>
           </svg>
           Download PDF
         </a>`
      : `<span class="note-coming-soon">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
           </svg>
           Coming soon
         </span>`;

    return `
      <div class="note-card${hasFile ? ' note-card--ready' : ''}">
        <div class="note-card__header">
          <span class="note-card__num">Ch. ${num}</span>
          ${hasFile
            ? `<span class="note-card__status note-card__status--ready">PDF ready</span>`
            : `<span class="note-card__status note-card__status--pending">Pending</span>`
          }
        </div>
        <h4 class="note-card__title">${title}</h4>
        <div class="note-card__action">${actionHTML}</div>
      </div>`;
  }).join('');

  container.innerHTML = `<div class="notes-grid">${cards}</div>`;

  // Staggered entrance animation
  requestAnimationFrame(() => {
    container.querySelectorAll('.note-card').forEach((card, i) => {
      card.style.opacity          = '0';
      card.style.transform        = 'translateY(18px)';
      card.style.transition       = 'opacity 0.45s ease, transform 0.45s ease';
      card.style.transitionDelay  = `${i * 0.055}s`;
      // Force a reflow so the starting state is painted before we remove it
      void card.offsetHeight;
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}

// ── GRADE TABS ────────────────────────────────────────────────
function initGradeTabs() {
  document.querySelectorAll('.grade-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.grade-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGrade = tab.dataset.grade;
      renderNotes(activeGrade);
    });
  });
}

// ── SEARCH (notehub search bar) ───────────────────────────────
function initNoteSearch() {
  const input = document.getElementById('noteSearch');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.note-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

// ── SYLLABUS SKELETON FALLBACK ────────────────────────────────
// Used only when notes.json cannot be fetched (e.g. opened as file://).
// Mirrors the exact NEB syllabus — all files null so "Coming soon" is correct.
function getSyllabusSkeleton() {
  return {
    grade9: [
      { chapter: 'Computer System',                      file: null },
      { chapter: 'Number System',                        file: null },
      { chapter: 'Block Diagram',                        file: null },
      { chapter: 'Web Technology',                       file: null },
      { chapter: 'Internet & Social Media',              file: null },
      { chapter: 'Cyber Security & Digital Citizenship', file: null },
      { chapter: 'Programming Concept (Python)',         file: null }
    ],
    grade10: [
      { chapter: 'Computer Network & Communication',     file: null },
      { chapter: 'Database Management System',           file: null },
      { chapter: 'Multimedia',                           file: null },
      { chapter: 'Programming with Python',              file: null },
      { chapter: 'AI & Contemporary Technology',         file: null }
    ],
    grade11: [
      { chapter: 'Computer System',                      file: null },
      { chapter: 'Number System & Boolean Logic',        file: null },
      { chapter: 'OS & Software',                        file: null },
      { chapter: 'Application Package',                  file: null },
      { chapter: 'Programming Logic & C',                file: null },
      { chapter: 'Web Technology I',                     file: null },
      { chapter: 'Multimedia',                           file: null },
      { chapter: 'Cyber Law & Security',                 file: null }
    ],
    grade12: [
      { chapter: 'DBMS Concept',                         file: null },
      { chapter: 'Data Communication & Networking',      file: null },
      { chapter: 'Web Technology II',                    file: null },
      { chapter: 'Programming II',                       file: null },
      { chapter: 'OOP',                                  file: null },
      { chapter: 'Software Process Model',               file: null },
      { chapter: 'Recent ICT Trends',                    file: null }
    ]
  };
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initGradeTabs();
  initNoteSearch();
  fetchNotes();
});

