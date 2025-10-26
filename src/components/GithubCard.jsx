import { Users, GitFork, Star, ExternalLink } from "lucide-react";
import LoadingSpinner from "./LoaderSpinner";

const GitHubCard = ({ data, loading, error }) => {
  return (
    <div className="transition-smooth shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30 rounded-lg hover:shadow-none bg-white dark:bg-gray-900">
      <div className="p-8">
        <div className="flex items-center gap-2">
          <GitFork className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            GitHub Profile
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          My GitHub statistics and activity
        </p>
      </div>

      <div className="p-4">
        {loading && <LoadingSpinner />}

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm p-4 rounded-lg">
            {error}
          </div>
        )}

        {data && !loading && !error && (
          <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 border-2 border-indigo-700 dark:border-indigo-500 rounded-full overflow-hidden relative">
                {data.avatar_url ? (
                  <img
                    src={data.avatar_url}
                    alt={data.name || data.login}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {data.login.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-600 bg-clip-text text-transparent">
                  {data.name || data.login}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{data.login}
                </p>
                {data.bio && (
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">
                    {data.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 px-5 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-indigo-900/10">
                <div className="text-2xl font-bold text-indigo-500 dark:text-indigo-300">
                  {data.public_repos}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Repositories
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-indigo-900/10">
                <div className="text-2xl font-bold text-indigo-800 dark:text-indigo-400">
                  {data.followers}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Followers
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-indigo-900/10">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                  {data.following}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Following
                </div>
              </div>
            </div>

            {/* Profile Link */}
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-7 flex items-center justify-center gap-2 text-md text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              View Profile <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCard;
