"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Link as LinkIcon,
  Users,
  BookOpen,
  Star,
  ExternalLink,
  Sun,
  Moon,
  Loader2,
  Code,
} from "lucide-react";

export default function Page() {
  // State management
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Function to fetch GitHub user and repositories
  const fetchGithubData = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError("");

      // Fetch user profile
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      // Fetch repositories
      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      // Convert responses to JSON
      const user = await userResponse.json();
      const repositories = await repoResponse.json();

      // Handle user not found
      if (user.message === "Not Found") {
        setError("GitHub user not found");
        setUserData(null);
        setRepos([]);
        setLoading(false);
        return;
      }

      // Sort repositories by stars
      const sortedRepos = repositories.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );

      // Save data to state
      setUserData(user);
      setRepos(sortedRepos);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchGithubData();
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      theme === "dark"
        ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
        : "bg-linear-to-br from-blue-50 via-white to-purple-50 text-gray-900"
    } px-3 py-4 sm:px-4 sm:py-6 lg:py-10`}>
      {/* Theme Toggle */}
      <div className="fixed top-3 right-3 z-50 sm:top-4 sm:right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700 text-yellow-400"
              : "bg-white hover:bg-gray-100 text-gray-800 shadow-lg"
          }`}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
            <Code size={32} className={`sm:size-10 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } animate-pulse`} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              GitHub Finder
            </h1>
          </div>

          <p className={`${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          } text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2`}>
            Discover GitHub users and explore their repositories with our sleek, modern dashboard.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 animate-slide-up px-2">
          <div className={`${
            theme === "dark"
              ? "bg-slate-800/50 border-slate-700"
              : "bg-white/80 border-gray-200"
          } backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <Search className={`hidden sm:block ${
              theme === "dark" ? "text-slate-500" : "text-gray-400"
            }`} />

            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`flex-1 bg-transparent outline-none text-sm sm:text-base px-2 sm:px-0 py-2 sm:py-0 placeholder:${
                theme === "dark" ? "text-slate-500" : "text-gray-400"
              } transition-colors`}
            />

            <button
              onClick={fetchGithubData}
              disabled={loading}
              className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? <Loader2 size={16} className="animate-spin sm:size-4" /> : <Search size={16} className="sm:hidden" />}
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mt-8 sm:mt-12 lg:mt-16 animate-fade-in">
            <div className={`h-12 w-12 sm:h-16 sm:w-16 border-4 ${
              theme === "dark" ? "border-blue-400 border-t-transparent" : "border-blue-600 border-t-transparent"
            } rounded-full animate-spin mb-3 sm:mb-4`}></div>
            <p className={`${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            } text-sm sm:text-base lg:text-lg`}>Fetching GitHub data...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={`max-w-xl mx-auto ${
            theme === "dark"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-red-50 border-red-200 text-red-600"
          } border rounded-xl p-3 sm:p-4 text-center text-sm sm:text-base animate-shake mx-2`}>
            {error}
          </div>
        )}

        {/* User Profile Section */}
        {userData && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-in px-2">
            {/* User Card */}
            <div className={`${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700"
                : "bg-white/80 border-gray-200"
            } backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up`}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center sm:items-start">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 rounded-full border-4 border-blue-400 shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                    <div className="min-w-0">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        {userData.name || userData.login}
                      </h2>

                      <p className={`${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      } text-sm sm:text-base lg:text-lg truncate`}>
                        @{userData.login}
                      </p>
                    </div>

                    <a
                      href={userData.html_url}
                      target="_blank"
                      className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                    >
                      Visit Profile
                      <ExternalLink size={16} className="sm:size-4" />
                    </a>
                  </div>

                  {/* Bio */}
                  <p className={`${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  } mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base text-center sm:text-left`}>
                    {userData.bio || "No bio available"}
                  </p>

                  {/* Extra Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8">
                    {/* Followers */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center sm:justify-start text-xs sm:text-sm`}>
                        <Users size={16} />
                        Followers
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left">
                        {userData.followers.toLocaleString()}
                      </h3>
                    </div>

                    {/* Following */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center sm:justify-start text-xs sm:text-sm`}>
                        <Users size={16} />
                        Following
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left">
                        {userData.following.toLocaleString()}
                      </h3>
                    </div>

                    {/* Public Repos */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center sm:justify-start text-xs sm:text-sm`}>
                        <BookOpen size={16} />
                        Repositories
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left">
                        {userData.public_repos.toLocaleString()}
                      </h3>
                    </div>
                  </div>

                  {/* Location and Website */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 justify-center sm:justify-start">
                    {userData.location && (
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      } hover:text-blue-400 transition-colors text-sm sm:text-base`}>
                        <MapPin size={16} className="shrink-0" />
                        <span className="truncate">{userData.location}</span>
                      </div>
                    )}

                    {userData.blog && (
                      <a
                        href={userData.blog}
                        target="_blank"
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-slate-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                        } transition-colors text-sm sm:text-base truncate`}
                      >
                        <LinkIcon size={16} className="shrink-0" />
                        <span className="truncate">Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Repository Section */}
            <div className="animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  Popular Repositories
                </h2>

                <span className={`${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                } text-xs sm:text-sm lg:text-base whitespace-nowrap`}>
                  {repos.length} repositories found
                </span>
              </div>

              {/* Repository Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {repos.slice(0, 9).map((repo, index) => (
                  <div
                    key={repo.id}
                    className={`${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-700 hover:border-blue-400"
                        : "bg-white/80 border-gray-200 hover:border-blue-300"
                    } backdrop-blur-sm border rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in flex flex-col`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Repo Name */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors line-clamp-1 flex-1">
                        {repo.name}
                      </h3>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        className={`${
                          theme === "dark" ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        } transition-colors shrink-0`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>

                    {/* Description */}
                    <p className={`${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    } line-clamp-3 min-h-15 text-xs sm:text-sm lg:text-base flex-1`}>
                      {repo.description || "No description available"}
                    </p>

                    {/* Repo Stats */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4 lg:mt-6 flex-wrap gap-2">
                      {/* Language */}
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 shrink-0"></div>

                        <span className={`${
                          theme === "dark" ? "text-slate-300" : "text-gray-700"
                        } text-xs sm:text-sm truncate`}>
                          {repo.language || "Unknown"}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 sm:gap-2 text-yellow-400">
                        <Star size={16} className="sm:size-4" fill="currentColor" />
                        <span className="font-semibold text-xs sm:text-sm">{repo.stargazers_count}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-3 sm:mt-4 lg:mt-6">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center py-2 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
                      >
                        View Repo
                      </a>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          className={`px-3 sm:px-4 py-2 sm:py-2 lg:py-3 border ${
                            theme === "dark"
                              ? "border-slate-600 hover:border-blue-400"
                              : "border-gray-300 hover:border-blue-300"
                          } rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base font-semibold`}
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}