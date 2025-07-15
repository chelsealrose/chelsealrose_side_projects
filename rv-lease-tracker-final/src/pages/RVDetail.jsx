import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ClientManager from '../components/ClientManager';
import { getClients, saveClients } from "../data/clients";


const LOCAL_STORAGE_KEY = 'rv_list';

function loadRvs() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export default function RVDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rvNameParam = searchParams.get('name');

  const [rvs, setRvs] = useState(loadRvs);
  const [rv, setRv] = useState(null);

  const [newLease, setNewLease] = useState({ client: '', start: '', end: '' });
  const [newMaint, setNewMaint] = useState({ date: '', details: '', nextDue: '' });

  const [editingLeaseIndex, setEditingLeaseIndex] = useState(null);
  const [editingLeaseData, setEditingLeaseData] = useState(null);

  const [editingMaintIndex, setEditingMaintIndex] = useState(null);
  const [editingMaintData, setEditingMaintData] = useState(null);

  const [showPastLeases, setShowPastLeases] = useState(false);
  const [showPastMaintenance, setShowPastMaintenance] = useState(false);

  useEffect(() => {
    if (!rvNameParam) return;
    const found = rvs.find(item => item.name === rvNameParam);
    if (found) setRv(found);
    else {
      setRv({
        id: Date.now(),
        name: rvNameParam,
        color: '#888888',
        leasePeriods: [],
        maintenance: [],
      });
    }
  }, [rvNameParam, rvs]);

  const saveRv = (updatedRv) => {
    setRv(updatedRv);
    setRvs(prev => {
      const exists = prev.find(r => r.name === updatedRv.name);
      let updatedList;
      if (exists) {
        updatedList = prev.map(r => r.name === updatedRv.name ? updatedRv : r);
      } else {
        updatedList = [...prev, updatedRv];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleLeaseChange = (e) => {
    const { name, value } = e.target;
    if (editingLeaseIndex !== null) {
      setEditingLeaseData(prev => ({ ...prev, [name]: value }));
    } else {
      setNewLease(prev => ({ ...prev, [name]: value }));
    }
  };

  const addOrUpdateLease = () => {
if (editingLeaseIndex === null && (!newLease.client || !newLease.start || !newLease.end)) {
    return alert('Fill all lease fields');
  }

  const leaseToSave = editingLeaseIndex !== null ? editingLeaseData : newLease;

  // Save lease to RV
  const updatedLeases = [...(rv.leasePeriods || [])];
  if (editingLeaseIndex !== null) {
    updatedLeases[editingLeaseIndex] = leaseToSave;
  } else {
    updatedLeases.push(leaseToSave);
  }
  const updatedRv = { ...rv, leasePeriods: updatedLeases };
  saveRv(updatedRv);

  // Reset state
  setEditingLeaseIndex(null);
  setEditingLeaseData(null);
  setNewLease({ client: '', start: '', end: '' });

  // ✅ Sync with client list
  const clients = getClients();
  const exists = clients.some(c => c.name === leaseToSave.client);
  if (!exists && leaseToSave.client) {
    const newClient = {
      name: leaseToSave.client,
      contact: '',
      notes: '',
      documents: [],
    };
    saveClients([...clients, newClient]);
  }
};


  const editLease = (index) => {
    setEditingLeaseIndex(index);
    setEditingLeaseData({ ...rv.leasePeriods[index] });
  };

  const deleteLease = (index) => {
    if (!window.confirm('Delete this lease?')) return;
    const updatedLeases = [...(rv.leasePeriods || [])];
    updatedLeases.splice(index, 1);
    saveRv({ ...rv, leasePeriods: updatedLeases });
  };

  const handleMaintChange = (e) => {
    const { name, value } = e.target;
    if (editingMaintIndex !== null) {
      setEditingMaintData(prev => ({ ...prev, [name]: value }));
    } else {
      setNewMaint(prev => ({ ...prev, [name]: value }));
    }
  };

  const addOrUpdateMaint = () => {
    if (editingMaintIndex !== null) {
      const updatedMaint = [...(rv.maintenance || [])];
      updatedMaint[editingMaintIndex] = editingMaintData;
      saveRv({ ...rv, maintenance: updatedMaint });
      setEditingMaintIndex(null);
      setEditingMaintData(null);
    } else {
      if (!newMaint.date || !newMaint.details) return alert('Fill all maintenance fields except Next Due which is optional');
      saveRv({ ...rv, maintenance: [...(rv.maintenance || []), newMaint] });
      setNewMaint({ date: '', details: '', nextDue: '' });
    }
  };

  const editMaint = (index) => {
    setEditingMaintIndex(index);
    setEditingMaintData({ ...rv.maintenance[index] });
  };

  const deleteMaint = (index) => {
    if (!window.confirm('Delete this maintenance record?')) return;
    const updatedMaint = [...(rv.maintenance || [])];
    updatedMaint.splice(index, 1);
    saveRv({ ...rv, maintenance: updatedMaint });
  };
  const handleClientClick = (clientName) => {
  const clients = getClients();
  const exists = clients.some(c => c.name === clientName);
  if (!exists) {
    const newClient = {
      name: clientName,
      contact: '',
      notes: '',
      documents: []
    };
    saveClients([...clients, newClient]);
  }
  navigate(`/client/${encodeURIComponent(clientName)}`);
};


  if (!rv) return <div className="p-4">Loading...</div>;

  const currentDate = new Date();

  const currentLeases = (rv.leasePeriods || []).filter(
    lease => new Date(lease.end) >= currentDate
  );
  const pastLeases = (rv.leasePeriods || []).filter(
    lease => new Date(lease.end) < currentDate
  );

  const currentMaint = (rv.maintenance || []).filter(
    m => !m.nextDue || new Date(m.nextDue) >= currentDate
  );
  const pastMaint = (rv.maintenance || []).filter(
    m => m.nextDue && new Date(m.nextDue) < currentDate
  );

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
        {currentLeases.length === 0 && (
          <p className="italic text-gray-500 mb-4">No current leases</p>
        )}
        <ul className="mb-4 space-y-2">
  {rv.leasePeriods
    .map((lease, realIndex) => ({ lease, realIndex }))
    .filter(({ lease }) => new Date(lease.end) >= new Date()) // only current and future
    .map(({ lease, realIndex }) => (
      <li key={realIndex} className="border p-3 rounded bg-gray-100 flex justify-between items-center">
        {editingLeaseIndex === realIndex ? (
          <div className="flex gap-2 flex-wrap items-center w-full">
            <input
              type="text"
              name="client"
              value={editingLeaseData.client}
              onChange={handleLeaseChange}
              placeholder="Client Name"
              className="border p-1 rounded flex-grow min-w-[120px]"
            />
            <input
              type="date"
              name="start"
              value={editingLeaseData.start}
              onChange={handleLeaseChange}
              className="border p-1 rounded"
            />
            <input
              type="date"
              name="end"
              value={editingLeaseData.end}
              onChange={handleLeaseChange}
              className="border p-1 rounded"
            />
            <button
              onClick={addOrUpdateLease}
              className="bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingLeaseIndex(null);
                setEditingLeaseData(null);
              }}
              className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span>
              <strong>{lease.client}</strong>: {lease.start} to {lease.end}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => editLease(realIndex)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLease(realIndex)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    ))}
</ul>


        {pastLeases.length > 0 && (
          <div className="mt-2">
            <button onClick={() => setShowPastLeases(p => !p)} className="text-sm text-blue-600 hover:underline">
              {showPastLeases ? 'Hide Past Leases' : 'Show Past Leases'}
            </button>
            {showPastLeases && (
              <ul className="mt-2 space-y-2">
                {pastLeases.map((lease, i) => (
                  <li key={`past-${i}`} className="border p-3 rounded bg-gray-50 text-sm flex justify-between">
<span>
  <strong>
    <a href={`/client/${encodeURIComponent(lease.client)}`} className="text-blue-600 underline hover:text-blue-800">
      {lease.client}
    </a>
  </strong>: {lease.start} to {lease.end}
</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Add New Lease */}
        {editingLeaseIndex === null && (
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Add New Lease</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <input type="text" name="client" placeholder="Client Name" value={newLease.client} onChange={handleLeaseChange} className="border p-2 rounded flex-grow min-w-[140px]" />
              <input type="date" name="start" value={newLease.start} onChange={handleLeaseChange} className="border p-2 rounded" />
              <input type="date" name="end" value={newLease.end} onChange={handleLeaseChange} className="border p-2 rounded" />
              <button onClick={addOrUpdateLease} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Lease</button>
            </div>
          </div>
        )}
      </section>

      {/* Maintenance Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Maintenance Records</h2>
        {currentMaint.length === 0 && (
          <p className="italic text-gray-500 mb-4">No current maintenance records</p>
        )}
        <ul className="mb-4 space-y-2">
          {currentMaint.map((m, i) => (
            <li key={i} className="border p-3 rounded bg-gray-100 flex justify-between items-center">
              {editingMaintIndex === i ? (
                <div className="flex gap-2 flex-wrap items-center w-full">
                  <input type="date" name="date" value={editingMaintData.date} onChange={handleMaintChange} className="border p-1 rounded" />
                  <input type="text" name="details" value={editingMaintData.details} onChange={handleMaintChange} placeholder="Details" className="border p-1 rounded flex-grow min-w-[150px]" />
                  <input type="date" name="nextDue" value={editingMaintData.nextDue || ''} onChange={handleMaintChange} className="border p-1 rounded" />
                  <button onClick={addOrUpdateMaint} className="bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700">Save</button>
                  <button onClick={() => { setEditingMaintIndex(null); setEditingMaintData(null); }} className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                </div>
              ) : (
                <>
                  <span>{m.date} — {m.details} {m.nextDue ? `(Next Due: ${m.nextDue})` : ''}</span>
                  <div className="flex gap-2">
                    <button onClick={() => editMaint(i)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deleteMaint(i)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {pastMaint.length > 0 && (
          <div className="mt-2">
            <button onClick={() => setShowPastMaintenance(p => !p)} className="text-sm text-blue-600 hover:underline">
              {showPastMaintenance ? 'Hide Past Maintenance' : 'Show Past Maintenance'}
            </button>
            {showPastMaintenance && (
              <ul className="mt-2 space-y-2">
                {pastMaint.map((m, i) => (
                  <li key={`past-maint-${i}`} className="border p-3 rounded bg-gray-50 text-sm flex justify-between">
                    <span>{m.date} — {m.details} {m.nextDue ? `(Next Due: ${m.nextDue})` : ''}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {editingMaintIndex === null && (
          <div className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Add Maintenance Record</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <input type="date" name="date" value={newMaint.date} onChange={handleMaintChange} className="border p-2 rounded" />
              <input type="text" name="details" placeholder="Details" value={newMaint.details} onChange={handleMaintChange} className="border p-2 rounded flex-grow min-w-[150px]" />
              <input type="date" name="nextDue" value={newMaint.nextDue} onChange={handleMaintChange} className="border p-2 rounded" />
              <button onClick={addOrUpdateMaint} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Maintenance</button>
            </div>
          </div>
        )}

        {nextDue && (
          <p className="mt-4 italic text-sm text-red-600">
            Next Maintenance Due: {nextDue}
          </p>
        )}
      </section>
    </div>
  );
}
