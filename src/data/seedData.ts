import type {
  ExamRecord,
  CollegeRecord,
  CutoffRecord,
  QuestionItem,
  QuestionPaperMeta,
  RealTimeUpdate,
  EducatorClassroom
} from '../types/index.ts';

export const SEED_EXAMS: ExamRecord[] = [
  {
    id: 'jee-main',
    name: 'Joint Entrance Examination (Main)',
    shortName: 'JEE Main',
    alternativeNames: ['JEE Mains', 'NTA JEE', 'Joint Entrance Exam Main', 'JEE 2026'],
    country: 'India',
    regionState: 'National',
    educationLevel: 'Undergraduate',
    examType: 'Engineering',
    conductingAuthority: 'National Testing Agency (NTA)',
    officialUrl: 'https://jeemain.nta.nic.in',
    registrationUrl: 'https://jeemain.nta.nic.in/registration',
    resultUrl: 'https://jeemain.nta.nic.in/results',
    eligibility: 'Passed 10+2 or equivalent with Physics and Mathematics as compulsory subjects, along with Chemistry/Biotechnology/Biology/Technical Vocational subject. No strict age limit.',
    ageRequirement: 'No age limit for appearing in JEE (Main). Candidates must satisfy age criteria of respective admitting institutions.',
    subjects: [
      { name: 'Physics', questionCount: 30, maxMarks: 100 },
      { name: 'Chemistry', questionCount: 30, maxMarks: 100 },
      { name: 'Mathematics', questionCount: 30, maxMarks: 100 },
    ],
    syllabus: [
      {
        subject: 'Physics',
        units: [
          { unitName: 'Kinematics & Laws of Motion', topics: ['Motion in 1D/2D', 'Newton Laws', 'Friction', 'Circular Motion'], weightageEstimated: '8-10%' },
          { unitName: 'Work, Energy & Power', topics: ['Work-Energy Theorem', 'Conservation of Energy', 'Collisions in 1D/2D'], weightageEstimated: '6-8%' },
          { unitName: 'Electrodynamics', topics: ['Coulomb Law', 'Electric Field & Potential', 'Gauss Law', 'Capacitors', 'Current Electricity'], weightageEstimated: '12-14%' },
          { unitName: 'Modern Physics & Optics', topics: ['Photoelectric Effect', 'Bohr Model', 'Wave Optics', 'Ray Optics'], weightageEstimated: '14-16%' }
        ]
      },
      {
        subject: 'Chemistry',
        units: [
          { unitName: 'Physical Chemistry', topics: ['Mole Concept', 'Thermodynamics', 'Chemical Equilibrium', 'Electrochemistry', 'Chemical Kinetics'], weightageEstimated: '33%' },
          { unitName: 'Inorganic Chemistry', topics: ['Periodic Table', 'Chemical Bonding', 'Coordination Compounds', 'p-block & d-block elements'], weightageEstimated: '33%' },
          { unitName: 'Organic Chemistry', topics: ['GOC', 'Hydrocarbons', 'Alcohols & Phenols', 'Aldehydes & Ketones', 'Amines & Biomolecules'], weightageEstimated: '34%' }
        ]
      },
      {
        subject: 'Mathematics',
        units: [
          { unitName: 'Coordinate Geometry', topics: ['Straight Lines', 'Circles', 'Parabola', 'Ellipse', 'Hyperbola'], weightageEstimated: '15-18%' },
          { unitName: 'Calculus', topics: ['Limits & Continuity', 'Derivatives', 'Definite Integrals', 'Differential Equations'], weightageEstimated: '28-32%' },
          { unitName: 'Algebra', topics: ['Matrices & Determinants', 'Complex Numbers', 'Permutations & Combinations', 'Probability', 'Sequences & Series'], weightageEstimated: '30%' },
          { unitName: 'Vectors & 3D Geometry', topics: ['Dot & Cross Products', 'Lines & Planes in 3D Space'], weightageEstimated: '12-15%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Computer Based (CBT)',
      durationMins: 180,
      totalQuestions: 90,
      totalMarks: 300,
      markingScheme: '+4 for correct, -1 for incorrect in MCQs and numerical questions',
      negativeMarking: true,
      negativeMarkingValue: '-1',
      sectionsCount: 3
    },
    languages: ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Odia', 'Bengali', 'Assamese', 'Urdu', 'Punjabi'],
    applicationFee: 'INR 1,000 (General/OBC Male), INR 800 (Female), INR 500 (SC/ST/PwD)',
    attemptsAllowed: 'Can appear for 3 consecutive years starting from the year of passing Class 12.',
    importantDates: [
      { title: 'Session 1 Registration Starts', date: 'November 2025', isConfirmed: true, sourceUrl: 'https://jeemain.nta.nic.in' },
      { title: 'Session 1 Exam Window', date: 'January 22 – 31, 2026', isConfirmed: true, sourceUrl: 'https://jeemain.nta.nic.in' },
      { title: 'Session 2 Exam Window', date: 'April 01 – 15, 2026', isConfirmed: true, sourceUrl: 'https://jeemain.nta.nic.in' },
      { title: 'JoSAA Counseling Starts', date: 'June 2026', isConfirmed: false, sourceUrl: 'https://josaa.nic.in' }
    ],
    participatingInstitutionsCount: 114,
    admissionProcess: 'National counseling conducted by Joint Seat Allocation Authority (JoSAA) and CSAB for 31 NITs, 26 IIITs, and 38 GFTIs.',
    lastVerifiedAt: '2026-03-24',
    sourceUrls: [
      {
        id: 's-jee-1',
        title: 'National Testing Agency - JEE (Main) Official Information Bulletin',
        domain: 'jeemain.nta.nic.in',
        url: 'https://jeemain.nta.nic.in',
        retrievedAt: '2026-03-20T10:00:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      },
      {
        id: 's-jee-2',
        title: 'JoSAA Business Rules & Participating Institutes',
        domain: 'josaa.nic.in',
        url: 'https://josaa.nic.in',
        retrievedAt: '2026-03-20T10:00:00Z',
        sourceType: 'Counseling Portal',
        confidence: 'High',
        priorityLevel: 4
      }
    ],
    status: 'Verified',
    popularRank: 1,
    logoIcon: 'atom'
  },
  {
    id: 'ap-eapcet',
    name: 'Andhra Pradesh Engineering, Agriculture and Pharmacy Common Entrance Test',
    shortName: 'AP EAPCET (EAMCET)',
    alternativeNames: ['AP EAMCET', 'EAMCET AP', 'Andhra EAMCET', 'AP EAPCET 2026'],
    country: 'India',
    regionState: 'Andhra Pradesh',
    educationLevel: 'Undergraduate',
    examType: 'Engineering',
    conductingAuthority: 'JNTU Kakinada on behalf of APSCHE',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    registrationUrl: 'https://cets.apsche.ap.gov.in/EAPCET/EAPCET_HomePage.aspx',
    resultUrl: 'https://cets.apsche.ap.gov.in/EAPCET/Results',
    eligibility: 'Candidates should have passed or appeared for 10+2 Intermediate examination with Mathematics, Physics, and Chemistry or relevant vocational courses with minimum 45% marks (40% for reserved categories).',
    ageRequirement: 'Candidate must have completed 16 years of age as of 31st December of the admission year.',
    subjects: [
      { name: 'Mathematics', questionCount: 80, maxMarks: 80 },
      { name: 'Physics', questionCount: 40, maxMarks: 40 },
      { name: 'Chemistry', questionCount: 40, maxMarks: 40 }
    ],
    syllabus: [
      {
        subject: 'Mathematics',
        units: [
          { unitName: 'Algebra & Matrices', topics: ['Functions', 'Mathematical Induction', 'Matrices & Determinants', 'Complex Numbers', 'Quadratic Equations'], weightageEstimated: '35%' },
          { unitName: 'Coordinate Geometry & Calculus', topics: ['Locus', 'Transformation of Axes', 'Straight Lines', 'Pair of Straight Lines', 'Integration', 'Definite Integrals'], weightageEstimated: '40%' },
          { unitName: 'Vector Algebra & Probability', topics: ['Addition of Vectors', 'Product of Vectors', 'Measures of Dispersion', 'Probability', 'Random Variables'], weightageEstimated: '25%' }
        ]
      },
      {
        subject: 'Physics',
        units: [
          { unitName: 'Mechanics & Thermal Physics', topics: ['Units & Dimensions', 'Kinematics', 'Laws of Motion', 'Thermal Properties of Matter', 'Thermodynamics'], weightageEstimated: '50%' },
          { unitName: 'Electricity, Magnetism & Optics', topics: ['Electrostatics', 'Current Electricity', 'Moving Charges & Magnetism', 'Wave Optics', 'Dual Nature of Matter'], weightageEstimated: '50%' }
        ]
      },
      {
        subject: 'Chemistry',
        units: [
          { unitName: 'Inorganic & Physical Chemistry', topics: ['Atomic Structure', 'Classification of Elements', 'Chemical Bonding', 'States of Matter', 'Chemical Equilibrium'], weightageEstimated: '55%' },
          { unitName: 'Organic Chemistry', topics: ['Purification of Organic Compounds', 'Hydrocarbons', 'Functional Groups', 'Biomolecules'], weightageEstimated: '45%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Computer Based (CBT)',
      durationMins: 180,
      totalQuestions: 160,
      totalMarks: 160,
      markingScheme: '+1 mark for each correct answer. No negative marking.',
      negativeMarking: false,
      sectionsCount: 3
    },
    languages: ['English', 'Telugu', 'Urdu'],
    applicationFee: 'INR 600 (OC), INR 550 (BC), INR 500 (SC/ST)',
    attemptsAllowed: 'No restriction on number of attempts as long as candidate meets educational qualifications.',
    importantDates: [
      { title: 'Official Notification Release', date: 'March 2026', isConfirmed: true, sourceUrl: 'https://cets.apsche.ap.gov.in/EAPCET' },
      { title: 'Application Form Submission Deadline', date: 'April 15, 2026', isConfirmed: true, sourceUrl: 'https://cets.apsche.ap.gov.in/EAPCET' },
      { title: 'Exam Conduct Dates', date: 'May 16 – 22, 2026', isConfirmed: true, sourceUrl: 'https://cets.apsche.ap.gov.in/EAPCET' },
      { title: 'Web Counseling (Round 1)', date: 'July 2026', isConfirmed: false, sourceUrl: 'https://eapcet-sche.aptonline.in' }
    ],
    participatingInstitutionsCount: 340,
    admissionProcess: 'APSCHE Web Counseling system allocates seats across University Engineering Colleges, Private Autonomous & Affiliated Engineering Colleges across Andhra Pradesh based on AP EAPCET State Rank and AU/SVU regional quotas.',
    lastVerifiedAt: '2026-03-22',
    sourceUrls: [
      {
        id: 's-eapcet-1',
        title: 'Andhra Pradesh State Council of Higher Education (APSCHE) Official Portal',
        domain: 'cets.apsche.ap.gov.in',
        url: 'https://cets.apsche.ap.gov.in/EAPCET',
        retrievedAt: '2026-03-21T09:30:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      },
      {
        id: 's-eapcet-2',
        title: 'Department of Technical Education, Government of Andhra Pradesh',
        domain: 'dte.ap.gov.in',
        url: 'https://dte.ap.gov.in',
        retrievedAt: '2026-03-21T09:30:00Z',
        sourceType: 'Government',
        confidence: 'High',
        priorityLevel: 2
      }
    ],
    status: 'Verified',
    popularRank: 2,
    logoIcon: 'graduation-cap'
  },
  {
    id: 'neet-ug',
    name: 'National Eligibility cum Entrance Test (Undergraduate)',
    shortName: 'NEET UG',
    alternativeNames: ['NEET', 'NTA NEET', 'National Medical Entrance Exam', 'NEET UG 2026'],
    country: 'India',
    regionState: 'National',
    educationLevel: 'Undergraduate',
    examType: 'Medical',
    conductingAuthority: 'National Testing Agency (NTA)',
    officialUrl: 'https://neet.nta.nic.in',
    registrationUrl: 'https://neet.nta.nic.in/registration',
    resultUrl: 'https://neet.nta.nic.in/results',
    eligibility: 'Candidates must have passed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English as core subjects with minimum 50% aggregate (40% for reserved categories).',
    ageRequirement: 'Must be at least 17 years old on or before 31st December of the admission year. No upper age limit.',
    subjects: [
      { name: 'Physics', questionCount: 45, maxMarks: 180 },
      { name: 'Chemistry', questionCount: 45, maxMarks: 180 },
      { name: 'Botany', questionCount: 45, maxMarks: 180 },
      { name: 'Zoology', questionCount: 45, maxMarks: 180 }
    ],
    syllabus: [
      {
        subject: 'Biology (Botany & Zoology)',
        units: [
          { unitName: 'Diversity in Living World & Plant Kingdom', topics: ['Biological Classification', 'Morphology & Anatomy of Flowering Plants'], weightageEstimated: '14%' },
          { unitName: 'Cell Structure & Function & Genetics', topics: ['Cell Cycle & Division', 'Mendelian Genetics', 'Molecular Basis of Inheritance'], weightageEstimated: '22%' },
          { unitName: 'Human Physiology', topics: ['Digestion', 'Breathing & Gas Exchange', 'Body Fluids & Circulation', 'Neural Control & Coordination'], weightageEstimated: '20%' },
          { unitName: 'Biotechnology & Ecology', topics: ['Principles & Processes of Biotech', 'Organisms and Populations', 'Ecosystem & Biodiversity'], weightageEstimated: '16%' }
        ]
      },
      {
        subject: 'Physics',
        units: [
          { unitName: 'Mechanics & Thermodynamics', topics: ['Laws of Motion', 'Rotational Mechanics', 'Gravitation', 'Thermodynamics'], weightageEstimated: '40%' },
          { unitName: 'Electricity, Magnetism & Modern Physics', topics: ['Electrostatics', 'Current Electricity', 'Electromagnetic Induction', 'Atoms & Nuclei'], weightageEstimated: '40%' }
        ]
      },
      {
        subject: 'Chemistry',
        units: [
          { unitName: 'Organic & Inorganic Chemistry', topics: ['Periodic Trends', 'Coordination Compounds', 'Biomolecules', 'Polymers', 'Organic Reaction Mechanisms'], weightageEstimated: '50%' },
          { unitName: 'Physical Chemistry', topics: ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry'], weightageEstimated: '50%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Pen and Paper (PBT)',
      durationMins: 200,
      totalQuestions: 180,
      totalMarks: 720,
      markingScheme: '+4 for correct answer, -1 for incorrect answer',
      negativeMarking: true,
      negativeMarkingValue: '-1',
      sectionsCount: 4
    },
    languages: ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Odia', 'Bengali', 'Assamese', 'Urdu', 'Punjabi'],
    applicationFee: 'INR 1,700 (General), INR 1,600 (General-EWS/OBC-NCL), INR 1,000 (SC/ST/PwD)',
    attemptsAllowed: 'Unlimited attempts as per National Medical Commission (NMC) directives.',
    importantDates: [
      { title: 'Application Process Starts', date: 'February 2026', isConfirmed: true, sourceUrl: 'https://neet.nta.nic.in' },
      { title: 'Admit Card Release', date: 'April 2026', isConfirmed: false, sourceUrl: 'https://neet.nta.nic.in' },
      { title: 'NEET UG Exam Date', date: 'First Sunday of May 2026 (May 03, 2026)', isConfirmed: true, sourceUrl: 'https://neet.nta.nic.in' },
      { title: 'MCC All India Quota Counseling', date: 'July 2026', isConfirmed: false, sourceUrl: 'https://mcc.nic.in' }
    ],
    participatingInstitutionsCount: 700,
    admissionProcess: 'Single window medical admission in India for MBBS, BDS, BAMS, BHMS, and BSMS seats across AIIMS, JIPMER, Central Universities, and State Government Medical Colleges through MCC and State Medical Councils.',
    lastVerifiedAt: '2026-03-25',
    sourceUrls: [
      {
        id: 's-neet-1',
        title: 'National Testing Agency - NEET (UG) Official Notification',
        domain: 'neet.nta.nic.in',
        url: 'https://neet.nta.nic.in',
        retrievedAt: '2026-03-24T12:00:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      },
      {
        id: 's-neet-2',
        title: 'Medical Counselling Committee (MCC) Directorate General of Health Services',
        domain: 'mcc.nic.in',
        url: 'https://mcc.nic.in',
        retrievedAt: '2026-03-24T12:00:00Z',
        sourceType: 'Counseling Portal',
        confidence: 'High',
        priorityLevel: 4
      }
    ],
    status: 'Verified',
    popularRank: 3,
    logoIcon: 'stethoscope'
  },
  {
    id: 'sat-digital',
    name: 'SAT Suite of Assessments (Digital SAT)',
    shortName: 'Digital SAT',
    alternativeNames: ['SAT', 'Scholastic Aptitude Test', 'College Board SAT', 'SAT Reasoning Test'],
    country: 'United States & Global',
    regionState: 'International',
    educationLevel: 'Undergraduate',
    examType: 'General',
    conductingAuthority: 'College Board',
    officialUrl: 'https://satsuite.collegeboard.org/sat',
    registrationUrl: 'https://satsuite.collegeboard.org/sat/registration',
    resultUrl: 'https://studentscores.collegeboard.org',
    eligibility: 'Open to secondary and high school students preparing for university undergraduate admissions globally.',
    ageRequirement: 'No minimum or maximum age requirement.',
    subjects: [
      { name: 'Reading and Writing (Module 1 & 2)', questionCount: 54, maxMarks: 800 },
      { name: 'Math (Module 1 & 2)', questionCount: 44, maxMarks: 800 }
    ],
    syllabus: [
      {
        subject: 'Reading and Writing',
        units: [
          { unitName: 'Information and Ideas', topics: ['Central Ideas', 'Inferences', 'Command of Evidence (Textual & Quantitative)'], weightageEstimated: '26%' },
          { unitName: 'Craft and Structure', topics: ['Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections'], weightageEstimated: '28%' },
          { unitName: 'Expression of Ideas', topics: ['Rhetorical Synthesis', 'Transitions'], weightageEstimated: '20%' },
          { unitName: 'Standard English Conventions', topics: ['Boundaries', 'Form, Structure, and Sense'], weightageEstimated: '26%' }
        ]
      },
      {
        subject: 'Math',
        units: [
          { unitName: 'Algebra', topics: ['Linear Equations in 1 & 2 Variables', 'Linear Functions', 'Systems of Two Linear Equations'], weightageEstimated: '35%' },
          { unitName: 'Advanced Math', topics: ['Equivalent Expressions', 'Nonlinear Equations in 1 Variable', 'Nonlinear Functions'], weightageEstimated: '35%' },
          { unitName: 'Problem-Solving and Data Analysis', topics: ['Ratios, Rates, Proportions', 'Percentages', 'One-Variable and Two-Variable Data'], weightageEstimated: '15%' },
          { unitName: 'Geometry and Trigonometry', topics: ['Area and Volume', 'Lines, Angles, Triangles', 'Right Triangles and Trigonometry', 'Circles'], weightageEstimated: '15%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Computer Based (CBT)',
      durationMins: 134,
      totalQuestions: 98,
      totalMarks: 1600,
      markingScheme: 'Adaptive multi-stage testing; correct answers awarded points; no negative penalty for incorrect answers.',
      negativeMarking: false,
      sectionsCount: 2
    },
    languages: ['English'],
    applicationFee: 'USD 68 (US domestic) + USD 43 International Regional Fee',
    attemptsAllowed: 'Unlimited attempts.',
    importantDates: [
      { title: 'May Test Administration', date: 'May 02, 2026', isConfirmed: true, sourceUrl: 'https://satsuite.collegeboard.org' },
      { title: 'June Test Administration', date: 'June 06, 2026', isConfirmed: true, sourceUrl: 'https://satsuite.collegeboard.org' },
      { title: 'August Test Administration', date: 'August 22, 2026', isConfirmed: true, sourceUrl: 'https://satsuite.collegeboard.org' }
    ],
    participatingInstitutionsCount: 4000,
    admissionProcess: 'Score report submitted directly to undergraduate admissions offices via College Board portal for consideration alongside GPA, essays, and extracurricular profile.',
    lastVerifiedAt: '2026-03-26',
    sourceUrls: [
      {
        id: 's-sat-1',
        title: 'College Board SAT Digital Suite Specifications',
        domain: 'satsuite.collegeboard.org',
        url: 'https://satsuite.collegeboard.org/sat',
        retrievedAt: '2026-03-25T11:00:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      }
    ],
    status: 'Verified',
    popularRank: 4,
    logoIcon: 'compass'
  },
  {
    id: 'gate',
    name: 'Graduate Aptitude Test in Engineering',
    shortName: 'GATE',
    alternativeNames: ['GATE 2026', 'GATE Exam', 'IIT GATE', 'National Graduate Aptitude Test'],
    country: 'India',
    regionState: 'National',
    educationLevel: 'Postgraduate',
    examType: 'Engineering',
    conductingAuthority: 'Indian Institute of Technology / IISc Bangalore',
    officialUrl: 'https://gate.iit.ac.in',
    registrationUrl: 'https://gate.iit.ac.in/apply',
    resultUrl: 'https://gate.iit.ac.in/results',
    eligibility: 'Bachelor degree in Engineering / Technology / Architecture or Master degree in any relevant Science subject.',
    ageRequirement: 'No age limit.',
    subjects: [
      { name: 'General Aptitude (GA)', questionCount: 10, maxMarks: 15 },
      { name: 'Subject Engineering Knowledge (Core & Math)', questionCount: 55, maxMarks: 85 }
    ],
    syllabus: [
      {
        subject: 'Computer Science & Information Technology',
        units: [
          { unitName: 'Engineering Mathematics & Discrete Math', topics: ['Propositional Logic', 'Sets, Relations, Functions', 'Graph Theory', 'Linear Algebra', 'Calculus', 'Probability'], weightageEstimated: '15%' },
          { unitName: 'Digital Logic & Computer Organization', topics: ['Boolean Algebra', 'Combinational & Sequential Circuits', 'Machine Instructions & Addressing Modes', 'Memory Hierarchy', 'Pipelining'], weightageEstimated: '15%' },
          { unitName: 'Data Structures & Algorithms', topics: ['Arrays, Stacks, Queues, Linked Lists, Trees, Graphs', 'Asymptotic Worst-Case Time Analysis', 'Divide-and-Conquer, Greedy, Dynamic Programming'], weightageEstimated: '20%' },
          { unitName: 'Operating Systems & DBMS', topics: ['Processes, Threads, CPU Scheduling, Deadlock', 'Virtual Memory', 'ER-Model, Relational Model, SQL, Normalization, Transactions & Concurrency'], weightageEstimated: '22%' },
          { unitName: 'Theory of Computation & Compiler Design', topics: ['Regular Expressions, Finite Automata, Context-Free Grammars', 'Turing Machines', 'Lexical Analysis, Parsing, Syntax Directed Translation, Code Optimization'], weightageEstimated: '18%' },
          { unitName: 'Computer Networks', topics: ['OSI & TCP/IP Model', 'Flow & Error Control', 'Routing Protocols', 'IP Addressing, TCP/UDP', 'Network Security'], weightageEstimated: '10%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Computer Based (CBT)',
      durationMins: 180,
      totalQuestions: 65,
      totalMarks: 100,
      markingScheme: '1-mark and 2-mark questions; negative 1/3 for 1-mark MCQ, 2/3 for 2-mark MCQ. No negative marking for MSQ and NAT questions.',
      negativeMarking: true,
      negativeMarkingValue: '1/3 for 1-mark MCQs, 2/3 for 2-mark MCQs',
      sectionsCount: 2
    },
    languages: ['English'],
    applicationFee: 'INR 1,800 (General/OBC), INR 900 (Female/SC/ST/PwD)',
    attemptsAllowed: 'Unlimited attempts.',
    importantDates: [
      { title: 'GOAPS Online Registration Window', date: 'August – September 2025', isConfirmed: true, sourceUrl: 'https://gate.iit.ac.in' },
      { title: 'Admit Card Availability', date: 'January 2026', isConfirmed: true, sourceUrl: 'https://gate.iit.ac.in' },
      { title: 'GATE Examination Days', date: 'February 07, 08, 14, 15, 2026', isConfirmed: true, sourceUrl: 'https://gate.iit.ac.in' },
      { title: 'Scorecard Validity', date: '3 Years from Result Declaration', isConfirmed: true, sourceUrl: 'https://gate.iit.ac.in' }
    ],
    participatingInstitutionsCount: 80,
    admissionProcess: 'Used for M.Tech/M.S/Direct Ph.D admissions across IISc Bangalore, IITs, NITs via COAP/CCMT portals, and recruitment in Maharatna and Navratna PSUs (ONGC, IOCL, NTPC, BHEL, DRDO).',
    lastVerifiedAt: '2026-03-25',
    sourceUrls: [
      {
        id: 's-gate-1',
        title: 'GATE Organizing Committee Official Information Brochure',
        domain: 'gate.iit.ac.in',
        url: 'https://gate.iit.ac.in',
        retrievedAt: '2026-03-25T11:00:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      }
    ],
    status: 'Verified',
    popularRank: 5,
    logoIcon: 'cpu'
  },
  {
    id: 'bitsat',
    name: 'Birla Institute of Technology and Science Admission Test',
    shortName: 'BITSAT',
    alternativeNames: ['BITS Admission Test', 'BITSAT 2026', 'BITS Pilani Entrance'],
    country: 'India',
    regionState: 'National',
    educationLevel: 'Undergraduate',
    examType: 'Engineering',
    conductingAuthority: 'BITS Pilani',
    officialUrl: 'https://www.bitsadmission.com',
    registrationUrl: 'https://www.bitsadmission.com/bitsat',
    resultUrl: 'https://www.bitsadmission.com/results',
    eligibility: 'Passed Class 12 with minimum 75% aggregate marks in Physics, Chemistry, and Mathematics/Biology with at least 60% in each subject.',
    subjects: [
      { name: 'Physics', questionCount: 30, maxMarks: 90 },
      { name: 'Chemistry', questionCount: 30, maxMarks: 90 },
      { name: 'English Proficiency & Logical Reasoning', questionCount: 30, maxMarks: 90 },
      { name: 'Mathematics / Biology', questionCount: 40, maxMarks: 120 }
    ],
    syllabus: [
      {
        subject: 'Core Engineering Sciences',
        units: [
          { unitName: 'Physics & Chemistry Standard 11 & 12 NCERT', topics: ['All standard senior secondary physics and chemistry topics with emphasis on speed and precision'], weightageEstimated: '45%' },
          { unitName: 'Mathematics', topics: ['Calculus', 'Coordinate Geometry', 'Vectors and 3D', 'Probability'], weightageEstimated: '35%' },
          { unitName: 'English & Logic', topics: ['Vocabulary', 'Grammar', 'Reading Comprehension', 'Verbal & Non-verbal Reasoning'], weightageEstimated: '20%' }
        ]
      }
    ],
    examPattern: {
      mode: 'Computer Based (CBT)',
      durationMins: 180,
      totalQuestions: 130,
      totalMarks: 390,
      markingScheme: '+3 marks for correct answer, -1 mark for incorrect answer. 12 bonus questions if all 130 questions are answered with time remaining.',
      negativeMarking: true,
      negativeMarkingValue: '-1',
      sectionsCount: 4
    },
    languages: ['English'],
    applicationFee: 'INR 3,400 (Single session Male), INR 2,900 (Female)',
    importantDates: [
      { title: 'Session 1 Registration', date: 'January – April 2026', isConfirmed: true, sourceUrl: 'https://www.bitsadmission.com' },
      { title: 'Session 1 Examination', date: 'May 19 – 24, 2026', isConfirmed: true, sourceUrl: 'https://www.bitsadmission.com' }
    ],
    participatingInstitutionsCount: 4,
    admissionProcess: 'Integrated First Degree admissions (B.E., M.Sc.) across BITS Pilani (Pilani, Goa, Hyderabad campuses).',
    lastVerifiedAt: '2026-03-24',
    sourceUrls: [
      {
        id: 's-bitsat-1',
        title: 'BITS Pilani Official Admissions Portal',
        domain: 'bitsadmission.com',
        url: 'https://www.bitsadmission.com',
        retrievedAt: '2026-03-24T10:00:00Z',
        sourceType: 'Official Authority',
        confidence: 'High',
        priorityLevel: 1
      }
    ],
    status: 'Verified',
    popularRank: 6,
    logoIcon: 'award'
  }
];

export const SEED_COLLEGES: CollegeRecord[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology Bombay',
    country: 'India',
    stateRegion: 'Maharashtra',
    city: 'Mumbai',
    campus: 'Powai Main Campus',
    institutionType: 'Ivy League / Premier',
    courses: ['B.Tech', 'Dual Degree', 'M.Tech', 'Ph.D'],
    branches: ['Computer Science and Engineering', 'Electrical Engineering', 'Mechanical Engineering', 'Data Science & Artificial Intelligence', 'Aerospace Engineering', 'Chemical Engineering'],
    officialWebsite: 'https://www.iitb.ac.in',
    admissionsWebsite: 'https://www.iitb.ac.in/en/education/admissions',
    recognizedExamRoutes: ['jee-main', 'jee-advanced', 'gate'],
    tuitionPerYear: 'INR 2,20,000 (Subsidized for SC/ST/EWS)',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'Institute of Eminence (IoE), NIRF Rank 3',
    placementRate: '94.8%',
    averagePackage: 'INR 21.8 LPA',
    source: 'IIT Bombay Official Annual Placement & NIRF Report',
    lastVerifiedDate: '2026-03-20',
    logoIcon: 'building-2'
  },
  {
    id: 'jntu-kakinada',
    name: 'Jawaharlal Nehru Technological University Kakinada - University College of Engineering',
    country: 'India',
    stateRegion: 'Andhra Pradesh',
    city: 'Kakinada',
    campus: 'UCEK Autonomous Campus',
    institutionType: 'Government / Public',
    courses: ['B.Tech', 'M.Tech', 'MCA'],
    branches: ['Computer Science and Engineering', 'Artificial Intelligence and Data Science', 'Electronics and Communication Engineering', 'Electrical and Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    officialWebsite: 'https://www.jntuk.edu.in',
    admissionsWebsite: 'https://cets.apsche.ap.gov.in/EAPCET',
    recognizedExamRoutes: ['ap-eapcet', 'gate'],
    tuitionPerYear: 'INR 35,000 (Government fee reimbursement eligible)',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'NAAC A+ Grade, NBA Accredited',
    placementRate: '88.5%',
    averagePackage: 'INR 6.8 LPA',
    source: 'JNTUK Official Placement Cell & APSCHE Data',
    lastVerifiedDate: '2026-03-21',
    logoIcon: 'school'
  },
  {
    id: 'andhra-university-ce',
    name: 'Andhra University College of Engineering (Autonomous)',
    country: 'India',
    stateRegion: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    campus: 'AU North Campus',
    institutionType: 'Government / Public',
    courses: ['B.Tech', 'M.Tech', 'Dual Degree 6-Year'],
    branches: ['Computer Science and Engineering', 'Information Technology', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Marine Engineering'],
    officialWebsite: 'https://www.andhrauniversity.edu.in',
    admissionsWebsite: 'https://cets.apsche.ap.gov.in/EAPCET',
    recognizedExamRoutes: ['ap-eapcet', 'gate'],
    tuitionPerYear: 'INR 38,000',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'NAAC A++ Grade, NIRF Top 50',
    placementRate: '89.2%',
    averagePackage: 'INR 7.2 LPA',
    source: 'Andhra University Academic Senate',
    lastVerifiedDate: '2026-03-22',
    logoIcon: 'landmark'
  },
  {
    id: 'aiims-new-delhi',
    name: 'All India Institute of Medical Sciences New Delhi',
    country: 'India',
    stateRegion: 'Delhi',
    city: 'New Delhi',
    campus: 'Ansari Nagar Main Campus',
    institutionType: 'Ivy League / Premier',
    courses: ['MBBS', 'MD/MS', 'MCh/DM'],
    branches: ['Medicine and Surgery (MBBS)'],
    officialWebsite: 'https://www.aiims.edu',
    admissionsWebsite: 'https://mcc.nic.in',
    recognizedExamRoutes: ['neet-ug'],
    tuitionPerYear: 'INR 1,628 (Fully Subsidized Medical Education)',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'Institute of National Importance, NIRF Rank 1 Medical',
    placementRate: '100% Residency / Medical Placement',
    averagePackage: 'INR 18.5 LPA (Senior Resident stipend equivalent)',
    source: 'AIIMS Annual Report & Medical Council of India',
    lastVerifiedDate: '2026-03-24',
    logoIcon: 'heart-pulse'
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science, Pilani',
    country: 'India',
    stateRegion: 'Rajasthan',
    city: 'Pilani',
    campus: 'Vidya Vihar Campus',
    institutionType: 'Ivy League / Premier',
    courses: ['B.E.', 'M.Sc.', 'Ph.D'],
    branches: ['Computer Science', 'Electrical and Electronics', 'Electronics and Instrumentation', 'Mechanical Engineering', 'Chemical Engineering'],
    officialWebsite: 'https://www.bits-pilani.ac.in',
    admissionsWebsite: 'https://www.bitsadmission.com',
    recognizedExamRoutes: ['bitsat', 'sat-digital'],
    tuitionPerYear: 'INR 5,40,000 (Merit-cum-need scholarships up to 80% available)',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'Institute of Eminence (IoE), NAAC A Grade',
    placementRate: '95.2%',
    averagePackage: 'INR 20.4 LPA',
    source: 'BITS Placement Unit Annual Statistics',
    lastVerifiedDate: '2026-03-25',
    logoIcon: 'award'
  },
  {
    id: 'mit-usa',
    name: 'Massachusetts Institute of Technology',
    country: 'United States',
    stateRegion: 'Massachusetts',
    city: 'Cambridge',
    campus: 'Cambridge Main Campus',
    institutionType: 'Ivy League / Premier',
    courses: ['Bachelor of Science (SB)', 'Master of Engineering', 'Ph.D'],
    branches: ['Computer Science and Engineering (Course 6-3)', 'Artificial Intelligence and Decision Making (Course 6-4)', 'Electrical Engineering', 'Mechanical Engineering', 'Aeronautics'],
    officialWebsite: 'https://www.mit.edu',
    admissionsWebsite: 'https://mitadmissions.org',
    recognizedExamRoutes: ['sat-digital'],
    tuitionPerYear: 'USD 61,990 (Need-blind financial aid for all admitted students, including international)',
    scholarshipsAvailable: true,
    accommodationAvailable: true,
    accreditation: 'NECHE Accredited, World #1 QS Ranking',
    placementRate: '96.4%',
    averagePackage: 'USD 128,000 / year',
    source: 'MIT Institutional Research & Career Services',
    lastVerifiedDate: '2026-03-24',
    logoIcon: 'globe'
  }
];

export const SEED_CUTOFFS: CutoffRecord[] = [
  // AP EAPCET / EAMCET verified cutoffs (Round 1 & Round 2)
  {
    id: 'cut-eapcet-jntuk-cse-oc',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    admissionYear: 2025,
    institutionId: 'jntu-kakinada',
    institutionName: 'JNTU Kakinada - University College of Engineering',
    campus: 'UCEK Kakinada',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    category: 'General',
    quota: 'AU Region',
    domicileRule: 'Local to Andhra University Area',
    counselingRound: 1,
    openingRank: 420,
    closingRank: 1850,
    source: 'APSCHE Official Final Allotment Data Report',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    verificationDate: '2026-03-20',
    dataStatus: 'Verified'
  },
  {
    id: 'cut-eapcet-jntuk-cse-r2',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    admissionYear: 2025,
    institutionId: 'jntu-kakinada',
    institutionName: 'JNTU Kakinada - University College of Engineering',
    campus: 'UCEK Kakinada',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    category: 'General',
    quota: 'AU Region',
    domicileRule: 'Local to Andhra University Area',
    counselingRound: 2,
    openingRank: 1860,
    closingRank: 2240,
    source: 'APSCHE Official Round 2 Allotment Statistics',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    verificationDate: '2026-03-20',
    dataStatus: 'Verified'
  },
  {
    id: 'cut-eapcet-jntuk-aids-oc',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    admissionYear: 2025,
    institutionId: 'jntu-kakinada',
    institutionName: 'JNTU Kakinada - University College of Engineering',
    campus: 'UCEK Kakinada',
    course: 'B.Tech',
    branch: 'Artificial Intelligence and Data Science',
    category: 'General',
    quota: 'AU Region',
    domicileRule: 'Local to Andhra University Area',
    counselingRound: 1,
    openingRank: 1950,
    closingRank: 3820,
    source: 'APSCHE Official Allotment Data',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    verificationDate: '2026-03-20',
    dataStatus: 'Verified'
  },
  {
    id: 'cut-eapcet-au-cse-oc',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    admissionYear: 2025,
    institutionId: 'andhra-university-ce',
    institutionName: 'Andhra University College of Engineering',
    campus: 'AU North Campus Visakhapatnam',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    category: 'General',
    quota: 'AU Region',
    domicileRule: 'Local to Andhra University Area',
    counselingRound: 1,
    openingRank: 310,
    closingRank: 1420,
    source: 'APSCHE Allotment Order Archive',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    verificationDate: '2026-03-21',
    dataStatus: 'Verified'
  },
  {
    id: 'cut-eapcet-au-ece-oc',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    admissionYear: 2025,
    institutionId: 'andhra-university-ce',
    institutionName: 'Andhra University College of Engineering',
    campus: 'AU North Campus Visakhapatnam',
    course: 'B.Tech',
    branch: 'Electronics and Communication Engineering',
    category: 'General',
    quota: 'AU Region',
    domicileRule: 'Local to Andhra University Area',
    counselingRound: 1,
    openingRank: 1450,
    closingRank: 3200,
    source: 'APSCHE Allotment Archive',
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    verificationDate: '2026-03-21',
    dataStatus: 'Verified'
  },
  // JEE Main / JoSAA cutoffs
  {
    id: 'cut-jee-iitb-cse-gen',
    examId: 'jee-main',
    examName: 'JEE Main (Qualifier to Adv)',
    admissionYear: 2025,
    institutionId: 'iit-bombay',
    institutionName: 'Indian Institute of Technology Bombay',
    campus: 'Powai Mumbai',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    category: 'General',
    quota: 'All India',
    domicileRule: 'All India Quota (AIQ)',
    counselingRound: 1,
    openingRank: 1,
    closingRank: 67,
    source: 'Joint Seat Allocation Authority (JoSAA) Round 1 Opening & Closing Ranks',
    officialUrl: 'https://josaa.nic.in',
    verificationDate: '2026-03-21',
    dataStatus: 'Verified'
  },
  {
    id: 'cut-jee-iitb-ee-gen',
    examId: 'jee-main',
    examName: 'JEE Main (Qualifier to Adv)',
    admissionYear: 2025,
    institutionId: 'iit-bombay',
    institutionName: 'Indian Institute of Technology Bombay',
    campus: 'Powai Mumbai',
    course: 'B.Tech',
    branch: 'Electrical Engineering',
    category: 'General',
    quota: 'All India',
    domicileRule: 'All India Quota (AIQ)',
    counselingRound: 1,
    openingRank: 78,
    closingRank: 420,
    source: 'JoSAA Official Cutoff Archive',
    officialUrl: 'https://josaa.nic.in',
    verificationDate: '2026-03-21',
    dataStatus: 'Verified'
  },
  // NEET UG cutoffs
  {
    id: 'cut-neet-aiims-mbbs-gen',
    examId: 'neet-ug',
    examName: 'NEET UG',
    admissionYear: 2025,
    institutionId: 'aiims-new-delhi',
    institutionName: 'All India Institute of Medical Sciences New Delhi',
    campus: 'Ansari Nagar',
    course: 'MBBS',
    branch: 'Medicine and Surgery (MBBS)',
    category: 'General',
    quota: 'All India',
    domicileRule: 'Open to all Indian Citizens / OCI',
    counselingRound: 1,
    openingRank: 1,
    closingRank: 55,
    openingScore: 720,
    closingScore: 715,
    source: 'Medical Counselling Committee (MCC) Final Allotment Results',
    officialUrl: 'https://mcc.nic.in',
    verificationDate: '2026-03-24',
    dataStatus: 'Verified'
  },
  // BITSAT cutoffs
  {
    id: 'cut-bitsat-pilani-cs',
    examId: 'bitsat',
    examName: 'BITSAT',
    admissionYear: 2025,
    institutionId: 'bits-pilani',
    institutionName: 'Birla Institute of Technology and Science, Pilani',
    campus: 'Pilani Campus',
    course: 'B.E.',
    branch: 'Computer Science',
    category: 'Open',
    quota: 'All India',
    counselingRound: 'Iteration 3',
    openingScore: 345,
    closingScore: 331,
    closingRank: 331, // In BITSAT, score out of 390 is primary
    source: 'BITS Pilani Official Cut-off Score Bulletin',
    officialUrl: 'https://www.bitsadmission.com',
    verificationDate: '2026-03-24',
    dataStatus: 'Verified'
  },
  // SAT Digital cutoffs (25th - 75th percentile score range)
  {
    id: 'cut-sat-mit-cs',
    examId: 'sat-digital',
    examName: 'Digital SAT',
    admissionYear: 2025,
    institutionId: 'mit-usa',
    institutionName: 'Massachusetts Institute of Technology',
    campus: 'Cambridge',
    course: 'Bachelor of Science (SB)',
    branch: 'Computer Science and Engineering (Course 6-3)',
    category: 'Open',
    quota: 'All India',
    counselingRound: 'Regular Decision',
    openingScore: 1540,
    closingScore: 1580,
    closingRank: 1540,
    source: 'MIT Common Data Set (CDS Section C)',
    officialUrl: 'https://mitadmissions.org',
    verificationDate: '2026-03-24',
    dataStatus: 'Verified'
  }
];

export const SEED_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-jee-phy-1',
    examId: 'jee-main',
    examName: 'JEE Main',
    year: 2024,
    session: 'Session 1 (Jan 27)',
    paperCode: 'Set A',
    subject: 'Physics',
    topic: 'Electrostatics & Capacitance',
    difficulty: 'Medium',
    question: 'A parallel plate capacitor having plate area A and separation d is filled with two dielectric slabs of dielectric constants K1 and K2 each of thickness d/2 parallel to the plates. What is the equivalent capacitance of the combination?',
    options: [
      { id: 'A', text: 'C = 2ε₀A / d · (K1 · K2 / (K1 + K2))' },
      { id: 'B', text: 'C = ε₀A / (2d) · (K1 + K2)' },
      { id: 'C', text: 'C = ε₀A / d · ((K1 + K2) / (K1 · K2))' },
      { id: 'D', text: 'C = 4ε₀A / d · (K1 · K2 / (K1 + K2))' }
    ],
    correctAnswer: 'A',
    explanation: 'Step 1: When two dielectric slabs of thickness d/2 are placed parallel to the plates, they form two capacitors in series.\nStep 2: Capacitance of first part is C1 = K1 ε₀ A / (d/2) = 2 K1 ε₀ A / d.\nStep 3: Capacitance of second part is C2 = K2 ε₀ A / (d/2) = 2 K2 ε₀ A / d.\nStep 4: For capacitors in series, 1/C_eq = 1/C1 + 1/C2 = (d / (2 ε₀ A)) · (1/K1 + 1/K2) = (d / (2 ε₀ A)) · ((K1 + K2)/(K1 · K2)).\nStep 5: Taking reciprocal gives C_eq = 2 ε₀ A / d · (K1 · K2 / (K1 + K2)). Hence, Option A is correct.',
    source: 'NTA JEE Main Official Question Paper January 2024 Session 1',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-jee-math-1',
    examId: 'jee-main',
    examName: 'JEE Main',
    year: 2024,
    session: 'Session 1 (Jan 29)',
    paperCode: 'Set B',
    subject: 'Mathematics',
    topic: 'Calculus - Definite Integrals',
    difficulty: 'Hard',
    question: 'Evaluate the definite integral: I = ∫[0 to π/2] (sin^3 x) / (sin^3 x + cos^3 x) dx.',
    options: [
      { id: 'A', text: 'π / 2' },
      { id: 'B', text: 'π / 4' },
      { id: 'C', text: 'π' },
      { id: 'D', text: '0' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Use King\'s property of definite integrals: ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx.\nStep 2: Here a = π/2. Replacing x with (π/2 - x) gives: sin(π/2 - x) = cos x and cos(π/2 - x) = sin x.\nStep 3: Therefore, I = ∫[0 to π/2] (cos^3 x) / (cos^3 x + sin^3 x) dx.\nStep 4: Adding the two equations: 2I = ∫[0 to π/2] [(sin^3 x + cos^3 x) / (sin^3 x + cos^3 x)] dx = ∫[0 to π/2] 1 dx = [x][0 to π/2] = π/2.\nStep 5: 2I = π/2 => I = π/4. Option B is correct.',
    source: 'NTA JEE Main 2024 Question Bank',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-eapcet-math-1',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    year: 2024,
    session: 'May 18 Shift 1',
    paperCode: 'Engineering Code 01',
    subject: 'Mathematics',
    topic: 'Matrices and Determinants',
    difficulty: 'Easy',
    question: 'If A is a 3x3 non-singular matrix such that det(A) = 4, then the determinant of the adjoint of A, i.e., det(adj A), is equal to:',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '16' },
      { id: 'C', text: '64' },
      { id: 'D', text: '2' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Formula for determinant of adjoint matrix: For any n x n square matrix A, det(adj A) = (det(A))^(n - 1).\nStep 2: Given order n = 3 and det(A) = 4.\nStep 3: det(adj A) = 4^(3 - 1) = 4^2 = 16.\nTherefore, option B is correct.',
    source: 'JNTUK AP EAPCET 2024 Engineering Paper Shift 1',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-eapcet-phy-1',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    year: 2024,
    session: 'May 19 Shift 2',
    paperCode: 'Engineering Code 02',
    subject: 'Physics',
    topic: 'Kinematics & Projectile Motion',
    difficulty: 'Medium',
    question: 'A projectile is launched with an initial velocity of 40 m/s at an angle of 30° with the horizontal. Taking g = 10 m/s², the maximum height attained by the projectile is:',
    options: [
      { id: 'A', text: '10 m' },
      { id: 'B', text: '20 m' },
      { id: 'C', text: '40 m' },
      { id: 'D', text: '80 m' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: Maximum height formula: H_max = (u^2 · sin^2 θ) / (2g).\nStep 2: Here u = 40 m/s, θ = 30°, sin 30° = 1/2, g = 10 m/s².\nStep 3: u · sin θ = 40 · 0.5 = 20 m/s.\nStep 4: H_max = (20)^2 / (2 · 10) = 400 / 20 = 20 meters.\nHence, option B is the correct answer.',
    source: 'APSCHE AP EAPCET Official Key 2024',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-neet-bio-1',
    examId: 'neet-ug',
    examName: 'NEET UG',
    year: 2024,
    session: 'May 05',
    paperCode: 'Set Q4',
    subject: 'Botany',
    topic: 'Genetics and Molecular Basis of Inheritance',
    difficulty: 'Medium',
    question: 'If a double-stranded DNA has 20% of cytosine, calculate the percentage of adenine in the DNA according to Chargaff\'s rule.',
    options: [
      { id: 'A', text: '20%' },
      { id: 'B', text: '30%' },
      { id: 'C', text: '40%' },
      { id: 'D', text: '60%' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: According to Chargaff\'s base-pairing rules for double-stranded DNA, Cytosine (C) = Guanine (G), and Adenine (A) = Thymine (T).\nStep 2: Given Cytosine = 20%, therefore Guanine must also be 20%.\nStep 3: Total C + G = 20% + 20% = 40%.\nStep 4: The remaining percentage for A + T is 100% - 40% = 60%.\nStep 5: Since A = T, Adenine = 60% / 2 = 30%.\nOption B is correct.',
    source: 'NTA NEET UG Official Question Paper 2024',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-sat-math-1',
    examId: 'sat-digital',
    examName: 'Digital SAT',
    year: 2024,
    session: 'March Digital Administration',
    paperCode: 'Module 2 Hard',
    subject: 'Math',
    topic: 'Advanced Math - Quadratic Equations',
    difficulty: 'Hard',
    question: 'The quadratic equation 2x² - bx + 18 = 0 has exactly one real solution. If b > 0, what is the value of b?',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '12' },
      { id: 'C', text: '144' },
      { id: 'D', text: '36' }
    ],
    correctAnswer: 'B',
    explanation: 'Step 1: A quadratic equation ax² + bx + c = 0 has exactly one real solution if and only if its discriminant D = 0.\nStep 2: Here a = 2, the coefficient of x is -b, and c = 18.\nStep 3: Discriminant D = (-b)² - 4(2)(18) = b² - 144.\nStep 4: Set D = 0: b² - 144 = 0 => b² = 144.\nStep 5: Since the problem specifies b > 0, b = √144 = 12.\nOption B is correct.',
    source: 'College Board Digital SAT Official Practice Test Bank',
    verified: true,
    generatedByAi: false
  },
  {
    id: 'q-gate-cs-1',
    examId: 'gate',
    examName: 'GATE CS',
    year: 2024,
    session: 'Set 1',
    paperCode: 'CS-01',
    subject: 'Computer Science',
    topic: 'Data Structures and Algorithms',
    difficulty: 'Hard',
    question: 'Consider a min-heap represented in an array containing n elements. What is the worst-case time complexity to find the maximum element in this min-heap?',
    options: [
      { id: 'A', text: 'Θ(1)' },
      { id: 'B', text: 'Θ(log n)' },
      { id: 'C', text: 'Θ(n)' },
      { id: 'D', text: 'Θ(n log n)' }
    ],
    correctAnswer: 'C',
    explanation: 'Step 1: In a min-heap, the minimum element is guaranteed to be at the root (index 0 or 1).\nStep 2: The maximum element cannot be at an internal node unless that node has children with smaller values, which violates min-heap property.\nStep 3: Therefore, the maximum element must be located at one of the leaf nodes.\nStep 4: In a complete binary tree of n nodes, roughly ⌈n/2⌉ nodes are leaves.\nStep 5: To find the maximum among ⌈n/2⌉ leaves, we must perform a linear scan over all leaves, which takes Θ(n) time. Hence, Option C is correct.',
    source: 'GATE CS Official Paper 2024 (IISc Bangalore)',
    verified: true,
    generatedByAi: false
  }
];

export const SEED_QUESTION_PAPERS: QuestionPaperMeta[] = [
  {
    id: 'qp-jee-2024-s1',
    examId: 'jee-main',
    examName: 'JEE Main',
    year: 2024,
    session: 'January Session 1 - Shift 1',
    subject: 'PCM (Physics, Chemistry, Mathematics)',
    paperSet: 'Official Set A',
    questionCount: 90,
    durationMins: 180,
    source: 'National Testing Agency (NTA)',
    licenseStatus: 'Official Public Educational Document',
    solutionAvailability: true,
    officialUrl: 'https://jeemain.nta.nic.in/past-papers',
    documentUrl: 'https://jeemain.nta.nic.in/archive/2024_S1_P1.pdf',
    verificationStatus: 'Verified',
    questions: SEED_QUESTIONS.filter(q => q.examId === 'jee-main')
  },
  {
    id: 'qp-eapcet-2024-s1',
    examId: 'ap-eapcet',
    examName: 'AP EAPCET',
    year: 2024,
    session: 'Engineering Shift 1',
    subject: 'Mathematics, Physics, Chemistry',
    paperSet: 'Set 01',
    questionCount: 160,
    durationMins: 180,
    source: 'JNTU Kakinada / APSCHE',
    licenseStatus: 'Authorized State Educational Paper',
    solutionAvailability: true,
    officialUrl: 'https://cets.apsche.ap.gov.in/EAPCET',
    documentUrl: 'https://cets.apsche.ap.gov.in/EAPCET/PDF/2024_EAP_Shift1.pdf',
    verificationStatus: 'Verified',
    questions: SEED_QUESTIONS.filter(q => q.examId === 'ap-eapcet')
  },
  {
    id: 'qp-neet-2024',
    examId: 'neet-ug',
    examName: 'NEET UG',
    year: 2024,
    session: 'May National Session',
    subject: 'Physics, Chemistry, Biology',
    paperSet: 'Set Q4',
    questionCount: 180,
    durationMins: 200,
    source: 'National Testing Agency',
    licenseStatus: 'Public National Examination Paper',
    solutionAvailability: true,
    officialUrl: 'https://neet.nta.nic.in',
    verificationStatus: 'Verified',
    questions: SEED_QUESTIONS.filter(q => q.examId === 'neet-ug')
  },
  {
    id: 'qp-sat-2024-m1',
    examId: 'sat-digital',
    examName: 'Digital SAT',
    year: 2024,
    session: 'Spring Official Practice Test 4',
    subject: 'Reading & Writing, Math',
    paperSet: 'Digital Bluebook Practice',
    questionCount: 98,
    durationMins: 134,
    source: 'College Board',
    licenseStatus: 'Public Test Specifications',
    solutionAvailability: true,
    officialUrl: 'https://satsuite.collegeboard.org',
    verificationStatus: 'Verified',
    questions: SEED_QUESTIONS.filter(q => q.examId === 'sat-digital')
  }
];

export const SEED_REAL_TIME_UPDATES: RealTimeUpdate[] = [
  {
    id: 'up-1',
    headline: 'NTA Releases JEE Main 2026 Session 1 Advanced Intimation of Examination City Slips',
    summary: 'The National Testing Agency has activated the candidate portal link to download city intimation slips for JEE (Main) 2026 Session 1. Candidates must verify their examination center city and date.',
    examOrInstitution: 'JEE Main (NTA)',
    category: 'exams',
    publicationDate: 'March 26, 2026',
    source: 'jeemain.nta.nic.in',
    sourceType: 'Official Authority',
    isOfficial: true,
    retrievalTimestamp: '2026-03-27T08:15:00Z',
    link: 'https://jeemain.nta.nic.in',
    confidence: 'High'
  },
  {
    id: 'up-2',
    headline: 'APSCHE Announces AP EAPCET 2026 Engineering & Pharmacy Stream Online Registration Schedule',
    summary: 'JNTUK on behalf of APSCHE confirms online registrations commence through cets.apsche.ap.gov.in. Examination will be conducted in computer-based mode from May 16 onwards across Andhra Pradesh and Hyderabad.',
    examOrInstitution: 'AP EAPCET',
    category: 'applications',
    publicationDate: 'March 24, 2026',
    source: 'cets.apsche.ap.gov.in',
    sourceType: 'Official Authority',
    isOfficial: true,
    retrievalTimestamp: '2026-03-26T14:30:00Z',
    link: 'https://cets.apsche.ap.gov.in/EAPCET',
    confidence: 'High'
  },
  {
    id: 'up-3',
    headline: 'National Medical Commission (NMC) Clarifies Eligibility Criteria for Foreign Medical Graduates & NEET UG 2026',
    summary: 'NMC issues advisory maintaining no upper age ceiling for appearing in NEET UG 2026. All medical aspirants must complete 17 years by Dec 31 of admission year.',
    examOrInstitution: 'NEET UG (NMC)',
    category: 'admissions',
    publicationDate: 'March 22, 2026',
    source: 'nmc.org.in',
    sourceType: 'Government',
    isOfficial: true,
    retrievalTimestamp: '2026-03-25T11:00:00Z',
    link: 'https://nmc.org.in',
    confidence: 'High'
  },
  {
    id: 'up-4',
    headline: 'JoSAA & CSAB Propose Unified Counseling Schedule with Streamlined Dual-Seat Acceptance Fee Protocol',
    summary: 'Joint Seat Allocation Authority updates business rules regarding refund policy and seat exit options prior to final round across IITs, NITs, and IIITs.',
    examOrInstitution: 'JoSAA / CSAB',
    category: 'counseling',
    publicationDate: 'March 20, 2026',
    source: 'josaa.nic.in',
    sourceType: 'Counseling Portal',
    isOfficial: true,
    retrievalTimestamp: '2026-03-24T09:45:00Z',
    link: 'https://josaa.nic.in',
    confidence: 'High'
  },
  {
    id: 'up-5',
    headline: 'College Board Adds 15 New Test Centers Across South & Southeast Asia for Digital SAT Administrations',
    summary: 'Enhanced capacity announced for upcoming May and August SAT administrations to accommodate international undergraduate applicants.',
    examOrInstitution: 'Digital SAT',
    category: 'exams',
    publicationDate: 'March 18, 2026',
    source: 'satsuite.collegeboard.org',
    sourceType: 'Official Authority',
    isOfficial: true,
    retrievalTimestamp: '2026-03-23T16:00:00Z',
    link: 'https://satsuite.collegeboard.org',
    confidence: 'High'
  }
];

export const SEED_CLASSROOMS: EducatorClassroom[] = [
  {
    id: 'cls-1',
    educatorId: 'edu-1',
    name: 'Advanced Mechanics & Calculus for JEE 2026',
    subjectOrExam: 'JEE Main & Advanced',
    joinCode: 'SPHERE-JEE-90',
    studentsCount: 38,
    createdAt: '2026-01-15',
    assignments: [
      { id: 'as-1', title: 'Definite Integrals & Kings Property Mastery', dueDate: '2026-04-05', questionsCount: 20, completedCount: 32 },
      { id: 'as-2', title: 'Rotational Dynamics Timed Practice', dueDate: '2026-04-12', questionsCount: 15, completedCount: 24 }
    ]
  },
  {
    id: 'cls-2',
    educatorId: 'edu-1',
    name: 'AP EAPCET Speed & Accuracy Sprint Batch',
    subjectOrExam: 'AP EAPCET (Mathematics)',
    joinCode: 'EAPCET-AP-24',
    studentsCount: 52,
    createdAt: '2026-02-01',
    assignments: [
      { id: 'as-3', title: 'Coordinate Geometry & Straight Lines Speed Test', dueDate: '2026-04-08', questionsCount: 30, completedCount: 46 }
    ]
  }
];
