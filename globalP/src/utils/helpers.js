export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "Unpaid / Undisclosed";
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getRelativeTime = (dateString) => {
  if (!dateString) return "Recently";
  const posted = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - posted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return "Today";
  if (diffDays === 2) return "1 day ago";
  if (diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays <= 14) return "1 week ago";
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} month(s) ago`;
};

export const getSourceBadgeInfo = (source) => {
  switch (source) {
    case "Internshala":
      return {
        name: "Internshala",
        tagClass: "bg-sky-50 text-sky-700 border-sky-200",
        badgeColor: "#008BDC",
        accentBg: "bg-sky-500"
      };
    case "LinkedIn":
      return {
        name: "LinkedIn",
        tagClass: "bg-blue-50 text-blue-700 border-blue-200",
        badgeColor: "#0A66C2",
        accentBg: "bg-blue-600"
      };
    case "Indeed":
      return {
        name: "Indeed",
        tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
        badgeColor: "#2164f3",
        accentBg: "bg-indigo-600"
      };
    case "Wellfound":
      return {
        name: "Wellfound",
        tagClass: "bg-rose-50 text-rose-700 border-rose-200",
        badgeColor: "#FF5A5F",
        accentBg: "bg-rose-500"
      };
    case "Naukri":
      return {
        name: "Naukri",
        tagClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
        badgeColor: "#4A90E2",
        accentBg: "bg-cyan-600"
      };
    case "Company Career Page":
    default:
      return {
        name: "Direct Career Page",
        tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        badgeColor: "#10B981",
        accentBg: "bg-emerald-600"
      };
  }
};

export const getWorkModeBadgeClass = (mode) => {
  switch (mode) {
    case "Remote":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Hybrid":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "On-site":
      return "bg-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};
