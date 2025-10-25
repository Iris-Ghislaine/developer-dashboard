const GitHubCard = ({ data, loading, error }) => {
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <img src={data.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
      <h2 className="text-xl font-semibold text-center dark:text-white">{data.login}</h2>
      <p className="text-center text-violet-700">Repositories: {data.public_repos}</p>
      <p className="text-center text-violet-600">Followers: {data.followers}</p>
      <p className="text-center text-violet-500">Following: {data.following}</p>
    </div>
  );
};

export default GitHubCard;