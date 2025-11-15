
# **Incident Management System**

A full-stack application built with **React, Node.js (BFF), and ServiceNow** to simplify and streamline incident creation, viewing, and management.

## **🔍 Problem**

The default ServiceNow UI overwhelms non-technical users.
This leads to:

* Slow adoption
* Incorrect or incomplete data entry
* Friction in simple tasks like creating or tracking incidents

## **🎯 Solution**

A lightweight, modern interface that focuses only on what the end-user needs — creating and managing incidents — while the backend securely integrates with ServiceNow using OAuth 2.0 PKCE.

## **🚀 Key Features**

### **✔ Secure OAuth 2.0 (PKCE)**

* Full PKCE flow handled **entirely on the backend**
* No tokens stored on the frontend
* Tokens stored safely in **HttpOnly server-side sessions**

### **✔ Full Incident CRUD**

* Create
* Read
* Update
* Delete
  All actions communicate directly with the **ServiceNow Table API** through the BFF layer.

### **✔ Modern Responsive UI**

* Built with **Material-UI**
* Light/Dark mode support
* Clean dashboard layout
* Reusable dynamic form for Create/Edit

### **✔ Backend-for-Frontend (BFF) Pattern**

Solves the security problems of SPAs:

* Frontend never sees tokens
* Backend manages OAuth, refresh tokens, and API proxying
* React simply talks to `/api/*` endpoints

---

# **🧱 System Architecture**

```
React UI  →  Node.js BFF  →  ServiceNow
```

### **Frontend (client/)**

* React + Vite
* React Router
* Material-UI
* Axios
* React Context API (Auth & Theme)

### **Backend (BFF/)**

* Node.js
* Express
* ServiceNow Table API
* OAuth 2.0 PKCE
* HttpOnly cookies
* Automatic token refreshing

---

# **📂 Folder Structure**

```
root
│── client/            # React frontend
│   ├── src/
│   │   ├── AuthProvider.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── Home.jsx
│   │   ├── App.jsx
│   │   └── components/
│
│── bff/               # Backend-for-Frontend server
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── services/
```

---

# **🔐 Authentication Flow (PKCE)**

1. **User clicks Login** → Frontend calls `/auth/login`
2. **BFF generates** `code_challenge` → Redirects to ServiceNow login
3. **ServiceNow sends back** `auth_code` → BFF receives it on `/auth/callback`
4. **BFF exchanges code** + `code_verifier` → Gets `access_token` & `refresh_token`
5. Tokens stored in secure sessions → User logged in

---

# **🖥 UI Highlights**

### **Dashboard**

* Grid-based card layout
* Shows all incidents
* Edit/Delete actions on each card

### **Reusable Form**

* Same component handles Create + Update
* Pre-fills values when editing

### **Theme Toggle**

* Dark/Light mode using context state

### **About Page**

* Shows system stats like High/Medium/Low incident counts
* Displays an MUI chart (bar graph)

---

# **⚙ Installation & Setup**

### **1️⃣ Clone the repo**

```bash
git clone https://github.com/your-username/incident-management-system.git
cd incident-management-system
```

---

## **Frontend Setup**

```bash
cd client
npm install
npm run dev
```

---

## **Backend Setup**

```bash
cd bff
npm install
node server.js
```

---

# **🔧 Environment Variables**

Create a `.env` inside **bff**:

```
SERVICENOW_INSTANCE_URL=
SERVICENOW_CLIENT_ID=
SERVICENOW_REDIRECT_URL=
SERVICENOW_TOKEN_URL=
SERVICENOW_AUTH_URL=
SESSION_SECRET=
```

---

# **📡 API Endpoints (BFF Layer)**

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /api/incidents     | Get all incidents     |
| POST   | /api/incidents     | Create incident       |
| PUT    | /api/incidents/:id | Update incident       |
| DELETE | /api/incidents/:id | Delete incident       |
| GET    | /auth/login        | Start OAuth login     |
| GET    | /auth/callback     | Handle OAuth callback |

---

# **⚠ Challenges Solved**

### **Token security**

Storing tokens in localStorage is a security failure.
This design avoids that completely.

### **Secure OAuth in SPA**

Solved using BFF + PKCE combination.

### **Handling large incident metadata**

Managed using controlled components & unified form state.

---

# **📺 Demo**
