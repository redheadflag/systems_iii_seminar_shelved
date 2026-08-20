# Shelved

Shelved is an online showcase for collections: it lets users create public and private collections, add cards to them, comment on other users' collections, and share their thoughts on what they see. A feature allowing card exchanges between users is planned for the future.

## Deployment

### Backend

#### With Docker

```
cd backend
docker compose up -d
```

This brings up two services: `db` (MySQL) and `app` (the backend itself). The backend listens on the port specified by the `BACKEND_PORT` variable in `backend/.env`.

#### Without Docker

1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Set up MySQL locally and create the database (see the [Database](#database) section below).
3. Configure `backend/.env` (see the variables below), pointing `DB_HOST`, `DB_PORT`, and the other parameters at your local database.
4. Start the server:
   ```
   npm run dev
   ```

#### Environment variables (`backend/.env`)

| Variable | Purpose |
|---|---|
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL user's password |
| `DB_HOST` | database host (`db` when running via docker-compose, `localhost` for a local run) |
| `DB_PORT` | MySQL port (default `3306`) |
| `DB_NAME` | database name |
| `BACKEND_PORT` | host port the backend is exposed on when running via docker-compose |
| `PLAIN_BACKEND_PORT` | port the Node app listens on inside the container/on the host |
| `JWT_SECRET` | secret used to sign JWT tokens |
| `MIN_PASSWORD_LENGTH` | minimum password length required at registration |
| `STORAGE_PATH` | path to the directory used to store uploaded files (media) |
| `MAX_FILE_SIZE_MB` | maximum uploaded file size, in MB |
| `CORS_ORIGIN` | frontend origin allowed for CORS requests |

See `backend/.env.example` for a sample configuration.

### Frontend

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Set the `REACT_APP_API_URL` variable in `frontend/.env` to the backend's address (e.g. `http://localhost:8000`).
3. Start the dev server:
   ```
   npm start
   ```

### Database

The database schema is defined in `guidelines/schema.sql`. To apply it:

- Into the MySQL container started via docker-compose (service `db`, container `shelved_db`):
  ```
  docker exec -i shelved_db mysql -u <DB_USER> -p<DB_PASSWORD> <DB_NAME> < guidelines/schema.sql
  ```

- Or via a local MySQL client:
  ```
  mysql -u <DB_USER> -p -h <DB_HOST> -P <DB_PORT> <DB_NAME> < guidelines/schema.sql
  ```

The values for `<DB_USER>`, `<DB_PASSWORD>`, `<DB_NAME>`, `<DB_HOST>`, `<DB_PORT>` come from `backend/.env`.
