# New Project Guide

## Tech Stack

- **Framework**: React 19 (via Vite)
- **UI Library**: MUI (Material UI) v6
- **Styling**: Emotion (@emotion/react, @emotion/styled)
- **Icons**: @mui/icons-material
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Setup Checklist

1. [x] Scaffold React app with Vite (`npm create vite@latest`)
2. [x] Install dependencies (`npm install`)
3. [x] Install MUI packages (`@mui/material @emotion/react @emotion/styled @mui/icons-material`)
4. [x] Create `src/theme.js` with custom MUI theme
5. [x] Wrap app with `ThemeProvider` and `CssBaseline` in `main.jsx`
6. [ ] Set up routing (react-router-dom) if needed
7. [ ] Configure ESLint and Prettier
8. [ ] Set up environment variables (.env)

## Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Key Files

| File | Purpose |
|------|---------|
| `src/main.jsx` | Entry point with ThemeProvider |
| `src/App.jsx` | Root component |
| `src/theme.js` | MUI theme configuration |
| `vite.config.js` | Vite build configuration |

## Adding New Features

1. Create component in `src/components/` or page in `src/pages/`
2. Follow naming conventions from `code-convention.md`
3. Use design tokens from `design-system.md`
4. Import MUI components as needed
