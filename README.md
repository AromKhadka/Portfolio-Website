# Arom Khadka — Portfolio

Personal portfolio website for a Data Analyst, Data Scientist, and Educator.

## Project Structure

```
portfolio/
├── index.html          ← Main portfolio page
├── notehub.html        ← NoteHub education platform
├── css/style.css       ← All styles (dark/light theme, responsive)
├── js/
│   ├── main.js         ← Theme toggle, scroll animations, canvas
│   ├── github.js       ← GitHub API fetch & repo filtering
│   └── notes.js        ← Notes loading from JSON
├── data/notes.json     ← Notes data
└── assets/
    ├── images/         ← Dashboard screenshots, profile photo
    ├── icons/          ← Custom icons
    └── notes/          ← PDF notes by grade
        ├── grade9/
        ├── grade10/
        ├── grade11/
        └── grade12/
```

## How to Use

1. Open `index.html` in any browser — no build step needed
2. For GitHub repos to load, internet access is required
3. To add PDF notes: place files in `assets/notes/gradeX/` and update `data/notes.json`
4. To add dashboard screenshots: place images in `assets/images/` and update `index.html`

## Customization

- **Colors**: Edit CSS variables in `css/style.css` `:root` block
- **Theme**: Dark/Light toggle is built in
- **Notes**: Edit `data/notes.json` — add `"file"` paths for PDF downloads
- **Contact form**: Hook `#contactForm` submit to your backend or Formspree
