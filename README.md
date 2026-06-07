<div align="center">

<br />

```
███████╗██╗     ██╗████████╗███████╗    ███████╗██╗████████╗███╗   ██╗███████╗███████╗███████╗
██╔════╝██║     ██║╚══██╔══╝██╔════╝    ██╔════╝██║╚══██╔══╝████╗  ██║██╔════╝██╔════╝██╔════╝
█████╗  ██║     ██║   ██║   █████╗      █████╗  ██║   ██║   ██╔██╗ ██║█████╗  ███████╗███████╗
██╔══╝  ██║     ██║   ██║   ██╔══╝      ██╔══╝  ██║   ██║   ██║╚██╗██║██╔══╝  ╚════██║╚════██║
███████╗███████╗██║   ██║   ███████╗    ██║     ██║   ██║   ██║ ╚████║███████╗███████║███████║
╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝    ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝
```

### 🏆 Premium Gym Website — Full Stack with React & Firebase

<br />

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

> **A production-ready, dark-themed gym website with a full admin dashboard,
> Firebase backend, cinematic logo intro, competition management, and CSV exports.**

<br />

[🚀 Quick Start](#-quick-start) · [📁 Project Structure](#-project-structure) · [🔐 Admin Panel](#-admin-panel) · [🔥 Firebase Setup](#-firebase-setup) · [🎨 Design System](#-design-system) · [🚢 Deployment](#-deployment)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🌐 Public Website
- 🎬 **Cinematic logo intro** with panoramic animation (once per session)
- 🦸 **Hero section** with animated stats and dual CTAs
- 💰 **4-tier membership plans** with best-value highlight
- 📋 **Free trial form** → saves to Firestore
- 🏆 **Offers & Competitions** — live from Firebase
- 🖼️ **Filterable photo gallery** with lightbox
- 💪 **Success stories** with before/after cards
- 📍 **Contact page** with embedded Google Maps
- 💬 **Floating WhatsApp button** on every page
- 📱 **Fully responsive** — mobile, tablet, desktop

</td>
<td width="50%">

### 🔐 Admin Dashboard
- 🔑 **Firebase Authentication** — protected routes
- 📊 **Live dashboard stats** — registrations, entries, offers, competitions
- 📝 **Offers CRUD** — create, edit, delete, toggle active
- 🏅 **Competitions CRUD** — full management
- 🎲 **Random Winner Generator** — picks & saves winner to Firebase
- 👥 **Trial Registrations viewer** — search, filter, CSV export
- 🥊 **Competition Entries viewer** — search, filter by competition, CSV export
- 🚫 **Duplicate prevention** — phone number uniqueness per competition

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **UI Framework** | React | 18.2 | Component-based UI |
| **Build Tool** | Vite | 5.0 | Fast dev server & bundler |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Animations** | Framer Motion | 10.18 | Smooth transitions |
| **Routing** | React Router DOM | 6.21 | Client-side routing |
| **Database** | Firebase Firestore | 10.7 | Real-time NoSQL database |
| **Auth** | Firebase Authentication | 10.7 | Admin login |
| **Icons** | React Icons | 5.0 | Icon library |
| **Toasts** | React Hot Toast | 2.4 | Notifications |
| **Dates** | date-fns | 3.2 | Date formatting |

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

```
Node.js  ≥ 18.0.0
npm      ≥ 9.0.0
```

### Step 1 — Clone & Install

```bash
# Extract the project zip
unzip elite-fitness-gym.zip
cd gym-website

# Install all dependencies
npm install
```

### Step 2 — Environment Variables

```bash
# Copy the example env file
cp .env.example .env
```

Open `.env` and fill in your values:

```env
# ── Firebase Config ──────────────────────────────────────────
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# ── Gym Contact Info ─────────────────────────────────────────
VITE_WHATSAPP_NUMBER=201234567890          # No + or spaces
VITE_PHONE_NUMBER=+20 123 456 7890
VITE_GYM_ADDRESS=123 Fitness Street, Cairo, Egypt
VITE_GOOGLE_MAPS_EMBED=https://maps.google.com/maps?q=YOUR+ADDRESS&output=embed
```

### Step 3 — Firebase Setup

See the full [Firebase Setup](#-firebase-setup) section below.

### Step 4 — Run

```bash
npm run dev
```

Open **http://localhost:5173** — the site will launch with the logo intro animation.

---

## 🔥 Firebase Setup

### 1. Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → name it (e.g. `elite-fitness`)
3. Disable Google Analytics (optional) → **Create Project**

### 2. Register a Web App

1. In your project, click the **Web** icon `</>`
2. Enter an app nickname (e.g. `elite-fitness-web`)
3. Click **Register App**
4. Copy the config values into your `.env` file

### 3. Enable Authentication

```
Firebase Console
  └── Authentication
        └── Sign-in method
              └── Email/Password → Enable → Save
```

Then create your admin user:

```
Firebase Console
  └── Authentication
        └── Users
              └── Add User
                    ├── Email:    admin@yourgym.com
                    └── Password: YourStrongPassword123!
```

### 4. Create Firestore Database

```
Firebase Console
  └── Firestore Database
        └── Create database
              └── Start in Production mode
                    └── Choose a location (e.g. eur3) → Done
```

### 5. Deploy Security Rules

In **Firestore → Rules**, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public can read active offers and competitions
    match /offers/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /competitions/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Anyone can register for a free trial
    match /trial_registrations/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }

    // Anyone can enter a competition
    match /competition_entries/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }

    // Winners are public to read, only admin can write
    match /winners/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

### 6. Firebase Collections Schema

The following collections are created automatically when users submit forms:

| Collection | Field | Type | Description |
|---|---|---|---|
| `trial_registrations` | `fullName` | string | Member's full name |
| | `phone` | string | Contact number |
| | `age` | number | Member's age |
| | `goal` | string | Fitness goal |
| | `createdAt` | timestamp | Auto-generated |
| `competition_entries` | `fullName` | string | Participant's name |
| | `phone` | string | Contact number |
| | `competitionId` | string | Reference to competition |
| | `competitionTitle` | string | Denormalized title |
| | `createdAt` | timestamp | Auto-generated |
| `offers` | `title` | string | Offer headline |
| | `description` | string | Offer details |
| | `endDate` | timestamp | Expiry date |
| | `active` | boolean | Visibility toggle |
| `competitions` | `title` | string | Competition name |
| | `description` | string | Details |
| | `prize` | string | Prize description |
| | `endDate` | timestamp | Registration deadline |
| | `active` | boolean | Visibility toggle |
| `winners` | `competitionId` | string | Competition reference |
| | `competitionTitle` | string | Competition name |
| | `winnerName` | string | Selected winner |
| | `winnerPhone` | string | Winner's phone |
| | `selectedAt` | timestamp | When drawn |
| | `totalParticipants` | number | Pool size at draw time |

---

## 📁 Project Structure

```
gym-website/
│
├── public/
│   └── favicon.svg                    # Gold diamond logo icon
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── admin/
│   │   │   ├── CrudModal.jsx          # Reusable create/edit modal wrapper
│   │   │   └── DataTable.jsx          # Table with search, filter, CSV export
│   │   │
│   │   ├── common/
│   │   │   ├── LogoIntro.jsx          # Cinematic logo reveal (session-once)
│   │   │   ├── ProtectedRoute.jsx     # Firebase auth guard for admin routes
│   │   │   ├── SectionTitle.jsx       # Reusable gold-accented section header
│   │   │   └── WhatsAppButton.jsx     # Floating animated WhatsApp CTA
│   │   │
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx        # Collapsible sidebar + top bar
│   │   │   ├── Footer.jsx             # Links, hours, social icons
│   │   │   ├── MainLayout.jsx         # Navbar + Footer + WhatsApp wrapper
│   │   │   └── Navbar.jsx             # Sticky navbar with mobile drawer
│   │   │
│   │   └── sections/
│   │       ├── FreeTrialForm.jsx      # Trial registration → Firestore
│   │       ├── HeroSection.jsx        # Full-screen hero with particles
│   │       ├── MembershipPlans.jsx    # 4-tier pricing cards
│   │       └── OffersSection.jsx      # Offers + Competition modal registration
│   │
│   ├── context/
│   │   └── AuthContext.jsx            # Firebase Auth context + hooks
│   │
│   ├── hooks/
│   │   └── useFirestore.js            # All Firestore operations (CRUD + realtime)
│   │
│   ├── lib/
│   │   └── firebase.js                # Firebase initialization + security rules
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLoginPage.jsx     # Email/password login
│   │   │   ├── AdminDashboard.jsx     # Stats overview + recent activity
│   │   │   ├── AdminOffers.jsx        # Full offers CRUD
│   │   │   ├── AdminCompetitions.jsx  # Competitions CRUD + winner picker
│   │   │   ├── AdminTrialRegistrations.jsx
│   │   │   └── AdminCompetitionEntries.jsx
│   │   │
│   │   ├── AboutPage.jsx              # Story, facilities, trainers
│   │   ├── ContactPage.jsx            # Map, hours, WhatsApp CTA
│   │   ├── GalleryPage.jsx            # Filterable grid + lightbox
│   │   ├── HomePage.jsx               # All home sections combined
│   │   ├── MembershipPage.jsx         # Plans + trial form
│   │   ├── OffersPage.jsx             # Offers + competitions
│   │   └── SuccessStoriesPage.jsx     # Before/after stories
│   │
│   ├── App.jsx                        # Route definitions
│   ├── index.css                      # Tailwind + custom animations
│   └── main.jsx                       # React DOM entry point
│
├── .env.example                       # Environment variable template
├── index.html                         # Vite HTML entry + Google Fonts
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, features, plans preview, trial form, testimonials |
| `/membership` | Membership | Full pricing table + included features |
| `/about` | About | Gym story, facilities, trainer profiles |
| `/offers` | Offers | Active offers + competition cards with registration |
| `/gallery` | Gallery | Filterable photo grid with lightbox |
| `/success-stories` | Success Stories | Member transformation cards |
| `/contact` | Contact | Map embed, hours, all contact methods |
| `/admin/login` | Admin Login | Firebase email/password authentication |
| `/admin` | Dashboard | Live stats + recent activity feed |
| `/admin/offers` | Manage Offers | CRUD table with toggle |
| `/admin/competitions` | Manage Competitions | CRUD cards + winner generator |
| `/admin/trial-registrations` | Trial Registrations | Searchable table + CSV export |
| `/admin/competition-entries` | Competition Entries | Filterable table + CSV export |

---

## 🔐 Admin Panel

Navigate to `/admin/login` and sign in with the admin account you created in Firebase.

### Dashboard

Displays four live-updating stat cards pulled directly from Firestore:
- Total trial registrations
- Total competition entries
- Active offers count
- Active competitions count

Also shows the **5 most recent** registrations and competition entries.

### Random Winner Generator

In **Manage Competitions**, each competition card has a **Pick Winner** button:

1. Loads all entries for that competition from Firestore
2. Plays a dice-rolling animation (1.8s)
3. Selects one entry at random using `Math.random()`
4. Saves the winner document to the `winners` collection with timestamp and total participant count
5. Displays the winner's name and phone number

### CSV Export

Available on both registration tables. Exports all currently **filtered & searched** rows. File is named with the current date, e.g.:

```
trial_registrations_2024-03-15.csv
competition_entries_2024-03-15.csv
```

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Gold | `#D4AF37` | Primary accent, buttons, highlights |
| Gold Light | `#F0D060` | Hover states |
| Gold Dark | `#B8960C` | Active states, gradient start |
| Dark | `#0A0A0A` | Page background |
| Dark 100 | `#111111` | Alternate sections |
| Dark 200 | `#1A1A1A` | Card backgrounds |
| Dark 300 | `#222222` | Input backgrounds |
| Dark 400 | `#2A2A2A` | Borders |

### Typography

| Role | Font | Source |
|---|---|---|
| Headings | **Bebas Neue** | Google Fonts |
| Body | **Barlow** | Google Fonts |
| Accent | **Cinzel** | Google Fonts |

### Custom Tailwind Classes

| Class | Description |
|---|---|
| `.btn-gold` | Filled gold button with glow hover |
| `.btn-outline` | Gold bordered button, fills on hover |
| `.input-dark` | Dark input with gold focus border |
| `.card-dark` | Dark card with border |
| `.section-title` | Large uppercase heading |
| `.section-padding` | Consistent section padding |
| `.text-gold-shimmer` | Animated gradient gold text |
| `.text-gold-accent` | Small uppercase gold label |
| `.gold-divider` | Centered gold horizontal rule |

---

## 📸 Adding Real Photos

The gallery uses placeholder CSS gradients. To add your own photos:

**1. Place your images in `/public/images/`:**
```
public/
└── images/
    ├── gym-floor.jpg
    ├── cardio-section.jpg
    ├── group-class.jpg
    └── ...
```

**2. Update `src/pages/GalleryPage.jsx`** — add an `src` field to each gallery item:
```js
const galleryItems = [
  {
    id: 1,
    category: 'Equipment',
    label: 'Free Weights Zone',
    src: '/images/free-weights.jpg',   // ← add this
  },
  ...
]
```

**3. Replace the placeholder `<div>` with an `<img>`:**
```jsx
// Replace this:
<div className="w-full h-full ..." style={{ background: ... }} />

// With this:
<img
  src={item.src}
  alt={item.label}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
```

---

## 🗺️ Google Maps Embed

1. Go to [maps.google.com](https://maps.google.com)
2. Search for your gym's exact address
3. Click **Share** → **Embed a map** → **Copy HTML**
4. From the copied `<iframe>`, extract only the `src` URL
5. Set it in your `.env`:

```env
VITE_GOOGLE_MAPS_EMBED=https://www.google.com/maps/embed?pb=!1m18...
```

The map is displayed with a dark CSS filter to match the site theme.

---

## 🚢 Deployment

### Option A — Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# When prompted:
#   Public directory: dist
#   Single-page app: Yes
#   Overwrite index.html: No

# Build and deploy
npm run build
firebase deploy
```

### Option B — Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Set environment variables in Vercel dashboard:
# Project → Settings → Environment Variables
# Add all VITE_* variables from your .env
```

### Option C — Netlify

```bash
# Build the project
npm run build

# Drag and drop the /dist folder to netlify.com/drop
# OR use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

> ⚠️ **Important:** For Vercel and Netlify, add all your `VITE_*` environment variables in the hosting platform's dashboard — they are not included in the build output.

---

## 📱 Responsive Design

The site is built **mobile-first** with these breakpoints:

| Breakpoint | Width | Tailwind Prefix |
|---|---|---|
| Mobile | `< 768px` | *(default)* |
| Tablet | `≥ 768px` | `md:` |
| Large Tablet | `≥ 1024px` | `lg:` |
| Desktop | `≥ 1280px` | `xl:` |

Key responsive behaviors:
- Navbar collapses to a hamburger drawer on mobile
- Admin sidebar slides in as an overlay on mobile
- Membership plans stack from 4-column → 2-column → 1-column
- Hero text scales from `6xl` → `9xl`
- Gallery grid adjusts from 2 → 3 → 4 columns

---

## ⚙️ Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start local dev server at localhost:5173 |
| Build | `npm run build` | Production build to `/dist` |
| Preview | `npm run preview` | Preview production build locally |

---

## 🔧 Customization Guide

### Change Gym Name

Search and replace `ELITE FITNESS` / `Elite Fitness` across:
- `index.html` (title & meta)
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/common/LogoIntro.jsx`

### Change Colors

In `tailwind.config.js`, update the `gold` and `dark` color objects:

```js
colors: {
  gold: {
    DEFAULT: '#D4AF37',   // ← your primary accent color
    light:   '#F0D060',
    dark:    '#B8960C',
  },
  dark: {
    DEFAULT: '#0A0A0A',   // ← your background color
    ...
  }
}
```

### Update Membership Prices

Edit the `plans` array in `src/components/sections/MembershipPlans.jsx`:

```js
const plans = [
  {
    name: 'Monthly',
    price: '350',        // ← update price (EGP)
    ...
  },
  ...
]
```

### Update Contact Info

All contact details are controlled via `.env` variables — just update your `.env` file.

---

## 🐛 Troubleshooting

**Firebase permission denied errors**
→ Make sure you've published the Firestore Security Rules in step 5 of Firebase Setup.

**Admin login not working**
→ Verify Email/Password authentication is enabled in Firebase Console → Authentication → Sign-in method.

**Environment variables not loading**
→ All Vite env variables must start with `VITE_`. Restart the dev server after editing `.env`.

**Google Maps not showing**
→ Ensure your `VITE_GOOGLE_MAPS_EMBED` value is the full `src` URL from the iframe embed code, not the share URL.

**Logo intro shows every page refresh**
→ The intro uses `sessionStorage`. It shows once per browser session. Clear session storage or open a new tab to see it again.

---

## 📄 License

This project is licensed for personal and commercial use. You are free to modify, rebrand, and deploy it for your own gym or clients.

---

<div align="center">

Built with ❤️ and ☕ · Dark theme · Gold standard

**[⬆ Back to Top](#)**

</div>
# Costa-Gym-
