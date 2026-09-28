# ExamSphere AI — Global Entrance Exam & Admission Predictor Platform

ExamSphere AI is an end-to-end platform for higher education discovery, entrance exam preparation, syllabus tracking, previous session question paper solving, cutoffs benchmarking, and AI-grounded admission guidance.

---

## 🌟 Core Architecture & Capabilities

1. **Global Entrance Exam Directory (16-Point Inspection)**:
   - Comprehensive multi-country database covering Engineering, Medical, Management, Law, and Sciences.
   - Live conducting body URLs, exam patterns, marking schemes, syllabus breakdown, application timelines, and eligibility criteria.

2. **Official Admission Predictor & Cutoff Engine**:
   - Institutional cutoff matching across counseling rounds, quota types (All India, Home State, Category), courses, and branches.
   - Percentile vs. rank analysis grounded in historical data.

3. **Interactive Multi-Mode Quiz Arena**:
   - Timed mock tests, topic drill practice, and official previous-year question sets.
   - Instant scoring, negative marking calculation, accuracy rates, and detailed answer explanations.

4. **ExamSphere AI Tutor**:
   - Powered by the Google Gemini API with search grounding for verified, real-time academic queries and syllabus assistance.

5. **Real-Time Entrance & Counseling Bulletin**:
   - Grounded updates, schedule announcements, and verification status tracking.

6. **Supabase Cloud Database & Authentication**:
   - PostgreSQL schema with 9 production tables, Row Level Security (RLS) policies, and performance indexes.
   - Dual-mode authentication: live Supabase Auth with seamless fallback to resilient local session persistence.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS |
| **Icons & Motion** | Lucide React, Motion |
| **Backend & API** | Node.js, Express, Vercel Serverless Functions |
| **Database** | PostgreSQL on Supabase (`Public` schema with RLS) |
| **AI Engine** | Google Gemini API (`@google/genai`) |
| **Hosting & CI/CD**| Vercel & GitHub |

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- npm or bun

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your keys:
```env
GEMINI_API_KEY="your-gemini-api-key"
VITE_SUPABASE_URL="https://idhesegfliqgzhntdijw.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Database Setup

1. Open your Supabase Project dashboard at `https://idhesegfliqgzhntdijw.supabase.co`.
2. Navigate to the **SQL Editor** tab.
3. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql).
4. Click **Run** to provision all 9 tables, indexes, and Row Level Security policies.
5. In **Project Settings** > **API**, copy your `anon` `public` key and configure it in `.env.local` or Vercel.

---

## 📦 Vercel Deployment Workflow

1. Push your changes to the `main` branch on GitHub:
   ```bash
   git add .
   git commit -m "feat: updates"
   git push origin main
   ```
2. Vercel automatically detects the push and deploys the production build.
3. Configure environment variables in Vercel under **Project Settings** > **Environment Variables**:
   - `GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
