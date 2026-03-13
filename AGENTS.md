# AGENTS.md - Coral Jovem de Londrina (CJL)

## Project Overview

This is a Next.js 15 (Pages Router) web application for a choir (Coral Jovem de Londrina). It displays song lyrics, audio players, voice kits, and event schedules. The project uses TypeScript, Tailwind CSS, and various React hooks.

## Build Commands

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint:check       # Check code formatting with Prettier
npm run lint:fix         # Fix code formatting with Prettier

# Media Optimization
npm run optimize:audio   # Run audio optimization script
npm run optimize:images  # Run image optimization script
npm run optimize:all    # Run all optimization scripts
npm run build:optimized  # Build with all optimizations
```

**Note**: This project does not have a test suite configured. To run a single test (if tests were added), you would typically use:

```bash
npm test -- --testPathPattern=filename
# or with specific test runner
npx jest --testNamePattern="test name"
```

## Code Style Guidelines

### TypeScript

- **Strict Mode**: Enabled in `tsconfig.json` - all types must be explicit
- **Path Aliases**: Use `@/*` for imports from `src/` directory
  - Example: `import { Song } from "@/types"`
- **Interfaces over Types**: Use interfaces for object shapes, enums for constants
- **Avoid `any`**: Never use `any` type - use `unknown` if type is truly unknown

### Imports

Order imports consistently:

1. External libraries (React, Next, Phosphor icons)
2. Internal imports (components, hooks, types)
3. Relative imports

```typescript
// 1. External
import { useState, useEffect } from "react";
import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react";

// 2. Internal (path alias)
import Layout from "@/components/Layout";
import { Song, Status } from "@/types";

// 3. Relative (when needed)
import styles from "./Component.module.css";
```

### Component Structure

- Use functional components with arrow functions or `function` keyword
- Export default at the end of the file
- Use TypeScript for all props
- Destructure props in function signature when possible

```typescript
interface ComponentProps {
  title: string;
  isActive?: boolean;
  children: ReactNode;
}

function Component({ title, isActive = false, children }: ComponentProps) {
  return <div>{children}</div>;
}

export default Component;
```

### Naming Conventions

- **Components**: PascalCase (e.g., `SongPlayer`, `Layout`)
- **Hooks**: camelCase starting with `use` (e.g., `useLocalAudioPlayer`)
- **Interfaces/Types**: PascalCase (e.g., `Song`, `Lyrics`)
- **Enums**: PascalCase with PascalCase members (e.g., `Status.active`)
- **Files**: kebab-case for pages, PascalCase for components (e.g., `song-editor.tsx`, `SongPlayer.tsx`)

### Error Handling

- Use try-catch blocks for async operations
- Return appropriate HTTP status codes in API routes
- Show user-friendly error messages with toast notifications (react-toastify)

```typescript
try {
  // async operation
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: "User-friendly message" });
}
```

### Tailwind CSS

- Use Tailwind utility classes for all styling
- Use arbitrary values sparingly (e.g., `h-[120px]`)
- Keep classes organized by category (layout, spacing, typography, etc.)
- Use CSS variables for theme colors defined in `tailwind.config.ts`

### State Management

- Use React `useState` for local component state
- Use custom hooks (in `src/hooks/`) for reusable stateful logic
- Use `usehooks-ts` library for common hooks (e.g., `useDocumentTitle`)

### API Routes

- Located in `src/pages/api/`
- Use NextApiRequest and NextApiResponse types
- Return proper status codes (200, 400, 500, etc.)
- Use JSON response format

### File Organization

```
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Next.js pages and API routes
│   ├── api/         # API endpoints
│   └── kits/        # Route groups
├── styles/          # Global styles
└── types.tsx        # Shared TypeScript interfaces and types
```

### Constants and Enums

- Define shared constants in `src/types.tsx`
- Use TypeScript enums for related constants (e.g., `Status`, `Naipes`)

### Media Assets

- Images: Put in `/public/images/` - optimize with `npm run optimize:images`
- Audio: Put in `/public/audio/` - optimize with `npm run optimize:audio`
- Use WebP format for images

### Dependencies

Key dependencies used in this project:

- `@phosphor-icons/react` - Icons
- `react-toastify` - Toast notifications
- `usehooks-ts` - Reusable React hooks
- `fluent-ffmpeg` - Audio processing
- `@vercel/analytics` - Analytics

### Git Conventions

- Use meaningful commit messages
- Create feature branches for new features
- Run `npm run lint:fix` before committing
- Do not commit sensitive data (API keys, credentials)

### Development Workflow

1. Create a new branch: `git checkout -b feature/description`
2. Make changes following code style guidelines
3. Run `npm run lint:fix` to fix formatting
4. Test locally with `npm run dev`
5. Build with `npm run build` to check for errors
6. Commit and push changes

# Supabase

## Migrations

This project uses Supabase CLI for database migrations. Two approaches are supported:

### Traditional Migrations (Imperative)

Create and manage migrations manually:

```bash
# Create new empty migration
supabase migration new add_users_table

# Apply pending migrations to local database
supabase migration up

# List all migrations (local and remote)
supabase migration list

# Push migrations to remote
supabase db push

**Always create new migration files with `supabase migration new <name>` and then edit the generated SQL file.**
```

### Declarative Schema Migrations (Recommended)

Define your schema in `supabase/schemas/` and generate migrations automatically.

#### Creating Your First Schema

1. Create a SQL file in `supabase/schemas/` directory:

```sql
-- supabase/schemas/employees.sql
create table "employees" (
  "id" integer not null,
  "name" text
);
```

2. Generate migration from declared schema:

```bash
supabase db diff -f create_employees_table
```

3. Start local database and apply migration:

```bash
supabase start
supabase migration up
```

#### Updating Your Schema

1. Edit `supabase/schemas/employees.sql` to add new columns:

```sql
create table "employees" (
  "id" integer not null,
  "name" text,
  "age" smallint not null
);
```

2. Generate new migration:

```bash
supabase db diff -f add_age
```

3. Apply the pending migration:

```bash
supabase migration up
```

#### Deploying Schema Changes

```bash
# Login to Supabase CLI
supabase login

# Link to remote project
supabase link --project-ref <your-project-ref>

# Push changes to remote
supabase db push
```

#### Pulling Production Schema

To set up declarative schemas on an existing project:

```bash
supabase db dump > supabase/schemas/prod.sql
```

Then break down the schema into smaller files and generate migrations incrementally.

#### Schema File Organization

```
supabase/
├── schemas/
│   ├── employees.sql
│   └── managers.sql
└── migrations/
    ├── 20241004112233_create_employees_table.sql
    └── 20241005112233_add_managers_table.sql
```

Schema files run in lexicographic order. For foreign key dependencies, ensure parent tables are created first.

#### Custom Schema Order

To specify custom order, edit `supabase/config.toml`:

```toml
[db.migrations]
schema_paths = [
  "./schemas/employees.sql",
  "./schemas/*.sql",
]
```

#### Rolling Back

During development, reset to a previous version:

```bash
supabase db reset --version 20241005112233
```

Then edit the schema and regenerate the migration. **Do not reset versions already deployed to production.**

#### Known Caveats

The diff tool cannot track these entities - use versioned migrations instead:

- DML statements (insert, update, delete)
- View ownership and grants
- Materialized views
- RLS policies (alter policy statements)
- Column privileges
- Comments
- Partitions
- Domain statements
- Schema privileges
