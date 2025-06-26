import React, { useState, useEffect } from "react";

const CLIENT_STORAGE_KEY = "client_profiles";

export default function ClientManager({ selectedClientName }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(CLIENT_STORAGE_KEY);
    const loaded = saved ? JSON.parse(saved) : [];
    setClients(loaded);

    if (selectedClientName) {
      const match = loaded.find(c => c.name === selectedClientName);
      if (match) setSelectedClient(match);
    }
  }, [selectedClientName]);

  const saveClients = (updated) => {
    setClients(updated);
    localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedClient(prev => ({
        ...prev,
        documents: [...(prev.documents || []), { name: file.name, data: reader.result }],
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const existingIndex = clients.findIndex(c => c.name === selectedClient.name);
    let updated;
    if (existingIndex !== -1) {
      updated = clients.map((c, i) => (i === existingIndex ? selectedClient : c));
    } else {
      updated = [...clients, selectedClient];
    }
    saveClients(updated);
    alert("Client profile saved.");
  };

  if (!selectedClient) return <div className="text-gray-500 italic">No client selected.</div>;

  return (
    <div className="border rounded p-4 bg-white shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Client Profile</h2>
      <div className="mb-2">
        <label className="block text-sm">Name</label>
        <input type="text" name="name" value={selectedClient.name} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Phone</label>
        <input type="tel" name="phone" value={selectedClient.phone || ""} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Email</label>
        <input type="email" name="email" value={selectedClient.email || ""} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Notes</label>
        <textarea name="notes" value={selectedClient.notes || ""} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Upload Documents</label>
        <input type="file" onChange={handleFileUpload} />
        <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
          {(selectedClient.documents || []).map((doc, i) => (
            <li key={i}>{doc.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Profile</button>
    </div>
  );
}
