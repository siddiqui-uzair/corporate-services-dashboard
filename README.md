# Corporate Services Dashboard

A modern **React dashboard** for managing corporate office service requests with real-time status tracking and data persistence.

## Features

✅ Add, view, and delete service requests

✅ Track status (Pending, Approved, Completed)

✅ Real-time statistics dashboard

✅ Completion history with toggle view

✅ Data persists with localStorage (survives refresh)

✅ Responsive design (mobile-friendly)

✅ Modern UI with inline styling

## Technologies

- React 18
- JavaScript / HTML5 / CSS3
- React Hooks (State Management)
- localStorage API (Data Persistence)

## Quick Start

```bash
git clone https://github.com/siddiqui-uzair/corporate-services-dashboard.git
cd corporate-dashboard
npm install
npm start
```

Open http://localhost:3000

## How to Use

1. **Add Request:** Type service name, select status, click "Add Request"
2. **Change Status:** Click dropdown to update (Pending → Approved → Completed)
3. **View History:** Click "Show Completion History" to see completed requests
4. **Delete:** Click "Delete" button to remove requests
5. **Refresh:** Close and reopen - your data persists!

## Project Structure
src/

├── App.js        # Main component with all logic

├── index.js      # React entry point

└── index.css     # Global styles

### Statistics Dashboard
- Real-time count of total, pending, approved, and completed requests

### Active Requests Table
- View and manage in-progress requests
- Change status with dropdown
- Delete requests instantly

### Completion History
- Toggle view of all completed requests
- Shows completion date
- Read-only archive

### Data Persistence
- All requests saved to browser's localStorage
- Data survives page refresh and browser restart
- Automatic save on every change
