import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'client_profiles';

function loadClients() {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export default function ClientProfile() {
  const [clients, setClients] = useState(loadClients);
  const [client, setClient] = useState(null);
  const [searchParams] = useSearchParams();
  const { name: nameFromPath } = useParams(); // for /client/:name
  const navigate = useNavigate();

  const name = nameFromPath || searchParams.get('name');

  useEffect(() => {
    const found = clients.find(c => c.name === name);
    if (found) {
      setClient(found);
    } else {
      setClient(undefined); // explicitly set to undefined so we can show a "not found" message
    }
  }, [clients, name]);

  if (client === null) {
    return <div className="p-4 text-gray-600">Loading client...</div>;
  }

  if (client === undefined) {
    return (
      <div className="p-4 text-red-600">
        Client "{name}" not found.
        <button
          className="ml-4 text-blue-600 underline"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back
        </button>
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
        <p><strong>Email:</strong> {client.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {client.phone || 'N/A'}</p>
        <p><strong>Notes:</strong> {client.notes || 'N/A'}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Documents</h2>
        {client.documents && client.documents.length > 0 ? (
          <ul className="list-disc ml-6">
            {client.documents.map((doc, i) => (
              <li key={i}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No documents uploaded.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Lease Info</h2>
        {client.leases && client.leases.length > 0 ? (
          <ul className="list-disc ml-6">
            {client.leases.map((lease, i) => (
              <li key={i}>
                <strong>{lease.rv}</strong>: {lease.start} → {lease.end}
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No lease history.</p>
        )}
      </section>
    </div>
  );
}


