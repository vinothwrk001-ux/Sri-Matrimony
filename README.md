# SRI MATRIMONY — Trusted Tamil Matrimony SaaS Platform

> **Tagline**: Trusted Tamil Matrimony (நம்பகமான தமிழ் மேட்ரிமோனி)  
> **Brand Identity**: Premium, secure, authentic Tamil matrimonial platform uniting brides, grooms, and families with verified profiles, intelligent compatibility matchmaking, and robust privacy controls.

---

## 1. Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Tailwind v4) with custom Sri Matrimony design tokens
- **Typography**: Playfair Display (Headings), Poppins (Body & Navigation), Noto Sans Tamil (Tamil Language)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios with centralized request/response interceptors & token injection
- **Celebration Effects**: Canvas Confetti
- **Internationalization (i18n)**: Bilingual English / தமிழ் with persistent language switcher

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Local Instance at `mongodb://127.0.0.1:27017/sri_matrimony`) with Mongoose ODM
- **Authentication**: JWT (Access Token & Refresh Token strategy), bcryptjs password hashing
- **Security & Middleware**: Helmet, CORS with credentials, cookie-parser, express-rate-limit, Role-Based Access Control (RBAC)
- **Payment Gateway**: Razorpay Order Creation + HMAC SHA-256 signature verification + Instant 1-Click Sandbox Evaluation Mode
- **Real-Time Engine**: Socket.IO integration for instant alerts and messaging

---

## 2. Brand Colors & Design System

| Color Token | Hex Code | Purpose |
|---|---|---|
| **Deep Maroon** | `#4B1718` | Primary Brand Color, Navigation, Hero Background |
| **Dark Wine** | `#351011` | Footer Background, High-contrast Surfaces, Cards |
| **Burgundy** | `#682526` | Accents, Subtitles, Border Highlights |
| **Premium Gold** | `#D7AD4A` | Brand Badges, Ornamental Icons, CTA Buttons |
| **Light Gold** | `#F0D69C` | Gold Gradients, Subtitles, Header Text |
| **Warm Ivory** | `#FFFCF7` | Body Background, Card Surfaces |
| **Cream** | `#F8F1E7` | Form Fields, Table Rows, Secondary Background |
| **Charcoal Text**| `#321C1C` | High Readability Body Copy |

---

## 3. Core Features Implemented

### 1. Cinematic Welcome Splash Screen
- Full-screen deep maroon background with animated sacred geometric emblem
- Brand reveal and Tamil tagline
- **Concurrent initialization**: Automatically calls `/api/app/bootstrap` to fetch public config, pricing plans, member statistics, and active session
- Real loading progress bar and graceful retry handler if server is unreachable

### 2. Sticky Navigation Bar
- Brand logo emblem & typography
- Quick links: Home, About, Search, Plans, How It Works, Success Stories, Contact
- Language Switcher: Instant toggle between **English** and **தமிழ்**
- Authentication State:
  - When logged out: Login, Register Free
  - When logged in: Member Avatar, Membership Plan Badge (e.g. `STANDARD`), Dashboard link, Profile Menu, Admin Console (for admin), Logout

### 3. Complete Homepage Sections
1. **Hero Section**: Headline, cultural subtitle, register/browse CTAs, 3 Trust Badges (100% Verified Profiles, 10,000+ Happy Families, Safe & Secure Matrimony).
2. **Quick Partner Search**: Overlapping card with Looking For (Bride/Groom), Age Range (18-45), Religion, Caste, and Location dropdowns.
3. **Newly Joined Brides**: Horizontal profile carousel with swipe/arrow navigation.
4. **Newly Joined Grooms**: Horizontal profile carousel with touch/swipe controls.
5. **Recently Joined Members**: Combined carousel of active members.
6. **100% Verified Profiles Showcase**: Showcase of ID and contact-verified profiles.
7. **How Sri Matrimony Works**: 4 animated steps (Register Free, Search Matches, Express Interest, Get Verified).
8. **Membership Plans**: 4 interactive cards (Free ₹0, Standard ₹999 with POPULAR badge, Premium ₹1,999 with RECOMMENDED badge, Platinum ₹3,499 with VIP ACCESS).
9. **Success Stories**: Real wedding couple photographs, marriage dates, and authentic bilingual testimonials.
10. **Why Choose Sri Matrimony**: 4 trust pillars with custom icons.
11. **Get In Touch**: Contact banner with Call Us (+91 98400 12345), WhatsApp Us, and Send Message links.
12. **Detailed Footer**: Legal links, privacy policies, terms, refund guidelines, and Chennai office address.

### 4. Paid Membership Access Control & Entitlement Engine
- **Visitor**: Can view public pages and search cards. Private contact details and premium matching features are strictly locked.
- **Free Member**: Can edit profile, upload photos, and browse matching cards. Contact numbers and direct messaging remain locked.
- **Active Paid Member (Standard, Premium, Platinum)**: Full matching results, compatibility score breakdown, verified contact reveal (with credit deduction), express interest, and direct messaging.
- **Credit Deductions & Fraud Prevention**: Contact numbers are verified and revealed only through server-side authorization. First reveal consumes 1 credit and logs a `ContactView` record; subsequent views of the same profile do not re-charge credits.

### 5. Multi-Step Profile Wizard (7 Steps)
1. **Basic Information**: Full name, gender, date of birth, age, height, marital status, mother tongue.
2. **Religious & Astrological**: Religion, caste, subcaste, gothram, dosham, raasi, nakshatram.
3. **Education & Career**: Highest degree, college, occupation, company, annual income, work location.
4. **Family Background**: Father occupation, mother occupation, brothers, sisters, family type, family status, native location.
5. **Lifestyle**: Food habits (Vegetarian/Non-Veg), smoking, drinking, about myself.
6. **Partner Preferences**: Preferred age min/max, height, location, dietary habits.
7. **Photos & Verification**: Photo gallery, primary photo selector, and 1-click government ID verification request.

### 6. User Dashboard (`/dashboard`)
- Profile completion meter (progress bar + missing field alerts)
- Stat cards: Active plan, remaining contact views, remaining interest requests, profile views count
- Recommended compatible matches with dynamic match scoring (e.g. `88% Match`)
- Shortlisted profiles management
- Interests sent and received with Accept / Decline responses
- Unlocked contact history ledger
- Live in-app messaging interface
- Privacy controls (phone number visibility, photo privacy, profile hide toggle)

### 7. Administrative Console (`/admin`)
- Real-time MongoDB metrics: Total members, Brides count, Grooms count, Verified count, Active paid members, Free members, Total revenue
- Member directory: Search, filter, approve/revoke verification, suspend/reactivate account
- Payment transactions log with invoice tracking
- Contact inquiries manager

---

## 4. Test Accounts & Credentials

The database has been seeded with authentic Tamil Matrimony profiles and test credentials:

| Role | Email | Password | Assigned Plan | Status |
|---|---|---|---|---|
| **Super Admin** | `admin@srimatrimony.com` | `Admin@1234` | VIP Admin | Verified |
| **Bride (Demo)** | `priya@gmail.com` | `Priya@123` | Standard (Paid) | Verified |
| **Groom (Demo)**| `karthik@gmail.com`| `Karthik@123`| Premium (Paid) | Verified |
| **Other Profiles**| `deepa.k@gmail.com` ... | `Deepa@123` ... | Free / Std | Verified |

> **Tip**: The Login Modal and LoginPage include **1-Click Test Login Buttons** for Bride (Priya), Groom (Karthik), and Super Admin.

---

## 5. Starting the Application Locally

### Quick Start (Runs Both Backend & Frontend Simultaneously)
From the root workspace directory:
```bash
# 1. Ensure MongoDB service is running (in an Administrator command prompt or Services app)
net start MongoDB

# 2. Start both Backend & Frontend concurrently with one command
npm run dev
```

---

### Starting Manually in Separate Terminals

#### Terminal 1 — Start Backend Server
```bash
cd backend
node seed.js     # (Optional: seeds/resets sample members and plans)
npm run dev      # Starts REST API on http://127.0.0.1:5000
```

#### Terminal 2 — Start Frontend Server
```bash
cd frontend
npm run dev      # Starts Vite dev server on http://localhost:5173
```

- **Frontend Application URL**: `http://localhost:5173`
- **Backend API URL**: `http://127.0.0.1:5000/api`
- **Health Check**: `http://127.0.0.1:5000/api/health`
- **Application Bootstrap**: `http://127.0.0.1:5000/api/app/bootstrap`
