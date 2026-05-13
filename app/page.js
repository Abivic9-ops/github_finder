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
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900"
    } px-4 py-6 md:py-10`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
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
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code size={40} className={`${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } animate-pulse`} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              GitHub Finder
            </h1>
          </div>

          <p className={`${
            theme === "dark" ? "text-slate-400" : "text-gray-600"
          } text-lg max-w-2xl mx-auto leading-relaxed`}>
            Discover GitHub users and explore their repositories with our sleek, modern dashboard.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10 animate-slide-up">
          <div className={`${
            theme === "dark"
              ? "bg-slate-800/50 border-slate-700"
              : "bg-white/80 border-gray-200"
          } backdrop-blur-sm border rounded-2xl p-3 flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            <Search className={`${
              theme === "dark" ? "text-slate-500" : "text-gray-400"
            }`} />

            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              className={`flex-1 bg-transparent outline-none text-lg placeholder:${
                theme === "dark" ? "text-slate-500" : "text-gray-400"
              } transition-colors`}
            />

            <button
              onClick={fetchGithubData}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mt-12 md:mt-16 animate-fade-in">
            <div className={`h-16 w-16 border-4 ${
              theme === "dark" ? "border-blue-400 border-t-transparent" : "border-blue-600 border-t-transparent"
            } rounded-full animate-spin mb-4`}></div>
            <p className={`${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            } text-lg`}>Fetching GitHub data...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={`max-w-xl mx-auto ${
            theme === "dark"
              ? "bg-red-500/10 border-red-500/20 text-red-400"
              : "bg-red-50 border-red-200 text-red-600"
          } border rounded-xl p-4 text-center animate-shake`}>
            {error}
          </div>
        )}

        {/* User Profile Section */}
        {userData && (
          <div className="space-y-8 md:space-y-10 animate-fade-in">
            {/* User Card */}
            <div className={`${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700"
                : "bg-white/80 border-gray-200"
            } backdrop-blur-sm border rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up`}>
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center lg:items-start">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        {userData.name || userData.login}
                      </h2>

                      <p className={`${
                        theme === "dark" ? "text-blue-400" : "text-blue-600"
                      } text-lg`}>
                        @{userData.login}
                      </p>
                    </div>

                    <a
                      href={userData.html_url}
                      target="_blank"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Visit Profile
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* Bio */}
                  <p className={`${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  } mt-4 leading-relaxed text-center lg:text-left`}>
                    {userData.bio || "No bio available"}
                  </p>

                  {/* Extra Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-8">
                    {/* Followers */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-2xl p-4 md:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center lg:justify-start`}>
                        <Users size={18} />
                        Followers
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                        {userData.followers.toLocaleString()}
                      </h3>
                    </div>

                    {/* Following */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-2xl p-4 md:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center lg:justify-start`}>
                        <Users size={18} />
                        Following
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                        {userData.following.toLocaleString()}
                      </h3>
                    </div>

                    {/* Public Repos */}
                    <div className={`${
                      theme === "dark"
                        ? "bg-slate-700/50"
                        : "bg-gray-50"
                    } rounded-2xl p-4 md:p-5 hover:scale-105 transition-transform duration-300`}>
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-500"
                      } mb-2 justify-center lg:justify-start`}>
                        <BookOpen size={18} />
                        Repositories
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                        {userData.public_repos.toLocaleString()}
                      </h3>
                    </div>
                  </div>

                  {/* Location and Website */}
                  <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-8 justify-center lg:justify-start">
                    {userData.location && (
                      <div className={`flex items-center gap-2 ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      } hover:text-blue-400 transition-colors`}>
                        <MapPin size={18} />
                        {userData.location}
                      </div>
                    )}

                    {userData.blog && (
                      <a
                        href={userData.blog}
                        target="_blank"
                        className={`flex items-center gap-2 ${
                          theme === "dark" ? "text-slate-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                        } transition-colors`}
                      >
                        <LinkIcon size={18} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Repository Section */}
            <div className="animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Popular Repositories
                </h2>

                <span className={`${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                } text-sm md:text-base`}>
                  {repos.length} repositories found
                </span>
              </div>

              {/* Repository Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {repos.slice(0, 9).map((repo, index) => (
                  <div
                    key={repo.id}
                    className={`${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-700 hover:border-blue-400"
                        : "bg-white/80 border-gray-200 hover:border-blue-300"
                    } backdrop-blur-sm border rounded-3xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Repo Name */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors line-clamp-1">
                        {repo.name}
                      </h3>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        className={`${
                          theme === "dark" ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                        } transition-colors`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    {/* Description */}
                    <p className={`${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    } mt-3 line-clamp-3 min-h-[60px] text-sm md:text-base`}>
                      {repo.description || "No description available"}
                    </p>

                    {/* Repo Stats */}
                    <div className="flex items-center justify-between mt-4 md:mt-6">
                      {/* Language */}
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>

                        <span className={`${
                          theme === "dark" ? "text-slate-300" : "text-gray-700"
                        } text-sm`}>
                          {repo.language || "Unknown"}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Star size={18} fill="currentColor" />
                        <span className="font-semibold">{repo.stargazers_count}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-center py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm md:text-base"
                      >
                        View Repo
                      </a>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          className={`px-3 md:px-4 py-2 md:py-3 border ${
                            theme === "dark"
                              ? "border-slate-600 hover:border-blue-400"
                              : "border-gray-300 hover:border-blue-300"
                          } rounded-xl transition-all duration-300 hover:scale-105 text-sm md:text-base`}
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