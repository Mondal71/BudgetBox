// src/components/Topbar.jsx
const Topbar = () => {
  return (
    <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-semibold text-[#66b2a3]">Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* Placeholder for avatar and theme */}
        <button className="text-gray-500 hover:text-[#66b2a3]">🌓</button>
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=User"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
