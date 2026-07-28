# Task Management

A fullstack task management app with a NestJS REST API and a React kanban board UI.

<img width="700" height="400" alt="Screenshot 2569-07-28 at 16 55 27" src="https://github.com/user-attachments/assets/e9a20c95-79ce-4334-a769-8207cf304bc7" />


## Framework

| Layer | Stack |
|---|---|
| Backend | NestJS, Prisma, PostgreSQL |
| Frontend | React, Vite, Tailwind CSS, Zustand, Axios |
| Database | PostgreSQL |

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

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/tasks` | List all tasks | - |
| `POST` | `/tasks` | Create a task | `"title", "description` |
| `PUT` | `/tasks/:id` | Update a task | `"title", "description` |
| `DELETE` | `/tasks/:id` | Soft-delete a task | - |

## How to run on local
1. **Clone repo**
   ```bash
   git clone https://github.com/kittiBank/task-management-web-app.git
   cd task-management-web-app
   ```

2. **Run Docker**
   ```bash
   docker compose up --build
   ```

3. **Open web**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

Stop services:
```bash
docker compose down
```
