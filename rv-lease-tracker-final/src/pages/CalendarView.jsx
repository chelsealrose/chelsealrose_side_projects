import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { parseISO, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import { rvs as initialRvs } from '../data/rvs';

const LOCAL_STORAGE_KEY = 'rv_list';

const MONTHS = [
  { label: 'J', monthIndex: 0 }, { label: 'F', monthIndex: 1 }, { label: 'M', monthIndex: 2 },
  { label: 'A', monthIndex: 3 }, { label: 'M', monthIndex: 4 }, { label: 'J', monthIndex: 5 },
  { label: 'J', monthIndex: 6 }, { label: 'A', monthIndex: 7 }, { label: 'S', monthIndex: 8 },
  { label: 'O', monthIndex: 9 }, { label: 'N', monthIndex: 10 }, { label: 'D', monthIndex: 11 },
];

const loadRvs = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialRvs;
};

export default function CalendarView() {
  const today = new Date();
  const [displayYear, setDisplayYear] = useState(today.getFullYear());

  const [rvs, setRvs] = useState(loadRvs);
  const [editingId, setEditingId] = useState(null);
  const [newRv, setNewRv] = useState({ name: '', color: '#888888' });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rvs));
  }, [rvs]);

  const handleAddRv = () => {
    if (!newRv.name.trim()) return;

    const newId = Math.max(0, ...rvs.map(r => r.id)) + 1;
    const rvToAdd = {
      id: newId,
      name: newRv.name,
      color: newRv.color,
      status: 'Available',
      leasePeriods: [],
      maintenance: [],
    };

    setRvs(prev => [...prev, rvToAdd]);
    setNewRv({ name: '', color: '#888888' });
  };

  const handleDelete = (id) => {
    const rv = rvs.find(r => r.id === id);
    if (window.confirm(`Are you sure you want to delete "${rv.name}"?`)) {
      setRvs(prev => prev.filter(rv => rv.id !== id));
    }
  };

  const handleEditChange = (id, field, value) => {
    setRvs(prev =>
      prev.map(rv =>
        rv.id === id ? { ...rv, [field]: value } : rv
      )
    );
  };

  const isLeasedInMonth = (leasePeriods, monthIndex) => {
    if (!leasePeriods || leasePeriods.length === 0) return false;
    const monthStart = startOfMonth(new Date(displayYear, monthIndex, 1));
    const monthEnd = endOfMonth(monthStart);
    return leasePeriods.some(({ start, end }) => {
      const leaseStart = parseISO(start);
      const leaseEnd = parseISO(end);
      return leaseStart <= monthEnd && leaseEnd >= monthStart;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RV Lease Calendar</h1>

      {/* 🔵 Legend */}
      <div className="mb-4 text-sm text-gray-600 flex gap-6">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div> Leased
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm"></div> Available
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 ring-2 ring-black bg-white rounded-sm"></div> Current Month
        </div>
      </div>

      {/* 📅 Year Selector */}
      <div className="mb-4 flex items-center gap-4">
        <button onClick={() => setDisplayYear(y => y - 1)} className="px-2 py-1 border rounded">
          ← {displayYear - 1}
        </button>
        <span className="font-semibold text-lg">{displayYear}</span>
        <button onClick={() => setDisplayYear(y => y + 1)} className="px-2 py-1 border rounded">
          {displayYear + 1} →
        </button>
      </div>

      {/* ➕ Add New RV Form */}
      <div className="mb-6 p-4 border rounded bg-gray-100">
        <h2 className="text-lg font-semibold mb-2">Add New RV</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="RV Name"
            value={newRv.name}
            onChange={e => setNewRv(prev => ({ ...prev, name: e.target.value }))}
            className="border p-2 rounded w-48"
          />
          <input
            type="color"
            value={newRv.color}
            onChange={e => setNewRv(prev => ({ ...prev, color: e.target.value }))}
            className="w-12 h-10 p-0 border"
          />
          <button
            onClick={handleAddRv}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add RV
          </button>
        </div>
      </div>

      {/* 📊 Calendar Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {rvs.map(rv => (
          <div
            key={rv.id}
            className="group border-4 rounded p-4 shadow hover:shadow-lg"
            style={{ borderColor: rv.color }}
          >
            {editingId === rv.id ? (
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="text"
                  value={rv.name}
                  onChange={(e) => handleEditChange(rv.id, 'name', e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <input
                  type="color"
                  value={rv.color}
                  onChange={(e) => handleEditChange(rv.id, 'color', e.target.value)}
                  className="w-10 h-10 border"
                />
                <button
                  onClick={() => setEditingId(null)}
                  className="text-green-700 font-bold hover:underline"
                >
                  ✅
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <Link to={`/rv/${rv.id}`}>
                  <h2 className="text-lg font-semibold mb-1">{rv.name}</h2>
                  <p className="mb-1">{rv.status}</p>
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(rv.id)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(rv.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}

            <div className="flex space-x-1 mt-2">
              {MONTHS.map(({ label, monthIndex }) => {
                const leased = isLeasedInMonth(rv.leasePeriods, monthIndex);
                const isCurrentMonth = monthIndex === today.getMonth() && displayYear === today.getFullYear();

                return (
                  <div
                    key={monthIndex}
                    className={`w-6 h-6 rounded-sm border text-center ${
                      leased ? 'bg-blue-600 border-blue-600' : 'bg-gray-200 border-gray-300'
                    } ${isCurrentMonth ? 'ring-2 ring-black' : ''}`}
                    title={`${label} - ${leased ? 'Leased' : 'Available'}`}
                  >
                    <span className="text-white text-xs font-bold flex justify-center items-center h-full">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



