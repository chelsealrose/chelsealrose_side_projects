import React, { useState, useEffect } from 'react';
import { getClients } from '../data/clients';
import { useNavigate } from 'react-router-dom';

export default function ClientDirectoryPage() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setClients(getClients());
  }, []);

  const filtered = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Client Directory</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back
        </button>
      </div>

      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <ul className="space-y-2">
        {filtered.map((client, idx) => (
          <li key={idx} className="border p-3 bg-gray-50 rounded hover:bg-gray-100 flex justify-between">
            <span>{client.name}</span>
            <button
              onClick={() => navigate(`/client/${encodeURIComponent(client.name)}`)}
              className="text-blue-600 hover:underline"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
