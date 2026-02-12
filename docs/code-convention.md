# Code Convention

## File Structure

```
src/
  components/     # Reusable UI components
  pages/          # Page-level components
  hooks/          # Custom React hooks
  utils/          # Utility functions
  assets/         # Static assets (images, fonts)
  theme.js        # MUI theme configuration
  main.jsx        # App entry point
  App.jsx         # Root component
```

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (`Button.jsx`, `NavBar.jsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.js`, `useFetch.js`)
- **Utilities**: camelCase (`formatDate.js`, `apiClient.js`)
- **Pages**: PascalCase (`Home.jsx`, `Dashboard.jsx`)

### Variables & Functions
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Functions**: camelCase (`handleClick`, `fetchData`)
- **Components**: PascalCase (`function UserCard()`)

## React Conventions

- Use functional components with hooks
- Prefer `const` arrow functions for components
- Destructure props in function parameters
- Use `React.memo()` only when measurable performance benefit exists

## Import Order

1. React and third-party libraries
2. MUI components and icons
3. Local components
4. Hooks and utilities
5. Assets and styles

## Style Rules

- Use MUI `sx` prop for component-level styling
- Use `theme.js` for global theme customization
- Avoid inline style objects; prefer `sx` or `styled()`
- Use `rem` units for font sizes, `px` for borders/shadows

## Code Quality

- No unused variables or imports
- No `console.log` in production code
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer early returns to reduce nesting
