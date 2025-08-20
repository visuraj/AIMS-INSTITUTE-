# AIMS INSTITUTE – Student–Faculty Communication Platform

A modern college communication & management system with **three roles** — **Student**, **Faculty**, and **Admin** — enabling seamless requests, approvals, academics tracking, and real‑time updates.

---

## Overview

**AIMS INSTITUTE** streamlines communication between students and faculty while giving admins robust control over access and governance. Students can submit **leave requests**, check **syllabus coverage** and **performance**, and message faculty. Faculty can approve/deny requests, publish coursework & marks, and manage sections. Admins control onboarding for both students and faculty, configure programs, and oversee the system.

> Built as a full‑stack MERN + React Native project with real‑time capabilities.

---

## Key Outcomes

* **Faster communication** between students and faculty via structured requests & real‑time updates.
* **Transparent academics**: syllabus coverage, attendance, marks, and performance trends.
* **Role‑based access** with admin approvals and fine‑grained permissions.
* **Mobile‑first experience** for on‑the‑go usage (Expo/React Native app).

---

## Core Features

### 1) Student Module

* **Leave Requests**: create, view status, cancel.
* **Syllabus & Coursework**: view subject-wise syllabus coverage, announcements, and resources.
* **Performance Dashboard**: attendance %, internal marks, assignment scores, charts.
* **Faculty Communication**: message faculty (threaded), raise queries.
* **Notifications**: request status changes, new marks, announcements.

### 2) Faculty Module

* **Approve/Reject Requests** with remarks.
* **Syllabus Management**: update coverage %, upload materials, post announcements.
* **Assessments**: create assignments/quizzes, enter marks & attendance.
* **Permissions**: configure which students get access to special permissions (lab usage, project slots).
* **Messaging**: respond to student queries.

### 3) Admin Module

* **Onboarding & Access Control**: add/approve students and faculty; program/semester mapping.
* **Master Data**: departments, courses, subjects, sections, academic calendar.
* **Roles & Permissions**: RBAC policies for Student/Faculty/Admin.
* **Audits & Reports**: usage logs, request history, performance summaries.

---

## Technology Stack

### Backend

* **Node.js** + **Express.js** (API & RBAC)
* **MongoDB** + **Mongoose** (data models)
* **Socket.IO** (real-time updates)
* **JWT** + **BCrypt** (auth & password security)
* **TypeScript** (strong typing)

### Web & Mobile Frontend

* **React** (admin + faculty web dashboard)
* **React Native** + **Expo** (student & faculty mobile app)
* **TypeScript**, **React Navigation**, **Socket.IO Client**

### DevOps & Tooling

* **dotenv** for config, **ESLint/Prettier**, **Jest** (unit tests)
* Optional: **Docker**, **GitHub Actions** CI/CD

---

## System Architecture (High Level)

* **API Gateway / Express Server**: REST endpoints + Socket.IO server
* **MongoDB**: collections for users, roles, courses, sections, requests, attendance, marks, syllabus, messages
* **Web Dashboard**: Admin & Faculty operations
* **Mobile App**: Student-first, supports faculty basics

---

## Example Data Model (Simplified)

```ts
// server/src/models/LeaveRequest.ts
interface LeaveRequest {
  _id: string;
  studentId: string;           // ref: User
  facultyReviewerId: string;   // ref: User (faculty)
  subject?: string;            // optional subject/course context
  reason: string;
  fromDate: Date;
  toDate: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  facultyRemark?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## API Endpoints (Sample)

**Auth**

* `POST /api/auth/register` – Admin creates users or invites
* `POST /api/auth/login` – Issue JWT

**Students**

* `GET /api/students/me` – Profile & enrollment
* `POST /api/students/leave` – Create leave request
* `GET /api/students/leave` – List my requests
* `GET /api/students/performance` – Attendance & marks summary
* `GET /api/students/syllabus` – Subject coverage & materials

**Faculty**

* `GET /api/faculty/requests` – Pending student requests
* `PATCH /api/faculty/requests/:id` – Approve/Reject with remark
* `POST /api/faculty/marks` – Upsert marks
* `PATCH /api/faculty/syllabus/:subjectId` – Update coverage

**Admin**

* `POST /api/admin/users` – Create/approve users
* `POST /api/admin/courses` – Manage courses/subjects/sections
* `GET  /api/admin/reports` – System reports

**Realtime**

* `socket.io`: channels for notifications, messages, request status

---

## Folder Structure (Monorepo Suggestion)

```
AIMS-INSTITUTE/
├─ server/                # Node/Express API (TypeScript)
│  ├─ src/
│  │  ├─ config/
│  │  ├─ middlewares/
│  │  ├─ models/
│  │  ├─ controllers/
│  │  ├─ routes/
│  │  ├─ sockets/
│  │  └─ index.ts
│  └─ package.json
├─ web-admin/             # React web (Admin & Faculty dashboards)
│  └─ src/
├─ mobile/                # React Native (Student app; basic faculty)
│  └─ src/
└─ README.md
```

---

## Getting Started

### Prerequisites

* Node.js 18+
* MongoDB (local or cloud)
* npm or yarn
* Expo CLI (for mobile): `npm i -g expo-cli`

### 1) Clone & Install

```bash
git clone https://github.com/visuraj/AIMS-INSTITUTE-.git
cd AIMS-INSTITUTE-
```

#### Backend

```bash
cd server
npm install
cp .env.example .env
```

Fill `.env` variables (see below), then:

```bash
npm run dev
```

#### Web Admin (React)

```bash
cd ../web-admin
npm install
npm run dev
```

#### Mobile (React Native)

```bash
cd ../mobile
npm install
npx expo start -c
```

### Environment Variables

Create **server/.env**

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/db
JWT_SECRET=replace_with_strong_secret
CLIENT_ORIGIN=http://localhost:5173
```

Create **mobile/src/config.ts**

```ts
export const API_URL = 'http://<your-local-ip>:5000';
```

---

## Usage Flows

### Student

1. Login → Dashboard with attendance & marks widgets
2. Submit **Leave Request** → gets real‑time status via notifications
3. Check **Syllabus** per subject + resources
4. View **Performance** trends

### Faculty

1. Review **Pending Requests** → Approve/Reject (with remark)
2. Update **Syllabus Coverage**, upload materials
3. Record **Attendance/Marks**

### Admin

1. Create/Approve users (students & faculty)
2. Configure departments, courses, sections, calendar
3. Audit logs & reports

---

## Security & Permissions

* **RBAC** middleware checks `req.user.role` for every protected route
* **JWT** access tokens; refresh tokens optional
* Input validation with **zod/joi**; centralized error handler
* **Rate limiting** & CORS configured

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/<feature-name>`
3. Commit: `git commit -m "feat: add <feature>"`
4. Push: `git push origin feat/<feature-name>`
5. Open a Pull Request

---

## Scripts (examples)

**server/package.json**

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -p .",
    "start": "node dist/index.js",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

---

## Roadmap

* [ ] Role-based dashboards with widgets
* [ ] Bulk CSV import for students/faculty
* [ ] Notifications center & email
* [ ] Calendar integration (exam, events)
* [ ] Attendance via QR/NFC (optional)
* [ ] Export reports (PDF/CSV)

---

## License

This project is licensed under the **MIT License**.

---

## Quick Git Commands (first push)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/visuraj/AIMS-INSTITUTE-.git
git push -u origin main
```

> If your default branch is `master`, replace the last two lines with:

```bash
git push -u origin master
```

---

## Screens (Suggested)

* Student: Dashboard, Leave Request, Syllabus, Performance
* Faculty: Requests, Syllabus, Assessments, Messages
* Admin: Users, Courses/Sections, Approvals, Reports

---

### Notes

* Replace placeholders (e.g., IPs, DB URI) with your environment values.
* For Expo on device, ensure your phone and dev machine are on the same network.
