# Cow Catalog – Angular 17

A simple cow catalog web application built with Angular 17 (standalone components).

## Hosted on GH Pages
https://milanmishra1206.github.io/cow-catalog/cows

## Features

| Feature | Description |
|---|---|
| CA-01: Cow List | Table view of all cows with tag, sex, pen, status, last event date |
| CA-02: Search & Filter | Filter by tag number, status, and pen. Filters persist on navigation |
| CA-03: Add New Cow | Form to add a cow with validation (unique tag, required fields, positive weight) |
| CA-04: Cow Detail | Detail page with info, weight data, and event timeline |

## Tech Stack

- **Angular 17** – Standalone components, Signals for state
- **Angular Router** – SPA navigation
- **Angular Forms** – Reactive forms for the Add Cow form
- **Tailwind CSS v3** - Easier implementation of styling

## Project Structure

```
src/app/
├── models/
│   ├── cow.model.ts          # Cow & CowEvent interfaces
│   └── filter-state.model.ts # FilterState interface
├── services/
│   └── cow.service.ts        # State management (Signals)
├── components/
│   ├── cow-list/             # CA-01 & CA-02
│   ├── add-cow/              # CA-03
│   └── cow-detail/           # CA-04
├── app.component.ts          # Root component with header
├── app.config.ts             # App config + providers
└── app.routes.ts             # Route definitions
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Open browser
http://localhost:4200
```

## Architecture Notes

- **Signals** are used in `CowService` for reactive state (`_cows`, `_filters`), keeping components simple.
- **Filter state** lives in the service so it persists across navigation.
- All data is stored **in memory** (no backend or localStorage needed).
- Standalone components – no NgModule boilerplate.
