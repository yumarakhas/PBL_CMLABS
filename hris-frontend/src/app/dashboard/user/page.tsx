'use client';

import { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { FaCircle } from 'react-icons/fa';
import { usePageTitle } from '@/context/PageTitleContext';

const attendanceData = [
  { name: 'On time', value: 289, color: '#14532D' },
  { name: 'Late', value: 89, color: '#A16207' },
  { name: 'Absent', value: 23, color: '#991B1B' },
];

const workHoursData = [
  { date: 'March 20', hours: 30 },
  { date: 'March 21', hours: 45 },
  { date: 'March 22', hours: 60 },
  { date: 'March 23', hours: 30 },
  { date: 'March 24', hours: 45 },
  { date: 'March 25', hours: 50 },
  { date: 'March 26', hours: 30 },
];

export default function UserDashboard() {
  const { setTitle } = usePageTitle();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [viewMode, setViewMode] = useState('Week');

  setTitle('Dashboard');

  const handleRequestLeave = () => alert('Request leave berhasil!');
  const handleSeeDetail = () => alert('Menampilkan detail cuti...');
  const handleViewChange = () => setViewMode(viewMode === 'Week' ? 'Month' : 'Week');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Bar atas */}
      <div className="flex justify-between items-center mb-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Choose the date</option>
          <option value="2025-03-01">March 1, 2025</option>
          <option value="2025-03-15">March 15, 2025</option>
          <option value="2025-03-30">March 30, 2025</option>
        </select>
      </div>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Week Hours</p>
          <p className="text-xl font-bold">120h 54m</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">On Time</p>
          <p className="text-xl font-bold">20</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Late</p>
          <p className="text-xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-600">Absent</p>
          <p className="text-xl font-bold">10</p>
        </div>
      </div>

      {/* Attendance Summary dan Leave Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Attendance Summary */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-md">Attendance Summary</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1 border rounded bg-red-600 text-white"
            >
              <option value="March">March</option>
              <option value="April">April</option>
            </select>
          </div>
          <div className="flex items-center">
            <PieChart width={130} height={130}>
              <Pie
                data={attendanceData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="ml-6 space-y-2 text-sm">
              {attendanceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <FaCircle size={10} color={item.color} />
                  <span>{item.name}</span>
                  <span className="ml-2 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="bg-white p-4 rounded shadow flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-md">Leave Summary</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1 border rounded bg-red-600 text-white"
            >
              <option value="March">March</option>
              <option value="April">April</option>
            </select>
          </div>

          <div className="border p-3 rounded-md">
            <p className="text-sm text-gray-600">Total Quota Annual Leave</p>
            <p className="text-xl font-bold">12 Days</p>
            <button
              onClick={handleRequestLeave}
              className="text-blue-600 text-sm mt-1 hover:underline"
            >
              Request Leave →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border p-3 rounded-md">
              <p className="text-sm text-gray-600">Taken</p>
              <p className="text-lg font-bold">4 Days</p>
              <button
                onClick={handleSeeDetail}
                className="text-blue-600 text-sm mt-1 hover:underline"
              >
                See Detail →
              </button>
            </div>
            <div className="border p-3 rounded-md">
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-lg font-bold">6 Days</p>
              <button
                onClick={handleRequestLeave}
                className="text-blue-600 text-sm mt-1 hover:underline"
              >
                Request Leave →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik Jam Kerja */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-md">Your Work Hours</h2>
          <button
            onClick={handleViewChange}
            className="px-3 py-1 bg-red-600 rounded text-white"
          >
            View by {viewMode === 'Week' ? 'Month' : 'Week'}
          </button>
        </div>
        <p className="text-lg font-bold mb-4">120h 54m</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={workHoursData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#1C3D5A" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
