# CLAUDE.md - Project Instructions

## Project Overview
This is a React web application built with Vite and MUI (Material UI).

## Reference Documents
- @docs/design-system.md - Color palette, typography, spacing, and component guidelines
- @docs/code-convention.md - File structure, naming conventions, and coding standards
- @docs/new_project.md - Tech stack, setup checklist, and development commands

## Key Rules
- Follow the design system defined in `docs/design-system.md`
- Follow the code conventions defined in `docs/code-convention.md`
- Use MUI components as the primary UI building blocks
- Use the theme defined in `src/theme.js` — do not hardcode colors or font sizes
- Use functional components with hooks (no class components)
- Keep components small and focused on a single responsibility

## Project Structure
```
my-ai-web/
  CLAUDE.md              # This file - project instructions
  docs/                  # Reference documentation
    design-system.md     # Design tokens and guidelines
    code-convention.md   # Coding standards
    new_project.md       # Project setup guide
  my-react-app/          # React application
    src/
      theme.js           # MUI theme configuration
      main.jsx           # Entry point with ThemeProvider
      App.jsx            # Root component
```

## Development
- Run dev server: `cd my-react-app && npm run dev`
- Build: `cd my-react-app && npm run build`
