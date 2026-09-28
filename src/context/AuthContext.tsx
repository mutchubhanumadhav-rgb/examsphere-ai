import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/index.ts';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  student: {
    id: 'user-stu-1',
    name: 'Bhanu Madhav',
    email: 'mutchubhanumadhav@gmail.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    targetExams: ['jee-main', 'ap-eapcet', 'bitsat'],
    educationLevel: 'Undergraduate Aspirant (10+2 PCM)',
    country: 'India',
    createdAt: '2026-01-10',
  },
  educator: {
    id: 'user-edu-1',
    name: 'Dr. K. Ramesh Rao',
    email: 'ramesh.physics@examsphere.edu',
    role: 'educator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    targetExams: ['jee-main', 'ap-eapcet'],
    educationLevel: 'Senior Faculty & Research Mentor',
    country: 'India',
    createdAt: '2025-11-20',
  },
  admin: {
    id: 'user-adm-1',
    name: 'Academic Verification Officer',
    email: 'admin.registry@examsphere.org',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    targetExams: ['all'],
    educationLevel: 'Exam Registry & Source Compliance Officer',
    country: 'Global',
    createdAt: '2025-08-01',
  },
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_PROFILES.student,
  role: 'student',
  setRole: () => {},
  login: () => {},
  logout: () => {},
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('examsphere_role');
    return (saved as UserRole) || 'student';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('examsphere_role');
    const r = (saved as UserRole) || 'student';
    return DEFAULT_PROFILES[r] || DEFAULT_PROFILES.student;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('examsphere_role', role);
    setUser(DEFAULT_PROFILES[role]);
  }, [role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(DEFAULT_PROFILES[newRole]);
  };

  const login = (email: string, selectedRole: UserRole = 'student') => {
    const base = DEFAULT_PROFILES[selectedRole];
    setUser({
      ...base,
      email,
      name: email.split('@')[0],
      role: selectedRole,
    });
    setRoleState(selectedRole);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
