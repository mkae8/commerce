export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="grid grid-cols-3 gap-1">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};
