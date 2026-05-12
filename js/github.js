/**
 * github.js — Fetches GitHub repos and renders with filter UI
 * GitHub: https://github.com/AromKhadka
 */

const GITHUB_USERNAME = 'AromKhadka';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=50&sort=updated`;

let allRepos = [];

// ── CATEGORY CLASSIFIER ───────────────────────────────────────
function classifyRepo(repo) {
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
  if (/data|analysis|analytics|sql|excel|powerbi|pandas|numpy|jupyter|dataset|eda|chart|dashboard/.test(text)) return 'data';
  if (/frontend|portfolio|web|html|css|react|vue|ui|design|landing/.test(text)) return 'frontend';
  return 'college';
}

// ── RENDER REPOS ──────────────────────────────────────────────
function renderRepos(repos) {
  const grid = document.getElementById('reposGrid');
  if (!grid) return;

  if (repos.length === 0) {
    grid.innerHTML = '<div class="repo-error">No repositories found in this category.</div>';
    return;
  }

  grid.innerHTML = repos.map(repo => {
    const category = classifyRepo(repo);
    const desc = repo.description || 'No description provided.';
    const lang = repo.language ? `<span class="tag">${repo.language}</span>` : '';
    const stars = repo.stargazers_count > 0 ? `<span class="tag">★ ${repo.stargazers_count}</span>` : '';
    return `
      <div class="repo-card" data-category="${category}">
        <div class="repo-name">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="opacity:0.5;vertical-align:middle;margin-right:4px">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/>
          </svg>
          ${repo.name}
        </div>
        <p class="repo-desc">${desc}</p>
        <div class="project-tags" style="margin-top:auto;gap:0.4rem;">
          ${lang}${stars}
        </div>
        <div class="repo-meta">
          <span class="repo-category-badge">${category}</span>
          <a href="${repo.html_url}" target="_blank" class="repo-link">View →</a>
        </div>
      </div>
    `;
  }).join('');

  // Animate new cards
  setTimeout(() => {
    grid.querySelectorAll('.repo-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.transitionDelay = `${i * 0.06}s`;
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  }, 10);
}

// ── FILTER BUTTONS ────────────────────────────────────────────
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all'
        ? allRepos
        : allRepos.filter(r => classifyRepo(r) === filter);
      renderRepos(filtered);
    });
  });
}

// ── FETCH REPOS ───────────────────────────────────────────────
async function fetchRepos() {
  const grid = document.getElementById('reposGrid');
  if (!grid) return;

  grid.innerHTML = '<div class="repo-loading">Fetching repositories from GitHub...</div>';

  try {
    const response = await fetch(GITHUB_API, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!response.ok) {
      // GitHub rate limit or user not found
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    // Filter out forked repos (optional: remove if you want forks shown)
    allRepos = repos.filter(r => !r.fork);

    if (allRepos.length === 0) {
      grid.innerHTML = '<div class="repo-error">No public repositories found. <a href="https://github.com/AromKhadka" target="_blank" style="color:var(--accent)">Visit GitHub →</a></div>';
      return;
    }

    renderRepos(allRepos);
    initFilters();

  } catch (err) {
    console.warn('GitHub API failed:', err.message);
    // Show fallback cards
    renderFallbackRepos();
    initFilters();
  }
}

// ── FALLBACK REPOS (shown if API fails / rate limited) ────────
function renderFallbackRepos() {
  allRepos = [
    { name: 'football-analysis', description: 'Football player performance analysis using Python and Power BI', html_url: 'https://github.com/AromKhadka', language: 'Python', stargazers_count: 0, fork: false },
    { name: 'telecom-churn', description: 'Telecom customer churn analysis and dashboard in Power BI', html_url: 'https://github.com/AromKhadka', language: 'SQL', stargazers_count: 0, fork: false },
    { name: 'portfolio-website', description: 'Personal portfolio website — HTML, CSS, JavaScript', html_url: 'https://github.com/AromKhadka', language: 'HTML', stargazers_count: 0, fork: false },
    { name: 'data-cleaning-scripts', description: 'Reusable Python scripts for data cleaning and preprocessing', html_url: 'https://github.com/AromKhadka', language: 'Python', stargazers_count: 0, fork: false },
    { name: 'sql-practice', description: 'SQL exercises and case studies from college and self-study', html_url: 'https://github.com/AromKhadka', language: 'SQL', stargazers_count: 0, fork: false },
    { name: 'excel-dashboards', description: 'Interactive Excel dashboards for business reporting', html_url: 'https://github.com/AromKhadka', language: null, stargazers_count: 0, fork: false },
  ];
  renderRepos(allRepos);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', fetchRepos);
