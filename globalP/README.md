# InternHub – All-in-One Internship Aggregator Platform

> **Tagline:** One Platform. Every Internship Opportunity.

InternHub is a centralized, modern, and responsive internship aggregator web application. It brings student opportunities from multiple job boards (Internshala, LinkedIn, Indeed, Wellfound, Naukri, and Company Career Pages) into a unified, clean interface with zero platform fees and direct employer links.

---

## 🌟 Key Features

### 1. Landing / Home Page
- **Hero Section:** Prominent search bar with role, company, skills, and location selectors.
- **Platform Statistics:** Aggregation volume counters (15,000+ internships, 500+ verified companies, 6 indexed portals).
- **Popular Categories:** 8 major technical tracks (Web Dev, App Dev, Data Science, AI/ML, UI/UX, Java, Python, Marketing).
- **Featured Opportunities:** Curated internships with quick filter tabs (Remote, High Stipend ₹40k+, Design).
- **Why Choose InternHub & How It Works:** Clean 3-step timeline and value propositions.
- **Aggregated Portals Showcase:** Transparency on indexed platforms.

### 2. Explore Internships Page (Core Dashboard)
- **Multi-parameter Search:** Instant keyword matching across title, company, skills, and category.
- **Interactive Filter Sidebar:**
  - Categories (single / multi)
  - Work Mode (Remote, Hybrid, On-site)
  - Minimum Stipend Range slider/radios (₹20k+, ₹30k+, ₹40k+, ₹50k+)
  - Duration filters (1-2 months, 3 months, 4-5 months, 6 months)
  - Experience Level (Fresher / Student, Intermediate)
  - Source Platform (Internshala, LinkedIn, Indeed, Wellfound, Naukri, Direct Career Page)
- **Sorting Engine:** Latest, Oldest, Highest Stipend, Lowest Stipend.
- **Layout Switcher:** Grid card view vs Compact list view.
- **Pagination & Counter:** Working page navigation and dynamic results count.
- **Empty State Handling:** Friendly reset options when no criteria match.

### 3. Internship Details Page
- Detailed role overview, key responsibilities list, eligibility criteria, and technical skills tags.
- Stipend, duration, application deadline, and source platform badges.
- **Apply Now:** Opens the sample original employer/portal URL in a new tab.
- **Bookmark & Share:** Save to bookmarks or copy link to clipboard with toast notification.
- **Similar Internships:** Automatically surfaces related roles from the same category or work mode.

### 4. Student Dashboard
- Student profile view (Name, College, Current Education, Graduation Year, Bio).
- **Skill Manager:** Add or remove skills with live matching against catalog openings.
- **Tabbed Activity:** Saved Internships, Recently Viewed roles, and AI-recommended positions.
- **Profile Editor:** In-place modal to update student details.

### 5. Saved Internships Page
- Dedicated view of all bookmarked internships with LocalStorage persistence.
- In-page search and category filter.
- Quick direct apply and details link.

### 6. Admin Control Center (Prototype)
- **Live Metrics:** Total listings, active listings, expired listings, featured counts, demo students.
- **Interactive Listings Table:** Search, filter by source or status.
- **Full CRUD Operations:** Add new internships, edit existing listings, and delete roles.
- **Source Platform Management:** Real-time distribution across indexed job portals.
- **Reset to Default Data:** Safely restore the 24 default sample records at any time.

---

## 🛠️ Technology Stack

- **Framework:** React 18 + Vite 5
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React
- **Typography:** Inter & Plus Jakarta Sans
- **State & Storage:** React Context API + Browser HTML5 LocalStorage

---

## 📁 Project Structure

```
internhub/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    ├── data/
    │   └── internships.js       # 24 realistic sample internship records across 6 sources
    ├── utils/
    │   └── helpers.js           # Currency, relative date & badge formatters
    ├── context/
    │   ├── AuthContext.jsx       # Student & Admin demo auth & profile state
    │   └── InternshipsContext.jsx# Internships catalog, bookmarks & CRUD state
    ├── layouts/
    │   └── MainLayout.jsx       # Global navbar, footer and scroll reset wrapper
    ├── components/
    │   └── common/
    │       ├── Navbar.jsx       # Responsive header with mobile drawer
    │       ├── Footer.jsx       # SaaS footer with disclaimer & links
    │       ├── InternshipCard.jsx # Grid & list card variants
    │       ├── BookmarkButton.jsx
    │       ├── Badge.jsx        # Source, work mode & status badges
    │       ├── SearchBar.jsx    # Hero & compact search components
    │       ├── FilterSidebar.jsx# Collapsible faceted filter sidebar
    │       ├── CategoryCard.jsx # Specialization cards
    │       └── Pagination.jsx   # Numbered pagination component
    └── pages/
        ├── HomePage.jsx
        ├── ExplorePage.jsx
        ├── InternshipDetailsPage.jsx
        ├── CategoriesPage.jsx
        ├── SavedInternshipsPage.jsx
        ├── LoginPage.jsx
        ├── SignupPage.jsx
        ├── StudentDashboardPage.jsx
        ├── AboutUsPage.jsx
        ├── AdminDashboardPage.jsx
        └── NotFoundPage.jsx
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps

1. Navigate to the project directory:
   ```bash
   cd C:\Users\devas\.gemini\antigravity\scratch\internhub
   ```

2. Start the local Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit:
   ```
   http://localhost:3000
   ```

4. To build for production:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Logins

- **Student Demo:** Click the **Student Demo** button on the Login page or sign in as `rahul.sharma@college.edu`.
- **Admin Demo:** Click the **Admin Demo** button on the Login page or click **Admin Dashboard** in the navbar/footer.

---

## 🔮 Future Backend & API Integration Guidelines

The codebase is modularly designed so a backend (Node.js/Express/MongoDB) and web-scraping/API ingestion pipelines can be integrated seamlessly:
1. Replace `InternshipsContext.jsx` localStorage queries with REST API calls (`/api/internships`, `/api/bookmarks`).
2. Replace `AuthContext.jsx` with JWT / OAuth session handling (`/api/auth/login`, `/api/auth/register`).
3. Connect automated crawlers or official job APIs to continuously ingest listings into MongoDB.
