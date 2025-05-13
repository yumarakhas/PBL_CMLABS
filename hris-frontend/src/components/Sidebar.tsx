'use client';
import React, { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  MdOutlineSpaceDashboard,
  MdGroups,
  MdAccessTime,
  MdAssignment,
  MdCalendarToday,
} from 'react-icons/md';

type SidebarIconProps = {
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
};

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`group p-3 rounded-md w-full transition-colors flex justify-center ${
      active
        ? 'bg-[#1C3D5A] text-white'
        : 'text-gray-700 hover:bg-[#1C3D5A] hover:text-white'
    }`}
  >
    <div className="text-2xl">{icon}</div>
  </button>
);

const menuItems: { icon: ReactNode; path: string }[] = [
  // { icon: <MdOutlineSpaceDashboard />, path: '/dashboard/dashboard' },
  { icon: <MdOutlineSpaceDashboard />, path: '/dashboard/admin' },
  { icon: <MdOutlineSpaceDashboard />, path: '/dashboard/user' },
  { icon: <MdGroups />, path: '/dashboard/employee-database' },
  { icon: <MdAccessTime />, path: '/dashboard/checkclock' },
  { icon: <MdAssignment />, path: '/dashboard/letter-management' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-16 h-screen sticky top-0 bg-white flex flex-col items-center py-4 gap-6 shadow-md">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-6 h-auto" />

      {/* Menu Items */}
      <div className="flex flex-col items-center gap-2 mt-4 w-full">
        {menuItems.map(({ icon, path }) => {
          const active =
            pathname === path || pathname.startsWith(path + '/');
          return (
            <SidebarIcon
              key={path}
              icon={icon}
              active={active}
              onClick={() => router.push(path)}
            />
          );
        })}
      </div>
    </aside>
  );
}
