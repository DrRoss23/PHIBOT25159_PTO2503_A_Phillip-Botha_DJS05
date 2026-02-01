# DJS05 – React Podcast Explorer

This project is a **React-based podcast browsing application** built for the DJS05 assessment. It allows users to browse, search, filter, sort, and explore detailed podcast information using **dynamic routing**, **global state management with React Context**, and a clean, maintainable component architecture.

The application consumes podcast data from an external API and focuses on providing a smooth, predictable user experience with proper loading, error, and empty states.

---

## 🚀 Features Overview

### Podcast Browsing

- Fetches podcast data from:
  - `https://podcast-api.netlify.app/shows`
- Displays podcasts in a responsive grid layout
- Each podcast links to its own dedicated detail page

### Search, Filter & Sort

- **Search** podcasts by title (case-insensitive)
- **Filter** podcasts by genre using a dropdown
- **Sort** podcasts by:
  - Title (A–Z)
  - Title (Z–A)
  - Last updated (newest first)
  - Last updated (oldest first)
- All search, filter, and sort state persists when navigating between pages

### Podcast Detail Page

- Dynamic routing using a unique show ID (`/show/:id`)
- Displays:
  - Podcast title
  - Large podcast image
  - Description
  - Genre tags
  - Human-readable “last updated” date
- Season selector allows users to switch between seasons
- Episode list displays:
  - Episode number
  - Episode title
  - Truncated episode description
  - Season image next to each episode

### User Experience & UX States

- Loading indicators while data is being fetched
- Graceful error messages if API requests fail
- Clear empty-state messaging when no podcasts match current filters

---

## 🧠 Technical Architecture

### Routing & Navigation

- Implemented using **React Router**
- Dynamic routes ensure each podcast has a unique detail page
- Correct show IDs are passed via route parameters
- Global state persists when navigating back to the home page

### State Management

- Global state managed using the **React Context API**
- The `PodcastProvider` stores and manages:
  - Podcast data
  - Search query
  - Selected genre
  - Sort option
  - Loading and error states
- Context is provided at the top level of the application to ensure all components have access when needed

### Component Structure

- **Pages** handle data orchestration and routing
- **Presentational components** (cards, grids, UI elements) focus on rendering
- **Utility functions** handle reusable logic such as date formatting
- **CSS Modules** are used to scope styles per component

---

## 🧪 Error Handling & Edge Cases

- Loading and error states are explicitly handled to avoid blank screens
- A small number of podcasts from the external API contain incomplete or unexpected data
- These edge cases are handled gracefully without breaking core functionality

---

## 🛠️ How to Run the Project

1. Clone the repository or download the source code
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

---

## 📋 Rubric Alignment (DJS05)

- **P3.72–P3.75**: Navigation, routing, and correct ID passing
- **P3.76–P3.79**: Data fetching with loading, error, and empty states
- **P3.80–P3.84**: Complete podcast show details
- **P3.85–P3.92**: Season navigation and episode display
- **P3.93–P3.94**: Comprehensive JSDoc documentation and consistent formatting

---

## ✅ Final Notes

This project emphasises clean architecture, predictable state management, and clear documentation. All major functions and components are documented with JSDoc comments to ensure the codebase is easy to understand, maintain, and review.
