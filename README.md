# Maxxi Geolocation Todos

This project is a small geospatial-enabled Todo application built as part of a technical assessment.

The application allows users to create, view, and manage todos that include an associated geographic location.
It showcases core concepts such as state management, component-driven UI design, data persistence, and basic geospatial handling (e.g., storing coordinates, visualizing points, or interacting with a map provider depending on the implementation).

The focus is on clean structure, clarity of code, and maintainability rather than feature breadth.

## Architecture Overview

- **Frontend:**
    - **React** + **TypeScript** for building components.
    - **MUI** for UI components and theming.
    - **React Hook Form** + **Zod** for form handling and validation.
    - **React Leaflet** for map visualization and location picking.
    - **Recharts** for the dashboard visualizations.

- **Routing:**
    - **React Router v7** for navigation between pages: task list, task form, map view, and dashboard.

- **State Management:**
    - Local state with React `useState` for temporary values.
    - Forms use `React Hook Form` with `FormProvider` for context.

- **Data:**
    - Task data is mocked with **msw**. Each task has `title`, `description`, `priority`, `status`, `dueDate`, and `location` (as a GeoPoint).

---

## Features

- Create, edit, view and remove tasks.
- Dashboard displaying tasks grouped by status and priority.
- Paginated table to display saved tasks.
- Interactive map to visualize task locations.
- Modal to display task details directly from the map.
- Form validation using **Zod** schemas.

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:lindembergtxr/maxxiChallenge.git
cd maxxiChallenge

# Install dependencies
npm install
# or
yarn install
```

### Running

```bash
npm run dev
```
