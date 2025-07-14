// src/layout/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 bg-gray-50 flex-1">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
