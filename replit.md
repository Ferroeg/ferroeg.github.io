# Systematic Reading Initiative

## Overview

A book club and reading community platform that organizes systematic reading programs with two levels of engagement (first and advanced). The application manages a curated library of books, schedules community debates, publishes news updates, and supports English/Arabic bilingual content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, Zustand for client state (language preferences)
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Internationalization**: Custom i18n implementation supporting English and Arabic with RTL support

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **API Design**: RESTful endpoints defined in shared route definitions with Zod validation
- **Type Safety**: Full TypeScript with shared types between client and server via `@shared` path alias

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains table definitions for books and news
- **Migrations**: Drizzle Kit handles schema migrations in the `migrations` folder

### Key Design Patterns
- **Shared Route Definitions**: API routes are defined in `shared/routes.ts` with input/output schemas, enabling type-safe API consumption
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Custom Hooks**: Data fetching logic encapsulated in hooks like `use-books.ts` and `use-news.ts`

### Build System
- Development uses Vite dev server with HMR proxied through Express
- Production build uses esbuild for server bundling and Vite for client assets
- Server dependencies are selectively bundled to optimize cold start times

## External Dependencies

### Database
- PostgreSQL database via `DATABASE_URL` environment variable
- Connection pooling with `pg` package
- Session storage with `connect-pg-simple`

### UI Components
- Radix UI primitives (dialog, dropdown, tabs, etc.)
- Embla Carousel for carousels
- Recharts for charts
- Lucide React for icons

### Development Tools
- Replit-specific Vite plugins for development (runtime error overlay, cartographer, dev banner)