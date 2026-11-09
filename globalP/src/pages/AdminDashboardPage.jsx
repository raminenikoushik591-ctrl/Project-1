import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  X, 
  Save, 
  Building2, 
  Filter,
  Eye,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';
import { useInternships } from '../context/InternshipsContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, SOURCE_PLATFORMS, WORK_MODES, LOCATIONS } from '../data/internships';
import { SourceBadge, WorkModeBadge, StatusBadge } from '../components/common/Badge';

export const AdminDashboardPage = () => {
  const { internships, addInternship, updateInternship, deleteInternship, resetToDefaultData } = useInternships();
  const { currentUser, loginAsAdminDemo } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEditId, setCurrentEditId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const initialForm = {
    title: '',
    company: '',
    companyLogo: '',
    companyColor: '#2563eb',
    location: 'Bangalore, India',
    workMode: 'Hybrid',
    stipend: '₹30,000 / month',
    stipendAmount: 30000,
    duration: '3 Months',
    durationMonths: 3,
    category: 'Web Development',
    experienceLevel: 'Fresher / Student',
    skills: 'React.js, JavaScript, Tailwind CSS',
    description: '',
    responsibilities: 'Build user interfaces, Write tests, Collaborate with team',
    eligibility: 'B.Tech/MCA 2026/2027 batch, Strong fundamentals',
    benefits: 'Certificate, Flexible hours, PPO Opportunity',
    source: 'Internshala',
    applicationUrl: 'https://internshala.com',
    deadline: '2026-12-31',
    status: 'Active',
    isFeatured: false
  };

  const [form, setForm] = useState(initialForm);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setForm(initialForm);
    setModalMode('add');
    setCurrentEditId(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setForm({
      title: item.title || '',
      company: item.company || '',
      companyLogo: item.companyLogo || '',
      companyColor: item.companyColor || '#2563eb',
      location: item.location || 'Bangalore, India',
      workMode: item.workMode || 'Hybrid',
      stipend: item.stipend || '₹30,000 / month',
      stipendAmount: item.stipendAmount || 30000,
      duration: item.duration || '3 Months',
      durationMonths: item.durationMonths || 3,
      category: item.category || 'Web Development',
      experienceLevel: item.experienceLevel || 'Fresher / Student',
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : item.skills || '',
      description: item.description || '',
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : item.responsibilities || '',
      eligibility: Array.isArray(item.eligibility) ? item.eligibility.join('\n') : item.eligibility || '',
      benefits: Array.isArray(item.benefits) ? item.benefits.join('\n') : item.benefits || '',
      source: item.source || 'Internshala',
      applicationUrl: item.applicationUrl || 'https://internshala.com',
      deadline: item.deadline || '2026-12-31',
      status: item.status || 'Active',
      isFeatured: !!item.isFeatured
    });
    setModalMode('edit');
    setCurrentEditId(item.id);
    setIsModalOpen(true);
  };

  // Submit Add or Edit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...form,
      stipendAmount: Number(form.stipendAmount) || 0,
      durationMonths: Number(form.durationMonths) || 3,
      skills: typeof form.skills === 'string' ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : form.skills,
      responsibilities: typeof form.responsibilities === 'string' ? form.responsibilities.split('\n').map(s => s.trim()).filter(Boolean) : form.responsibilities,
      eligibility: typeof form.eligibility === 'string' ? form.eligibility.split('\n').map(s => s.trim()).filter(Boolean) : form.eligibility,
      benefits: typeof form.benefits === 'string' ? form.benefits.split('\n').map(s => s.trim()).filter(Boolean) : form.benefits,
    };

    if (modalMode === 'add') {
      addInternship(formattedData);
      showToast('New internship added successfully!');
    } else {
      updateInternship(currentEditId, formattedData);
      showToast('Internship updated successfully!');
    }

    setIsModalOpen(false);
  };

  // Delete action
  const handleDelete = (id) => {
    deleteInternship(id);
    setDeleteConfirmId(null);
    showToast('Internship listing deleted.');
  };

  // Reset to default sample data
  const handleResetData = () => {
    if (window.confirm('Reset all internships back to the original 24 sample records? Any custom additions or edits will be cleared.')) {
      resetToDefaultData();
      showToast('Reset catalog to standard sample data.');
    }
  };

  // Stats calculation
  const totalCount = internships.length;
  const activeCount = internships.filter(item => item.status === 'Active').length;
  const expiredCount = internships.filter(item => item.status === 'Expired').length;
  const featuredCount = internships.filter(item => item.isFeatured).length;

  // Filtered internships for table
  const filteredList = internships.filter(item => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCompany = item.company.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany) return false;
    }
    if (selectedSourceFilter !== 'all' && item.source !== selectedSourceFilter) return false;
    if (selectedStatusFilter !== 'all' && item.status !== selectedStatusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                <ShieldCheck size={22} />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Admin Control Center
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                Prototype CRUD
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage aggregated opportunities, simulate adding new postings, test editing, and monitor portal feeds.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handleResetData}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
              title="Reset state to initial sample dataset"
            >
              <RotateCcw size={14} /> Reset Sample Data
            </button>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Plus size={16} /> Add Internship
            </button>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Internships
            </span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Listings
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{activeCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Featured Opportunities
            </span>
            <div className="text-2xl font-extrabold text-blue-600 mt-1">{featuredCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Students (Demo)
            </span>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1">1,248</div>
          </div>
        </div>
      </div>

      {/* Source Portals Overview Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers size={18} className="text-blue-600" />
            <span>Indexed Source Portals</span>
          </h2>
          <span className="text-xs text-slate-400">All aggregations active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SOURCE_PLATFORMS.map((portal) => {
            const portalCount = internships.filter(item => item.source === portal.name).length;
            return (
              <div key={portal.name} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: portal.color }} />
                <div className="text-xs font-bold text-slate-800 truncate">{portal.name}</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">{portalCount} Roles</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internships Management Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Internship Listings Table</h2>
            <p className="text-xs text-slate-500">Showing {filteredList.length} of {internships.length} listings</p>
          </div>

          {/* Table Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[180px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search title/company..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="all">All Sources</option>
              {SOURCE_PLATFORMS.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Closing Soon">Closing Soon</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Internship & Company</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Source Portal</th>
                <th className="py-3 px-4">Work Mode</th>
                <th className="py-3 px-4">Stipend</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-1.5">
                      <span>{item.company}</span>
                      <span className="text-slate-300">•</span>
                      <span>{item.location}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <SourceBadge source={item.source} size="xs" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <WorkModeBadge mode={item.workMode} />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 whitespace-nowrap">
                    {item.stipend}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/internship/${item.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100"
                        title="View Live Listing"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                        title="Edit Internship"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        title="Delete Internship"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No internship records matched the current table filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle size={26} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to remove this internship listing from the local database?
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="w-1/2 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Internship Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {modalMode === 'add' ? 'Add New Aggregated Internship' : 'Edit Internship Listing'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Internship Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. React Developer Intern"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company Name *</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Razorpay"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.slice(1).map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Work Mode</label>
                  <select
                    value={form.workMode}
                    onChange={(e) => setForm(prev => ({ ...prev, workMode: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    {WORK_MODES.slice(1).map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Source Portal</label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    {SOURCE_PLATFORMS.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Stipend Display (e.g. ₹30,000 / month)</label>
                  <input
                    type="text"
                    value={form.stipend}
                    onChange={(e) => setForm(prev => ({ ...prev, stipend: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Numeric Amount (₹)</label>
                  <input
                    type="number"
                    value={form.stipendAmount}
                    onChange={(e) => setForm(prev => ({ ...prev, stipendAmount: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Duration (e.g. 6 Months)</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Direct Application URL</label>
                  <input
                    type="url"
                    value={form.applicationUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, applicationUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={form.skills}
                  onChange={(e) => setForm(prev => ({ ...prev, skills: e.target.value }))}
                  placeholder="React.js, Node.js, SQL"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Internship Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Overview of the internship role and expectations..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Responsibilities (One bullet per line)</label>
                <textarea
                  rows={2}
                  value={form.responsibilities}
                  onChange={(e) => setForm(prev => ({ ...prev, responsibilities: e.target.value }))}
                  placeholder="Build modular components&#10;Write unit tests&#10;Attend agile scrums"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Closing Soon">Closing Soon</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Mark as Featured Internship on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm"
                >
                  {modalMode === 'add' ? 'Add Internship' : 'Save Changes'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
