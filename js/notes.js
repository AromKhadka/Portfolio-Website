/**
 * notes.js — NoteHub module
 * Loads data/notes.json → renders chapter cards by grade
 *
 * JSON shape expected per entry:
 *   { "chapter": "Chapter Title", "file": "path/to/file.pdf" | null }
 */

// ── STATE ─────────────────────────────────────────────────────
let notesData = {};
let activeGrade = 'grade9';

// ── FETCH ─────────────────────────────────────────────────────
async function fetchNotes() {
  try {
    const res = await fetch('data/notes.json');

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    notesData = await res.json();

  } catch (err) {

    console.warn('notes.json fetch failed —', err.message);

    // fallback
    notesData = getSyllabusSkeleton();
  }

  renderNotes(activeGrade);
}

// ── PDF PREVIEW ───────────────────────────────────────────────
function openPDF(pdfUrl) {

  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');

  if (!modal || !viewer) return;

  viewer.src = pdfUrl;
  modal.classList.add('active');

  document.body.style.overflow = 'hidden';
}

function closePDF() {

  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');

  if (!modal || !viewer) return;

  viewer.src = '';
  modal.classList.remove('active');

  document.body.style.overflow = '';
}

// ── RENDER ────────────────────────────────────────────────────
function renderNotes(grade) {

  const container = document.getElementById('notesContainer');

  if (!container) return;

  const chapters = notesData[grade];

  if (!chapters || chapters.length === 0) {

    container.innerHTML = `
      <div class="notes-empty">
        📭 No chapters listed for this grade yet.
      </div>
    `;

    return;
  }

  const cards = chapters.map((entry, i) => {

    const num = String(i + 1).padStart(2, '0');
    const type = entry.type || 'chapter';

    const title = entry.chapter || 'Untitled Chapter';

    const hasFile =
      typeof entry.file === 'string' &&
      entry.file.trim() !== '';

    // Safe file path
    const safeFile = hasFile
      ? encodeURI(entry.file)
      : '';

    // Extract filename
    const filename = hasFile
      ? entry.file.split('/').pop()
      : '';

    // ── ACTION BUTTONS ─────────────────────────────
    const actionHTML = hasFile
  ? `
    <div class="note-actions">

      <button class="note-preview-btn" onclick="openPDF('${entry.file}')">
        👁 Preview Notes
      </button>

    </div>
  `
  : `<span class="note-coming-soon">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <circle cx="12" cy="12" r="10"/>
         <line x1="12" y1="8" x2="12" y2="12"/>
         <line x1="12" y1="16" x2="12.01" y2="16"/>
       </svg>
       Coming soon
     </span>`;

    return `
      <div class="note-card${hasFile ? ' note-card--ready' : ''}">

        <div class="note-card__header">

          <span class="note-card__num">
            ${type === 'book' ? '📘 Book' : `Ch. ${num}`}
          </span>

          ${
            hasFile

              ? `
                <span class="note-card__status note-card__status--ready">
                  PDF Ready
                </span>
              `

              : `
                <span class="note-card__status note-card__status--pending">
                  Pending
                </span>
              `
          }

        </div>

        <h4 class="note-card__title">
          ${title}
        </h4>

        <div class="note-card__action">
          ${actionHTML}
        </div>

      </div>
    `;

  }).join('');

  container.innerHTML = `
    <div class="notes-grid">
      ${cards}
    </div>
  `;

  // ── STAGGER ANIMATION ───────────────────────────
  requestAnimationFrame(() => {

    container.querySelectorAll('.note-card').forEach((card, i) => {

      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      card.style.transition =
        'opacity 0.45s ease, transform 0.45s ease';

      card.style.transitionDelay = `${i * 0.055}s`;

      void card.offsetHeight;

      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}

// ── GRADE TABS ────────────────────────────────────────────────
function initGradeTabs() {

  document.querySelectorAll('.grade-tab').forEach(tab => {

    tab.addEventListener('click', () => {

      document
        .querySelectorAll('.grade-tab')
        .forEach(t => t.classList.remove('active'));

      tab.classList.add('active');

      activeGrade = tab.dataset.grade;

      renderNotes(activeGrade);
    });
  });
}

// ── SEARCH ────────────────────────────────────────────────────
function initNoteSearch() {

  const input = document.getElementById('noteSearch');

  if (!input) return;

  input.addEventListener('input', () => {

    const q = input.value.trim().toLowerCase();

    document.querySelectorAll('.note-card').forEach(card => {

      const text = card.textContent.toLowerCase();

      card.style.display =
        (!q || text.includes(q))
          ? ''
          : 'none';
    });
  });
}

// ── FALLBACK SYLLABUS ─────────────────────────────────────────
function getSyllabusSkeleton() {

  return {

    grade9: [
      { chapter: 'Computer System', file: null },
      { chapter: 'Number System', file: null },
      { chapter: 'Block Diagram', file: null },
      { chapter: 'Web Technology', file: null },
      { chapter: 'Internet & Social Media', file: null },
      { chapter: 'Cyber Security & Digital Citizenship', file: null },
      { chapter: 'Programming Concept (Python)', file: null }
    ],

    grade10: [
      { chapter: 'Computer Network & Communication', file: null },
      { chapter: 'Database Management System', file: null },
      { chapter: 'Multimedia', file: null },
      { chapter: 'Programming with Python', file: null },
      { chapter: 'AI & Contemporary Technology', file: null }
    ],

    grade11: [
      { chapter: 'Computer System', file: null },
      { chapter: 'Number System & Boolean Logic', file: null },
      { chapter: 'OS & Software', file: null },
      { chapter: 'Application Package', file: null },
      { chapter: 'Programming Logic & C', file: null },
      { chapter: 'Web Technology I', file: null },
      { chapter: 'Multimedia', file: null },
      { chapter: 'Cyber Law & Security', file: null }
    ],

    grade12: [
      { chapter: 'DBMS Concept', file: null },
      { chapter: 'Data Communication & Networking', file: null },
      { chapter: 'Web Technology II', file: null },
      { chapter: 'Programming II', file: null },
      { chapter: 'OOP', file: null },
      { chapter: 'Software Process Model', file: null },
      { chapter: 'Recent ICT Trends', file: null }
    ]
  };
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  initGradeTabs();

  initNoteSearch();

  fetchNotes();

  // Close modal on outside click
  const modal = document.getElementById('pdfModal');

  if (modal) {

    modal.addEventListener('click', (e) => {

      if (e.target === modal) {
        closePDF();
      }
    });
  }
});