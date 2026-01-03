# Halltimate Prison Management Backend

## Overview
- **Framework:** NestJS 10 (TypeScript) with modular architecture inspired by Coffee-Atar.
- **Database:** PostgreSQL via TypeORM with entity auto-discovery.
- **Authentication:** JWT-based auth for staff; guards enforce role-based access control (RBAC).
- **Scope:** Full prison facility management—cells, prisoners, assignments, cases, crimes, visits, incidents, health, documents, staff, and system user accounts.

## Frontend Integration Cheat Sheet
- **Base URL:** `https://<host>/api` (localhost defaults to `http://localhost:3000/api`).
- **Auth Flow:**
   - `POST /api/user/auth/login` ⇒ `{ email, password }` → returns `{ accessToken }`.
   - Include `Authorization: Bearer <token>` header for all facility endpoints.
- **Role Awareness:** frontend should read `userType` from login payload to enable/disable UI features (e.g., medical screens only if `userType === 'medical'`). Roles list mirrors backend enum: `admin`, `warden`, `guard`, `medical`, `case_manager`, `visitor_officer`, `clerk`.
- **Common Endpoints:**
   - Cells: `GET /cells`, `POST /cells`, `PATCH /cells/:id`, `DELETE /cells/:id`.
   - Prisoners: `GET /prisoners`, `POST /prisoners`, `PATCH /prisoners/:id`, `DELETE /prisoners/:id`.
   - Assignments: `GET /cell-assignments`, `POST /cell-assignments`.
   - Cases/Crime: `GET /cases`, `GET /crime-records`, `POST /cases`, `POST /crime-records`.
   - Visitors/Visits: `GET /visitors`, `POST /visitors`, `GET /visits`, `POST /visits`.
   - Incidents: `GET /incidents`, `POST /incidents`, `PATCH /incidents/:id`.
   - Health Records: `GET /health-records`, `POST /health-records`, `PATCH /health-records/:id`.
   - Documents: `GET /documents`, `POST /documents` (expects metadata; actual file upload TBD).
- **Filtering/Pagination:** not implemented yet; frontend can request entire collections then filter client-side for now. Future DTOs may add query params (plan UI accordingly).
- **Error Contract:** backend uses Nest HTTP exceptions (e.g., `{ "statusCode": 403, "message": "access denied" }`). Surface `message` toasts/modals.
- **Data Shapes:** align with DTOs (see `src/app/facility/**/dto`). Example prisoner payload:
   ```json
   {
      "fullName": "Ahmad Al-Masri",
      "nationalId": "P-100001",
      "gender": "Male",
      "dateOfBirth": "1991-04-12",
      "admissionDate": "2024-11-05",
      "status": "Incarcerated",
      "riskLevel": "Medium",
      "notes": "Optional",
      "currentCellId": 1
   }
   ```
- **Relationship Loading:** services eagerly include related entities (e.g., `GET /prisoners` returns `currentCell`, `assignments`, `crimeRecords`, etc.). Frontend can display nested cards without extra calls.
- **Environment Variables:** frontend should externalize API base/ports to match backend deployment (Docker/Heroku/etc.).

## Bootstrapping Flow
1. `src/main.ts` boots Nest, enables global validation (`ValidationPipe`) and permissive CORS.
2. `src/app/app.module.ts` loads:
   - `ConfigModule` for `.env` variables.
   - `TypeOrmModule.forRootAsync` for Postgres connection (`entities: join(__dirname, '**/*.entity.{ts,js}')`).
   - `UserModule` & `StaffAuthModule` for authentication lifecycle.
   - All facility feature modules (cells, prisoners, etc.).
3. Requests hit REST endpoints under `/api/*` (matching `routes.json`). Guards verify JWT + roles before controllers invoke services.

## Security & Roles
- Roles enumerated in `src/shared/utils/enum.ts`: `admin`, `warden`, `guard`, `medical`, `case_manager`, `visitor_officer`, `clerk`.
- `AuthGuard` validates tokens; `AuthRolesGuard` checks `@Roles(...)` metadata and loads the user from DB.
- DTOs under each module use `class-validator` to sanitize client input.

## Modules Summary
| Module | Path | Key Responsibilities |
| --- | --- | --- |
| Cells | `src/app/facility/cells` | CRUD on cells, occupancy tracking, ties to assignments/prisoners. |
| Prisoners | `src/app/facility/prisoners` | Manages prisoner profiles, links to cells, crimes, visits, health, docs. |
| Cell Assignments | `src/app/facility/cell-assignments` | Tracks inmate moves between cells with start/end context. |
| Cases & Crime Records | `src/app/facility/cases`, `crime-records` | Legal case metadata and per-prisoner crime sentences. |
| Visitors & Visits | `src/app/facility/visitors`, `visits` | Visitor registry and visit schedule/status tracking. |
| Incidents | `src/app/facility/incidents` | Operational incident logging (fights, contraband, medical events). |
| Health Records | `src/app/facility/health-records` | Medical visits, diagnoses, treatments tied to prisoners and doctors. |
| Documents | `src/app/facility/documents` | Stores metadata for uploaded files (sentences, medical docs, incident reports). |
| Staff & User Accounts | `src/app/facility/staff`, `user-accounts` | HR records plus system login accounts (with hashed passwords). |

Each module includes:
- `entities/*.entity.ts`: TypeORM models with relations.
- `dto/create-*.dto.ts`, `dto/update-*.dto.ts`: validation schemas.
- `<feature>.service.ts`: business logic + repository access.
- `<feature>.controller.ts`: REST endpoints secured with RBAC.
- `<feature>.module.ts`: bundles repository injection + providers.

## Request Lifecycle
1. Client sends HTTP request (e.g., `POST /api/incidents`).
2. Middleware/guards authenticate and authorize via JWT + `UserType`.
3. Controller validates payload, delegates to service.
4. Service loads required entities (throwing `NotFoundException`/`ConflictException` when needed) and interacts with Postgres.
5. Response returns structured JSON including eager relations.

## Data Sources
- Sample datasets in `db.json` & routing map `routes.json` (copied into project root) define expected payloads and endpoints.

## Future Enhancements
1. **Database Seeds/Migrations:** generate migrations from current entities and seed initial data from `db.json`.
2. **Query Filters & Pagination:** add DTOs for filtering visits/incidents by date or severity.
3. **Testing:** implement unit + e2e tests for guards and facility modules via Jest.
4. **File Handling:** integrate actual storage (e.g., Cloudinary/S3) for document uploads if needed.

This document serves as the canonical reference for the architecture and flow of the Halltimate backend.
