import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_INTERNSHIPS } from '../data/internships';

const InternshipsContext = createContext();

const STORAGE_KEY_INTERNSHIPS = 'internhub_internships_data_v1';
const STORAGE_KEY_BOOKMARKS = 'internhub_bookmarked_ids_v1';
const STORAGE_KEY_RECENT = 'internhub_recently_viewed_ids_v1';

export const InternshipsProvider = ({ children }) => {
  // Load internships from local storage or fall back to SAMPLE_INTERNSHIPS
  const [internships, setInternships] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INTERNSHIPS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to read internships from localStorage, falling back to sample data.", e);
    }
    return SAMPLE_INTERNSHIPS;
  });

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      return stored ? JSON.parse(stored) : ["intern-1", "intern-3"]; // default couple bookmarked for demo
    } catch {
      return ["intern-1", "intern-3"];
    }
  });

  // Recently Viewed
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT);
      return stored ? JSON.parse(stored) : ["intern-1", "intern-2", "intern-4"];
    } catch {
      return ["intern-1", "intern-2", "intern-4"];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INTERNSHIPS, JSON.stringify(internships));
    } catch (e) {
      console.error("Failed to save internships to localStorage", e);
    }
  }, [internships]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage", e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.error("Failed to save recently viewed to localStorage", e);
    }
  }, [recentlyViewedIds]);

  // Bookmark actions
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isBookmarked = (id) => {
    return bookmarkedIds.includes(id);
  };

  const addToRecentlyViewed = (id) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
  };

  // Admin CRUD actions
  const addInternship = (newInternship) => {
    const item = {
      ...newInternship,
      id: newInternship.id || `intern-${Date.now()}`,
      postedDate: newInternship.postedDate || new Date().toISOString().split('T')[0],
      status: newInternship.status || "Active",
      isFeatured: !!newInternship.isFeatured
    };
    setInternships(prev => [item, ...prev]);
    return item;
  };

  const updateInternship = (id, updatedFields) => {
    setInternships(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteInternship = (id) => {
    setInternships(prev => prev.filter(item => item.id !== id));
    setBookmarkedIds(prev => prev.filter(item => item !== id));
    setRecentlyViewedIds(prev => prev.filter(item => item !== id));
  };

  const resetToDefaultData = () => {
    setInternships(SAMPLE_INTERNSHIPS);
    setBookmarkedIds(["intern-1", "intern-3"]);
    setRecentlyViewedIds(["intern-1", "intern-2", "intern-4"]);
    localStorage.removeItem(STORAGE_KEY_INTERNSHIPS);
    localStorage.removeItem(STORAGE_KEY_BOOKMARKS);
    localStorage.removeItem(STORAGE_KEY_RECENT);
  };

  const getInternshipById = (id) => {
    return internships.find(item => item.id === id);
  };

  const getSavedInternships = () => {
    return internships.filter(item => bookmarkedIds.includes(item.id));
  };

  const getRecentlyViewedInternships = () => {
    return recentlyViewedIds
      .map(id => internships.find(item => item.id === id))
      .filter(Boolean);
  };

  return (
    <InternshipsContext.Provider
      value={{
        internships,
        bookmarkedIds,
        recentlyViewedIds,
        toggleBookmark,
        isBookmarked,
        addToRecentlyViewed,
        addInternship,
        updateInternship,
        deleteInternship,
        resetToDefaultData,
        getInternshipById,
        getSavedInternships,
        getRecentlyViewedInternships
      }}
    >
      {children}
    </InternshipsContext.Provider>
  );
};

export const useInternships = () => {
  const context = useContext(InternshipsContext);
  if (!context) {
    throw new Error('useInternships must be used within an InternshipsProvider');
  }
  return context;
};
