# Rose's Toolbox

[中文文档](./README.zh-CN.md) | English

A personal multi-app toolbox with an iPhone-inspired home screen. All data is stored locally in IndexedDB — no backend required.

## Features

### Home Screen

An iPhone springboard-style launcher with animated gradient wallpaper, live clock, app icon grid, and a frosted-glass dock.

### Template Talk (模板话术)

Create and manage reusable text templates with dynamic variables.

- Create, edit, duplicate, and delete templates
- Insert variables using `@` trigger (e.g. `{{name}}`, `{{time}}`)
- Fill in variables and generate final text with one click
- Auto-copy generated text to clipboard

### Calendar (日历)

A monthly calendar with event management.

- Monthly grid view with event dot indicators
- Navigate between months
- Create, edit, and delete events
- Event properties: title, date, time range, description, color label
- Day detail panel showing all events for a selected date

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Storage | IndexedDB (via idb) |
| Linting | ESLint 9 |
| Package Manager | pnpm |

## Project Structure

```
src/
  main.tsx                        # Entry point, BrowserRouter setup
  App.tsx                         # Route definitions
  index.css                       # Global styles
  types/index.ts                  # Shared type definitions
  components/
    HomeScreen.tsx                # iPhone-style home screen
    Toast.tsx                     # Shared toast notifications
  apps/
    template-talk/
      TemplateTalkApp.tsx         # Template Talk main page
      components/                 # AddButton, Card, TemplateForm, VariableForm
      hooks/useTemplates.ts       # IndexedDB CRUD for templates
      utils/variables.ts          # Variable extraction & replacement
    calendar/
      CalendarApp.tsx             # Calendar main page
      components/                 # MonthView, DayDetail, EventForm
      hooks/useCalendarEvents.ts  # IndexedDB CRUD for events
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Usage

1. Open the app in your browser (default: `http://localhost:5173`)
2. The home screen displays all available apps as icons
3. Tap **模板话术** to manage text templates
4. Tap **日历** to manage calendar events
5. Use the back button in each app to return to the home screen

## License

MIT
