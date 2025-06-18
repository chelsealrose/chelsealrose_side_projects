import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

export default function RVDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rvId = Number(id);

  const [rv, setRv] = useState(null);
  const [newLease, setNewLease] = useState({ client: '', startDate: '', endDate: '' });
  const [newMaint, setNewMaint] = useState({ date: '', details: '', nextDue: '' });
  const [showHistory, setShowHistory] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const storedRvs = JSON.parse(localStorage.getItem('rvs')) || [];
    const found = storedRvs.find(r => r.id === rvId);
    setRv(found || null);
  }, [rvId]);

  // Save RV to localStorage
  const saveRv = (updatedRv) => {
    const storedRvs = JSON.parse(localStorage.getItem('rvs')) || [];
    const updated = storedRvs.map(r => r.id === rvId ? updatedRv : r);
    localStorage.setItem('rvs', JSON.stringify(updated));
    setRv(updatedRv);
  };

  if (!rv) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">RV Not Found</h1>
        <p>No RV with id "{id}" was found.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Back to Calendar</button>
      </div>
    );
  }

  const handleLeaseChange = (e) => {
    const { name, value } = e.target;
    setNewLease(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLease = () => {
    if (!newLease.client || !newLease.startDate || !newLease.endDate) return;
    const updated = {
      ...rv,
      leasePeriods: [...(rv.leasePeriods || []), newLease],
    };
    saveRv(updated);
    setNewLease({ client: '', startDate: '', endDate: '' });
  };

  const filteredLeases = (rv.leasePeriods || []).filter(l =>
    new Date(l.endDate) >= new Date()
  );

  const pastLeases = (rv.leasePeriods || []).filter(l =>
    new Date(l.endDate) < new Date()
  );

  const addMaintenance = () => {
    if (!newMaint.date || !newMaint.details) return;
    const updated = {
      ...rv,
      maintenance: [...(rv.maintenance || []), newMaint],
    };
    saveRv(updated);
    setNewMaint({ date: '', details: '', nextDue: '' });
  };

  // Get the next due maintenance date
  const nextDue = rv.maintenance?.reduce((next, m) => {
    if (!m.nextDue) return next;
    const date = new Date(m.nextDue);
    return (!next || date < new Date(next)) ? m.nextDue : next;
  }, null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{rv.name}</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back to Calendar
        </button>
      </div>

      {/* Lease Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Lease Information</h2>

        {/* Upcoming leases */}
        {filteredLeases.length > 0 ? (
          <ul className="mb-4 space-y-2">
            {filteredLeases.map((lease, i) => (
              <li key={i} className="border p-3 rounded bg-gray-100">
                <div><strong>Client:</strong> {lease.client}</div>
                <div><strong>Start:</strong> {lease.startDate}</div>
                <div><strong>End:</strong> {lease.endDate}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500 mb-4">No upcoming or current leases</p>
        )}

        {/* New lease form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="client"
            placeholder="Client Name"
            value={newLease.client}
            onChange={handleLeaseChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="startDate"
            value={newLease.startDate}
            onChange={handleLeaseChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="endDate"
            value={newLease.endDate}
            onChange={handleLeaseChange}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleAddLease}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Lease
        </button>

        <button
          onClick={() => setShowHistory(prev => !prev)}
          className="mt-3 ml-4 text-sm text-blue-600 hover:underline"
        >
          {showHistory ? 'Hide Past Leases' : 'Show Past Leases'}
        </button>

        {showHistory && (
          <ul className="mt-2 space-y-2">
            {pastLeases.map((lease, i) => (
              <li key={i} className="border p-3 rounded bg-gray-50 text-sm">
                <div><strong>Client:</strong> {lease.client}</div>
                <div><strong>Start:</strong> {lease.startDate}</div>
                <div><strong>End:</strong> {lease.endDate}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Maintenance Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Maintenance Records</h2>
        {nextDue && (
          <div className="mb-4 text-green-700 font-medium">
            ✅ Next maintenance due: <strong>{nextDue}</strong>
          </div>
        )}
        <table className="w-full text-left border-collapse mb-4">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Details</th>
              <th className="py-2 px-3">Next Due</th>
            </tr>
          </thead>
          <tbody>
            {(!rv.maintenance || rv.maintenance.length === 0) && (
              <tr>
                <td colSpan="3" className="text-center py-4 italic text-gray-500">
                  No maintenance records
                </td>
              </tr>
            )}
            {rv.maintenance?.map((m, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-3">{m.date}</td>
                <td className="py-2 px-3">{m.details}</td>
                <td className="py-2 px-3">{m.nextDue || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            placeholder="Date"
            value={newMaint.date}
            onChange={e => setNewMaint(prev => ({ ...prev, date: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Details"
            value={newMaint.details}
            onChange={e => setNewMaint(prev => ({ ...prev, details: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            type="date"
            placeholder="Next Due"
            value={newMaint.nextDue}
            onChange={e => setNewMaint(prev => ({ ...prev, nextDue: e.target.value }))}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={addMaintenance}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Maintenance
        </button>
      </section>
    </div>
  );
}






