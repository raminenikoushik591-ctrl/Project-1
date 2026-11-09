import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Bookmark, 
  Search, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard,
  Compass,
  Layers,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInternships } from '../../context/InternshipsContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const { bookmarkedIds } = useInternships();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-150 py-1.5 px-3 rounded-lg flex items-center gap-1.5 ${
      isActive
        ? 'text-blue-600 bg-blue-50/80 font-bold'
        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Briefcase size={22} className="stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Intern<span className="text-blue-600">Hub</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-1 hidden sm:block">
                  Aggregator Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClasses} end>
                Home
              </NavLink>
              <NavLink to="/explore" className={navLinkClasses}>
                <Compass size={16} />
                Explore Internships
              </NavLink>
              <NavLink to="/categories" className={navLinkClasses}>
                <Layers size={16} />
                Categories
              </NavLink>
              <NavLink to="/about" className={navLinkClasses}>
                <Info size={16} />
                About Us
              </NavLink>
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Saved Internships Pill */}
            <Link
              to="/saved"
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium"
              title="Saved Internships"
            >
              <Bookmark size={18} />
              <span className="hidden lg:inline text-xs font-semibold">Saved</span>
              {bookmarkedIds.length > 0 && (
                <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 h-5 flex items-center justify-center">
                  {bookmarkedIds.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-all focus:outline-none"
                >
                  <span className="text-xs font-bold text-slate-700 max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {currentUser.role === 'admin' ? 'Platform Admin' : 'Student'}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'admin' ? (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <ShieldCheck size={16} /> Admin Portal
                        </Link>
                      ) : (
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <LayoutDashboard size={16} /> Student Dashboard
                        </Link>
                      )}

                      <Link
                        to="/saved"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      >
                        <Bookmark size={16} /> Saved ({bookmarkedIds.length})
                      </Link>

                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      >
                        <ShieldCheck size={16} /> Admin Demo Panel
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all duration-150"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/saved"
              className="relative p-2 text-slate-600 hover:text-blue-600"
              title="Saved Internships"
            >
              <Bookmark size={20} />
              {bookmarkedIds.length > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkedIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <Compass size={16} /> Explore Internships
            </Link>
            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <Layers size={16} /> Categories
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <Info size={16} /> About Us
            </Link>
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
            >
              <Bookmark size={16} /> Saved Internships ({bookmarkedIds.length})
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                  <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-4 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100"
                >
                  Student Dashboard
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 px-4 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200"
                >
                  Admin Prototype Panel
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 px-4 rounded-lg text-rose-600 border border-rose-200 font-semibold text-sm hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-lg border border-slate-200 font-semibold text-sm text-slate-800 hover:bg-slate-50"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
