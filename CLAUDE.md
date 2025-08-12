# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Code quality checks:**
```bash
npm run lint      # Run ESLint and Prettier checks
npm run format    # Format code with Prettier
npm run check     # Type checking with svelte-check
```

**Database operations:**
```bash
npx prisma migrate dev    # Run migrations in development
npx prisma migrate deploy # Deploy migrations in production
```

## Architecture Overview

BanBan is a Kanban board application built with SvelteKit, featuring:

- **Frontend**: SvelteKit with Tailwind CSS and Flowbite components
- **Backend**: SvelteKit API routes with server-side rendering
- **Database**: SQLite with Prisma ORM
- **Authentication**: Lucia auth with session management
- **File Storage**: Local filesystem storage in `/storage` directory

### Key Directory Structure

- `src/components/` - Reusable Svelte components (Board, Card, List, etc.)
- `src/routes/` - SvelteKit routes with API endpoints and pages
- `src/lib/server/` - Server-side utilities (auth, database)
- `prisma/` - Database schema and migrations
- `storage/` - File attachments storage

### Database Schema

Core entities managed by Prisma:
- **User** - Authentication and user data
- **Board** - Kanban boards with user associations
- **List** - Columns within boards
- **Card** - Tasks within lists with positioning
- **Action** - Activity tracking for cards
- **Attachment** - File uploads linked to cards
- **Comment** - Card comments
- **CheckList/CheckItem** - Task checklists

### Authentication Flow

- Uses Lucia auth with Prisma adapter
- Session management via cookies
- User authentication handled in `hooks.server.js`
- Protected routes check `locals.user` and `locals.session`

### File Upload System

- Files stored in `/storage` directory with UUID filenames
- Attachments linked to cards via database relations
- Supports images, videos, and PDF files
- Sharp library used for image processing

## Testing

No specific test framework is configured. Consider the existing structure when adding tests.

## Deployment

The application uses Docker for production deployment with Node.js adapter. Database migrations must be run separately in production environments.