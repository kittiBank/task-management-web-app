# Task Management

A fullstack task management app with a NestJS REST API and a React kanban board UI.

## Framework

| Layer | Stack |
|---|---|
| Backend | NestJS, Prisma, PostgreSQL |
| Frontend | React, Vite, Tailwind CSS, Zustand, Axios |

## Source Structure

```
task-management-web-app/
├── back-end/
│   └── src/
│       ├── tasks/          # Controller, service, DTO, repository
│       ├── prisma/         # Prisma module
│       └── common/         # Enums, filters, response utils
├── front-end/
│   └── src/
│       ├── api/            # Axios client & task endpoints
│       ├── pages/          # TaskBoardPage
│       ├── components/     # layout, tasks, ui
│       ├── store/          # Zustand state
│       ├── constants/
│       └── utils/
└── docker-compose.yml      # PostgreSQL
```

## API Spec

Base URL: `http://localhost:3000`

**Status values:** `To Do` · `In Progress` · `Done`

| Method | Endpoint | Description | Body / Query |
|---|---|---|---|
| `GET` | `/tasks` | List all tasks | Query: `?status=To Do` (optional) |
| `POST` | `/tasks` | Create a task | `{ "title": "string", "description?": "string", "status?": "To Do" }` |
| `PUT` | `/tasks/:id` | Update a task | `{ "title?": "string", "description?": "string", "status?": "In Progress" }` |
| `DELETE` | `/tasks/:id` | Soft-delete a task | — |

**Response example (GET /tasks):**

```json
{
  "status": true,
  "message": "Tasks retrieved successfully",
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "title": "Setup project",
        "description": "Initialize repo",
        "status": "To Do",
        "created_at": "2026-07-28T15:00:00.000+07:00",
        "updated_at": "2026-07-28T15:00:00.000+07:00"
      }
    ]
  }
}
```

## Screenshot

> Add screenshots to `docs/screenshots/` and update paths below.

| Screen | Preview |
|---|---|
| Kanban Board | `docs/screenshots/kanban-board.png` |
| Create Task Modal | `docs/screenshots/create-task-modal.png` |

## Quick Start

Run from the **project root**:

```bash
cd task-management-web-app
docker compose up --build
# or
pnpm up
```

Optional: copy `.env.example` to `.env` to override ports or credentials.

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

**Local dev (without Docker):**

```bash
cp back-end/.env.example back-end/.env
cp front-end/.env.example front-end/.env
pnpm --dir back-end run start:dev
pnpm --dir front-end run dev
```

Stop all services:

```bash
pnpm down
```

Re-run migrate + seed only:

```bash
pnpm db:setup
```
