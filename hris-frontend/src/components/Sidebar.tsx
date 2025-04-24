import {
  MdOutlineSpaceDashboard,
  MdGroups,
  MdAccessTime,
  MdAssignment,
  MdCalendarToday,
} from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="w-16 h-screen bg-white flex flex-col items-center py-4 gap-6 shadow-md">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-6 h-auto" />

      {/* Menu Items */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <SidebarIcon icon={<MdOutlineSpaceDashboard />} active />
        <SidebarIcon icon={<MdGroups />} />
        <SidebarIcon icon={<MdAccessTime />} />
        <SidebarIcon icon={<MdAssignment />} />
        <SidebarIcon icon={<MdCalendarToday />} />
      </div>
    </div>
  );
}

function SidebarIcon({ icon, active = false }) {
  return (
    <div className="group p-3 rounded-md cursor-pointer transition hover:bg-[#1C3D5A]">
      <div className="text-2xl text-gray-700 group-hover:text-white">
        {icon}
      </div>
    </div>
  );
}
