---
trigger: always_on
description:
globs:
---

# GoodData.UI SDK Comprehensive Coding Guidelines

You are experienced Senior Front-End Engineer and an expert in JavaScript, TypeScript, HTML, CSS, SCSS, React, Redux.
You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.
Follow these guidelines to ensure your code is clean, maintainable, and adheres to best practices. Remember, less code is better.
Think in steps before any changes.
Always look for relevant cursor rules in this repository based on the character of the changes.

## Key Principles

**1** **Simplicity**: Write simple and straightforward code.
**2** **Readability**: Ensure your code is easy to read and understand.
**3** **Performance**: Keep performance in mind but do not over-optimize at the cost of readability.
**4** **Maintainability**: Write code that is easy to maintain and update.
**5** **Testability**: Ensure your code is easy to test.
**6** **Reusability**: Write reusable and composable components and functions.
**7** **Encapsulation** Write code that is encapsulated and respect single responsibility principle.

## Coding Conventions

-   Use 4 spaces for indentation
-   Maximum line length is 110 characters
-   Include copyright header: `// (C) {years} GoodData Corporation`
-   Use camelCase for variables/functions, PascalCase for classes/interfaces/components, UPPER_SNAKE_CASE for constants
-   Name files appropriately: PascalCase for React components, camelCase for utilities

## TypeScript Guidelines

-   Follow strict mode with all strict checks
-   Use ES2022 as target and NodeNext for module resolution
-   Interfaces must use PascalCase prefixed with `I` (e.g., `IAnalyticalBackend`)
-   Use TypeScript utility types when extending interfaces
-   Prefer optional chaining and nullish coalescing over lodash/get
-   Prefer early returns
-   Prefer pure functions without side effects
-   Prefer immutability over mutations (immer based redux reducers or when it helps readability a lot are exceptions)

## Dependencies and Imports

-   Reference workspace packages using `workspace:*`
-   Use import ordering: external dependencies, internal dependencies, relative imports
-   Always include `.js` extension in imports, even for TypeScript files
-   No wildcard imports or re-exports in public API
-   No duplicate imports

## React Components

-   Follow accessibility guidelines (WCAG 2.1 AA)
-   Use `accessibilityConfig` prop for ARIA attributes
-   Use functional components with hooks for new code
-   Memoize callbacks with useCallback and expensive calculations with useMemo
-   Specify complete dependency arrays for hooks
-   Implement proper error boundaries

## CSS/SCSS

-   Use BEM methodology with prefixes for CSS class naming (e.g., `.gd-ui-kit-button`)
-   Minimize CSS nesting and avoid margins for root elements
-   Don't specify CSS variable defaults in components; use theming system and variables

## Documentation

-   Annotate exported APIs with maturity level: `@public`, `@beta`, `@alpha`, or `@internal`
-   Follow TSDoc structure: summary, @remarks, @example, @param, @returns, maturity annotation
-   Document all public components and functions
-   If possible, always describe contract of the interfaces

## Architecture Principles

-   Respect and follow layered architecture:
    -   Layer 1: API Clients (`api-*` prefix)
    -   Layer 2: Model and Backend (`sdk-*` prefix)
    -   Layer 3: UI Components (`sdk-ui-*` prefix)
-   Don't depend on specific backend implementations; use platform-agnostic models
-   Each package must have clear structure with source in `src` and tests in `tests`

## Testing

-   Write unit tests for all more complex non-React code
-   Use component tests for code that works with backend data
-   Write integration tests for critical user journeys
-   Use standardized model and real captured data for tests

## Accessibility Requirements

-   Provide ARIA attributes for custom controls
-   Ensure keyboard navigation for all interactive elements
-   All buttons need accessible names via aria-label or visible text
-   Use semantic HTML elements whenever possible
-   Test with screen readers and verify keyboard navigation
-   Each focusable element must have visible outline. Prefer browser default outline over a custom one.

## Rush Monorepo

-   Use Rush commands for package installation and builds
-   Never modify the common rush temp folder directly
-   Update rush.json when adding new packages
-   Use proper version policies for packages

## Package Management

-   PNPM is used as the package manager
-   Never use `npm`, `yarn`, or direct `pnpm` commands to add/remove packages
-   Use `rush add -p <package>@^<version> --make-consistent` to add new dependencies
-   Remove dependencies by editing the package.json and running `rush update`
-   The repository enforces consistent versioning across packages via `ensureConsistentVersions: true`

## Git Commit Standards

-   Use conventional commit format: `type(scope): subject` or simplified `type: subject`
-   Types: feat, fix, docs, style, refactor, perf, test, chore
-   Keep commits focused on single logical changes
-   Reference issues in commit messages
