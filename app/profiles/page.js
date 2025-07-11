"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [artType, setArtType] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [expanded, setExpanded] = useState({});

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (artType) params.append("artType", artType);
    fetch(`/api/profiles/all?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      });
  }, [debouncedSearch, artType]);

  // Get all unique art types for filter dropdown
  const artTypes = useMemo(() => {
    const set = new Set(profiles.map((p) => p.artType).filter(Boolean));
    return ["", ...Array.from(set)];
  }, [profiles]);

  // Group profiles by artType
  const grouped = useMemo(() => {
    return profiles.reduce((acc, profile) => {
      (acc[profile.artType] = acc[profile.artType] || []).push(profile);
      return acc;
    }, {});
  }, [profiles]);

  // Expand all by default when profiles load
  useEffect(() => {
    if (profiles.length > 0) {
      const initial = {};
      profiles.forEach(p => { initial[p.artType] = true; });
      setExpanded(initial);
    }
  }, [profiles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-900 to-teal-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-orange-100 mb-8">Discover Creators</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, username, or bio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
          />
          <select
            value={artType}
            onChange={(e) => setArtType(e.target.value)}
            className="w-full md:w-1/4 p-3 rounded-lg border border-gray-300 bg-gray-800 text-orange-100 focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Art Types</option>
            {artTypes.filter(Boolean).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center text-orange-200 py-20 text-lg">Loading profiles...</div>
        ) : profiles.length === 0 ? (
          <div className="text-center text-orange-200 py-20 text-lg">No profiles found.</div>
        ) : (
          Object.entries(grouped).map(([type, group]) => (
            <div key={type} className="mb-12">
              <button
                className="w-full text-left text-2xl font-semibold text-orange-200 mb-6 border-b border-orange-800 pb-2 flex items-center justify-between focus:outline-none"
                onClick={() => setExpanded(prev => ({ ...prev, [type]: !prev[type] }))}
                aria-expanded={!!expanded[type]}
              >
                <span>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </span>
                <span className="ml-2 text-orange-400">
                  {expanded[type] ? "−" : "+"}
                </span>
              </button>
              {expanded[type] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {group.map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/profile/${profile.username}`}
                      className="block bg-gray-900 rounded-lg shadow-lg hover:shadow-xl hover:bg-orange-950 transition p-6 text-orange-100"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={profile.photoUrl || "/default-avatar.png"}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 bg-gray-800"
                        />
                        <div>
                          <div className="text-lg font-bold">{profile.name}</div>
                          <div className="text-orange-300 text-sm">@{profile.username}</div>
                        </div>
                      </div>
                      <div className="text-sm text-orange-200 mb-2 line-clamp-2 min-h-[2.5em]">{profile.bio}</div>
                      {profile.genre && (
                        <div className="text-xs text-orange-400 mb-1">Genre: {profile.genre}</div>
                      )}
                      {profile.stageName && (
                        <div className="text-xs text-orange-400 mb-1">Stage Name: {profile.stageName}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}