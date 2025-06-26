import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    if (rvs.some(rv => rv.name.toLowerCase() === newRv.name.toLowerCase())) {
      alert('RV name must be unique');
      return;
    }
    const newId = Math.max(0, ...rvs.map(r => r.id)) + 1;
    const rvToAdd = {
      id: newId,
      name: newRv.name.trim(),
      color: newRv.color,
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

  const updateRV = (name, updatedFields) => {
    setRvs(prev =>
      prev.map(rv =>
        rv.name === name ? { ...rv, ...updatedFields } : rv
      )
    );
  };

  const getColorForLease = (leaseIndex) => {
    const colors = ['bg-blue-600', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
    return colors[leaseIndex % colors.length];
  };

  const getLeaseColorForMonth = (leasePeriods, monthIndex) => {
    if (!leasePeriods || leasePeriods.length === 0) return null;

    const monthStart = startOfMonth(new Date(displayYear, monthIndex));
    const monthEnd = endOfMonth(monthStart);

    for (let i = 0; i < leasePeriods.length; i++) {
      const { start, end } = leasePeriods[i];
      if (!start || !end) continue;

      const leaseStart = parseISO(start);
      const leaseEnd = parseISO(end);

      // Check if lease period overlaps the month
      if (leaseStart <= monthEnd && leaseEnd >= monthStart) {
        return getColorForLease(i);
      }
    }
    return null;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RV Lease Calendar</h1>

      {/* Legend */}
      <div className="mb-4 text-sm text-gray-600 flex gap-6">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div> Lease 1
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div> Lease 2
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-purple-500 rounded-sm"></div> Lease 3
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm"></div> Available
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 ring-2 ring-black bg-white rounded-sm"></div> Current Month
        </div>
      </div>

      {/* Year Selector */}
      <div className="mb-4 flex items-center gap-4">
        <button onClick={() => setDisplayYear(y => y - 1)} className="px-2 py-1 border rounded">
          ← {displayYear - 1}
        </button>
        <span className="font-semibold text-lg">{displayYear}</span>
        <button onClick={() => setDisplayYear(y => y + 1)} className="px-2 py-1 border rounded">
          {displayYear + 1} →
        </button>
      </div>
<button
  onClick={() => navigate("/client/")}
  className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
>
  🔍 View Clients
</button>

      {/* Add RV */}
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

      {/* RV Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {rvs.map(rv => {
          const leaseColorThisMonth = getLeaseColorForMonth(rv.leasePeriods, today.getMonth());
          const isCurrentMonth = displayYear === today.getFullYear();

          return (
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
                  <Link to={`/rv?name=${encodeURIComponent(rv.name)}`}>
                    <h2 className="text-lg font-semibold mb-1">{rv.name}</h2>
                    <p className="mb-1">
                      {leaseColorThisMonth && isCurrentMonth ? 'Leased' : 'Available'}
                    </p>
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

              {/* Lease Bar */}
              <div className="flex space-x-1 mt-2">
                {MONTHS.map(({ label, monthIndex }) => {
                  const leaseColor = getLeaseColorForMonth(rv.leasePeriods, monthIndex);
                  const isCurrent = monthIndex === today.getMonth() && displayYear === today.getFullYear();

                  return (
                    <div
                      key={monthIndex}
                      className={`w-6 h-6 rounded-sm border text-center cursor-default ${
                        leaseColor
                          ? leaseColor + ' border-transparent text-white'
                          : 'bg-gray-200 border-gray-300 text-black'
                      } ${isCurrent ? 'ring-2 ring-black' : ''}`}
                      title={`${label} - ${leaseColor ? 'Leased' : 'Available'}`}
                    >
                      <span className="text-xs font-bold flex justify-center items-center h-full">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}






