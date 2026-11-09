import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  School, 
  GraduationCap, 
  Bookmark, 
  History, 
  Sparkles, 
  Edit3, 
  Plus, 
  X, 
  Save, 
  CheckCircle, 
  ExternalLink,
  Layers,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useInternships } from '../context/InternshipsContext';
import { InternshipCard } from '../components/common/InternshipCard';

export const StudentDashboardPage = () => {
  const { currentUser, isAuthenticated, updateProfile, addSkill, removeSkill, loginAsStudentDemo } = useAuth();
  const { getSavedInternships, getRecentlyViewedInternships, internships } = useInternships();

  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'recent' | 'recommended' | 'profile'
  const [newSkillInput, setNewSkillInput] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    college: '',
    educationLevel: '',
    bio: ''
  });

  // If not logged in, show prompt to log in or use demo
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <User size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Dashboard</h2>
        <p className="text-sm text-slate-500 mb-6">
          Please sign in to view your personalized internship recommendations, saved bookmarks, and profile.
        </p>
        <div className="space-y-3">
          <button
            type="button"
            onClick={loginAsStudentDemo}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>Continue as Demo Student (Rahul)</span>
          </button>
          <Link
            to="/login"
            className="w-full block py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const savedList = getSavedInternships();
  const recentList = getRecentlyViewedInternships();

  // Compute recommended internships based on matching student skills
  const userSkills = currentUser.skills || [];
  const recommendedList = internships.filter(item => {
    if (!item.skills) return false;
    // Check if any skill matches
    return item.skills.some(skill => 
      userSkills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
  }).slice(0, 6);

  const handleOpenEdit = () => {
    setEditForm({
      name: currentUser.name || '',
      college: currentUser.college || '',
      educationLevel: currentUser.educationLevel || '',
      bio: currentUser.bio || ''
    });
    setEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setEditModalOpen(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkill(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden shadow-md">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name?.charAt(0) || "S"
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Student
                </span>
              </div>

              <p className="text-sm text-slate-600 flex items-center gap-1.5 font-medium">
                <School size={16} className="text-slate-400" />
                <span>{currentUser.college}</span>
              </p>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <GraduationCap size={15} className="text-slate-400" />
                <span>{currentUser.educationLevel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              <Edit3 size={14} /> Edit Profile
            </button>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm transition-all"
            >
              <Briefcase size={14} /> Find Internships
            </Link>
          </div>

        </div>

        {/* Bio */}
        {currentUser.bio && (
          <p className="text-xs sm:text-sm text-slate-600 mt-5 pt-4 border-t border-slate-100 leading-relaxed">
            {currentUser.bio}
          </p>
        )}

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Saved Internships
            </span>
            <span className="text-xl font-bold text-blue-600">{savedList.length}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Recently Viewed
            </span>
            <span className="text-xl font-bold text-slate-900">{recentList.length}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Recommended Roles
            </span>
            <span className="text-xl font-bold text-indigo-600">{recommendedList.length}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Skills Added
            </span>
            <span className="text-xl font-bold text-emerald-600">{userSkills.length}</span>
          </div>
        </div>

      </div>

      {/* 2. Interactive Skills Manager Strip */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">My Target Skills</h2>
            <p className="text-xs text-slate-500">
              Add skills to receive curated recommendations from top indexed companies
            </p>
          </div>

          {/* Add Skill form */}
          <form onSubmit={handleAddSkill} className="flex items-center gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="e.g. Docker, Next.js, Figma..."
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Add Skill"
            >
              <Plus size={16} />
            </button>
          </form>
        </div>

        {/* Skill tags */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {userSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-blue-900 focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                <X size={13} />
              </button>
            </span>
          ))}
          {userSkills.length === 0 && (
            <p className="text-xs text-slate-400 italic">No skills added yet. Add some skills above!</p>
          )}
        </div>
      </div>

      {/* 3. Tabbed Content: Saved, Recently Viewed, Recommended */}
      <div className="space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark size={16} />
            <span>Saved Internships ({savedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommended')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={16} />
            <span>Recommended for You ({recommendedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'recent'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History size={16} />
            <span>Recently Viewed ({recentList.length})</span>
          </button>
        </div>

        {/* Tab 1: Saved Internships */}
        {activeTab === 'saved' && (
          <div>
            {savedList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedList.map(item => (
                  <InternshipCard key={item.id} internship={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <Bookmark size={32} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-800 mb-1">No saved internships yet</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Browse through thousands of aggregated opportunities and bookmark roles you wish to apply for.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Explore Opportunities
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Recommended Internships */}
        {activeTab === 'recommended' && (
          <div>
            {recommendedList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedList.map(item => (
                  <InternshipCard key={item.id} internship={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <Sparkles size={32} className="mx-auto text-blue-400 mb-3" />
                <h3 className="font-bold text-slate-800 mb-1">Add skills to get recommendations</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Add more skills like React, Python, or SQL in the skills manager above to see tailored internships.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recently Viewed */}
        {activeTab === 'recent' && (
          <div>
            {recentList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentList.map(item => (
                  <InternshipCard key={item.id} internship={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <History size={32} className="mx-auto text-slate-300 mb-3" />
                <h3 className="font-bold text-slate-800 mb-1">No recently viewed roles</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Internships you inspect will appear here for easy reference.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 4. Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Edit Student Profile</h3>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">College / University</label>
                <input
                  type="text"
                  value={editForm.college}
                  onChange={(e) => setEditForm(prev => ({ ...prev, college: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Education Level</label>
                <input
                  type="text"
                  value={editForm.educationLevel}
                  onChange={(e) => setEditForm(prev => ({ ...prev, educationLevel: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
