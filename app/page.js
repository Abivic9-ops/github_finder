"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Link as LinkIcon,
  Users,
  BookOpen,
  Star,
  ExternalLink,
} from "lucide-react";

export default function Page() {
  // State management
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-10">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <Github size={40} className="text-cyan-400" /> */}
            <h1 className="text-5xl font-bold tracking-tight">
              GitHub Searcher
            </h1>
          </div>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Search GitHub users and explore their repositories with a sleek
            modern dashboard.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-center gap-3 shadow-2xl">
            <Search className="text-zinc-500" />

            <input
              type="text"
              placeholder="Search GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-500"
            />

            <button
              onClick={fetchGithubData}
              className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black font-semibold px-6 py-3 rounded-xl"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mt-16">
            <div className="h-16 w-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-xl mx-auto bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 text-center">
            {error}
          </div>
        )}

        {/* User Profile Section */}
        {userData && (
          <div className="space-y-10">
            {/* User Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <img
                  src={userData.avatar_url}
                  alt={userData.login}
                  className="w-40 h-40 rounded-full border-4 border-cyan-400 shadow-lg"
                />

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-4xl font-bold">
                        {userData.name || userData.login}
                      </h2>

                      <p className="text-cyan-400 text-lg">
                        @{userData.login}
                      </p>
                    </div>

                    <a
                      href={userData.html_url}
                      target="_blank"
                      className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
                    >
                      Visit Profile
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  {/* Bio */}
                  <p className="text-zinc-300 mt-5 leading-relaxed">
                    {userData.bio || "No bio available"}
                  </p>

                  {/* Extra Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {/* Followers */}
                    <div className="bg-zinc-800 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <Users size={18} />
                        Followers
                      </div>

                      <h3 className="text-2xl font-bold">
                        {userData.followers}
                      </h3>
                    </div>

                    {/* Following */}
                    <div className="bg-zinc-800 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <Users size={18} />
                        Following
                      </div>

                      <h3 className="text-2xl font-bold">
                        {userData.following}
                      </h3>
                    </div>

                    {/* Public Repos */}
                    <div className="bg-zinc-800 rounded-2xl p-5">
                      <div className="flex items-center gap-2 text-zinc-400 mb-2">
                        <BookOpen size={18} />
                        Repositories
                      </div>

                      <h3 className="text-2xl font-bold">
                        {userData.public_repos}
                      </h3>
                    </div>
                  </div>

                  {/* Location and Website */}
                  <div className="flex flex-wrap gap-6 mt-8 text-zinc-400">
                    {userData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        {userData.location}
                      </div>
                    )}

                    {userData.blog && (
                      <a
                        href={userData.blog}
                        target="_blank"
                        className="flex items-center gap-2 hover:text-cyan-400 transition"
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
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  Popular Repositories
                </h2>

                <span className="text-zinc-400">
                  {repos.length} repositories found
                </span>
              </div>

              {/* Repository Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Repo Name */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-cyan-400">
                        {repo.name}
                      </h3>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="text-zinc-400 hover:text-white transition"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 mt-4 line-clamp-3 min-h-[70px]">
                      {repo.description || "No description available"}
                    </p>

                    {/* Repo Stats */}
                    <div className="flex items-center justify-between mt-6">
                      {/* Language */}
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-400"></div>

                        <span className="text-zinc-300 text-sm">
                          {repo.language || "Unknown"}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Star size={18} fill="currentColor" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-6">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black text-center py-3 rounded-xl font-semibold transition"
                      >
                        View Repo
                      </a>

                      <a
                        href={repo.homepage}
                        target="_blank"
                        className="px-4 py-3 border border-zinc-700 hover:border-cyan-400 rounded-xl transition"
                      >
                        Live
                      </a>
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