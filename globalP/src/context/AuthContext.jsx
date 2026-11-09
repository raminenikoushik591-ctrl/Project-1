import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_STUDENT = {
  id: "user-student-1",
  name: "Rahul Sharma",
  email: "rahul.sharma@college.edu",
  role: "student",
  college: "Indian Institute of Technology (IIT) Delhi",
  educationLevel: "3rd Year B.Tech, Computer Science",
  graduationYear: "2027",
  bio: "Passionate Full-Stack Developer & Open Source Contributor. Looking for Summer 2027 Software Engineering internships.",
  skills: ["React.js", "JavaScript", "Node.js", "Python", "Tailwind CSS", "SQL", "Git"],
  githubUrl: "https://github.com/rahul-sharma-dev",
  linkedinUrl: "https://linkedin.com/in/rahulsharma-example",
  portfolioUrl: "https://rahulsharma.dev",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
};

const DEMO_ADMIN = {
  id: "user-admin-1",
  name: "Admin Officer",
  email: "admin@internhub.io",
  role: "admin",
  college: "InternHub Central HQ",
  educationLevel: "Platform Super Admin",
  bio: "Administrator overseeing internship ingest pipelines and catalog quality.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('internhub_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('internhub_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('internhub_current_user');
      }
    } catch (err) {
      console.error("Failed to save auth state to localStorage:", err);
    }
  }, [currentUser]);

  const login = (email, password, role = "student") => {
    // Frontend demo authentication simulation
    if (role === "admin" || email.toLowerCase().includes("admin")) {
      setCurrentUser(DEMO_ADMIN);
      return { success: true, user: DEMO_ADMIN };
    } else {
      const user = {
        ...DEMO_STUDENT,
        email: email || DEMO_STUDENT.email,
        name: email ? email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()) : DEMO_STUDENT.name
      };
      setCurrentUser(user);
      return { success: true, user };
    }
  };

  const loginAsStudentDemo = () => {
    setCurrentUser(DEMO_STUDENT);
    return { success: true, user: DEMO_STUDENT };
  };

  const loginAsAdminDemo = () => {
    setCurrentUser(DEMO_ADMIN);
    return { success: true, user: DEMO_ADMIN };
  };

  const signup = (formData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: formData.fullName || "Student User",
      email: formData.email,
      role: "student",
      college: formData.college || "University Student",
      educationLevel: formData.educationLevel || "Undergraduate Student",
      skills: ["React.js", "JavaScript", "HTML/CSS"],
      bio: "Aspiring intern looking for great opportunities on InternHub.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
  };

  const addSkill = (newSkill) => {
    if (!currentUser || !newSkill.trim()) return;
    const cleanSkill = newSkill.trim();
    if (!currentUser.skills?.includes(cleanSkill)) {
      const updatedSkills = [...(currentUser.skills || []), cleanSkill];
      updateProfile({ skills: updatedSkills });
    }
  };

  const removeSkill = (skillToRemove) => {
    if (!currentUser || !currentUser.skills) return;
    const updatedSkills = currentUser.skills.filter(s => s !== skillToRemove);
    updateProfile({ skills: updatedSkills });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        loginAsStudentDemo,
        loginAsAdminDemo,
        signup,
        logout,
        updateProfile,
        addSkill,
        removeSkill
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
