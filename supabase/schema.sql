-- ====================================================================
-- ExamSphere AI - Supabase Production Schema & Migrations
-- Target Database: https://idhesegfliqgzhntdijw.supabase.co
-- ====================================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. EXAMS TABLE
create table if not exists public.exams (
  id text primary key,
  name text not null,
  short_name text not null,
  alternative_names text[] default array[]::text[],
  country text not null,
  region_state text,
  education_level text not null,
  exam_type text not null,
  conducting_authority text not null,
  official_url text not null,
  registration_url text,
  result_url text,
  eligibility text,
  age_requirement text,
  subjects jsonb default '[]'::jsonb,
  syllabus jsonb default '[]'::jsonb,
  exam_pattern jsonb default '{}'::jsonb,
  languages text[] default array['English']::text[],
  application_fee text,
  attempts_allowed text,
  important_dates jsonb default '[]'::jsonb,
  participating_institutions_count int default 0,
  admission_process text,
  last_verified_at timestamptz default now(),
  source_urls jsonb default '[]'::jsonb,
  status text default 'Verified',
  popular_rank int default 99,
  logo_icon text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. COLLEGES TABLE
create table if not exists public.colleges (
  id text primary key,
  name text not null,
  country text not null,
  state_region text not null,
  city text not null,
  campus text,
  institution_type text not null,
  courses text[] default array[]::text[],
  branches text[] default array[]::text[],
  official_website text not null,
  admissions_website text not null,
  recognized_exam_routes text[] default array[]::text[],
  tuition_per_year text,
  scholarships_available boolean default true,
  accommodation_available boolean default true,
  accreditation text,
  placement_rate text,
  average_package text,
  source text,
  last_verified_date text,
  logo_icon text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. CUTOFFS TABLE
create table if not exists public.cutoffs (
  id text primary key,
  exam_id text not null references public.exams(id) on delete cascade,
  exam_name text not null,
  admission_year int not null,
  institution_id text not null references public.colleges(id) on delete cascade,
  institution_name text not null,
  campus text,
  course text not null,
  branch text not null,
  category text not null,
  quota text not null,
  domicile_rule text,
  counseling_round text not null,
  opening_rank int,
  closing_rank int not null,
  opening_score numeric,
  closing_score numeric,
  source text not null,
  official_url text not null,
  verification_date text,
  data_status text default 'Verified',
  created_at timestamptz default now()
);

-- 4. QUESTIONS TABLE
create table if not exists public.questions (
  id text primary key,
  exam_id text not null references public.exams(id) on delete cascade,
  exam_name text not null,
  year int,
  session text,
  paper_code text,
  subject text not null,
  topic text not null,
  difficulty text default 'Medium',
  question text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation text not null,
  source text not null,
  verified boolean default true,
  generated_by_ai boolean default false,
  license_usage_status text,
  created_at timestamptz default now()
);

-- 5. QUESTION PAPERS TABLE
create table if not exists public.question_papers (
  id text primary key,
  exam_id text not null references public.exams(id) on delete cascade,
  exam_name text not null,
  year int not null,
  session text not null,
  subject text not null,
  paper_set text not null,
  question_count int default 0,
  duration_mins int default 180,
  source text not null,
  license_status text default 'Public Domain Archive',
  solution_availability boolean default true,
  official_url text not null,
  document_url text,
  verification_status text default 'Verified',
  questions jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 6. REAL TIME UPDATES TABLE
create table if not exists public.real_time_updates (
  id text primary key,
  headline text not null,
  summary text not null,
  exam_or_institution text not null,
  category text not null,
  publication_date text,
  source text not null,
  source_type text default 'Official Authority',
  is_official boolean default true,
  retrieval_timestamp timestamptz default now(),
  link text not null,
  confidence text default 'High',
  has_conflicts boolean default false,
  created_at timestamptz default now()
);

-- 7. CLASSROOMS TABLE
create table if not exists public.classrooms (
  id text primary key,
  educator_id text not null,
  name text not null,
  subject_or_exam text not null,
  join_code text unique not null,
  students_count int default 0,
  created_at text not null,
  assignments jsonb default '[]'::jsonb
);

-- 8. QUIZ ATTEMPTS TABLE
create table if not exists public.quiz_attempts (
  id text primary key,
  user_id text,
  quiz_id text not null,
  quiz_title text not null,
  quiz_type text not null,
  exam_id text not null,
  exam_name text not null,
  started_at timestamptz not null,
  completed_at timestamptz default now(),
  duration_spent_seconds int default 0,
  total_questions int not null,
  answered_count int default 0,
  correct_count int default 0,
  incorrect_count int default 0,
  unanswered_count int default 0,
  total_marks_earned numeric default 0,
  max_possible_marks numeric default 0,
  accuracy_percentage numeric default 0,
  answers jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 9. USER PROFILES TABLE
create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  name text,
  role text default 'student',
  avatar text,
  target_exams text[] default array[]::text[],
  education_level text,
  country text default 'India',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.exams enable row level security;
alter table public.colleges enable row level security;
alter table public.cutoffs enable row level security;
alter table public.questions enable row level security;
alter table public.question_papers enable row level security;
alter table public.real_time_updates enable row level security;
alter table public.classrooms enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.user_profiles enable row level security;

-- Public read access for directory data
create policy "Allow public read access on exams" on public.exams for select using (true);
create policy "Allow public read access on colleges" on public.colleges for select using (true);
create policy "Allow public read access on cutoffs" on public.cutoffs for select using (true);
create policy "Allow public read access on questions" on public.questions for select using (true);
create policy "Allow public read access on question_papers" on public.question_papers for select using (true);
create policy "Allow public read access on real_time_updates" on public.real_time_updates for select using (true);

-- User-specific access for quiz attempts
create policy "Allow users to read their own quiz attempts" on public.quiz_attempts
  for select using (auth.uid()::text = user_id or user_id is null);

create policy "Allow insert on quiz attempts" on public.quiz_attempts
  for insert with check (true);

-- Classrooms policies
create policy "Allow public read on classrooms" on public.classrooms
  for select using (true);

create policy "Allow insert on classrooms" on public.classrooms
  for insert with check (true);

-- User profiles policies
create policy "Users can view their own profile" on public.user_profiles
  for select using (auth.uid() = user_id);

create policy "Users can update their own profile" on public.user_profiles
  for update using (auth.uid() = user_id);

create policy "Users can insert their own profile" on public.user_profiles
  for insert with check (auth.uid() = user_id or user_id is null);

-- ====================================================================
-- INDEXES FOR PERFORMANCE
-- ====================================================================
create index if not exists idx_exams_country on public.exams (country);
create index if not exists idx_exams_type on public.exams (exam_type);
create index if not exists idx_colleges_country on public.colleges (country);
create index if not exists idx_cutoffs_exam_id on public.cutoffs (exam_id);
create index if not exists idx_cutoffs_year on public.cutoffs (admission_year);
create index if not exists idx_questions_exam_id on public.questions (exam_id);
create index if not exists idx_quiz_attempts_user on public.quiz_attempts (user_id);
