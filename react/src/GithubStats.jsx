export default function GithubStats({ user, className }) {

  const stats = [
    { label: 'Repos', value: user.Repos },
    { label: 'Stars', value: user.Stars },
    { label: 'Watchers', value: user.Watchers },
    { label: 'Followers', value: user.Followers },
    { label: 'Following', value: user.Following },
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
