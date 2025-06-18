import React, { useState, useEffect } from 'react';
import RVDetail from '../pages/RVDetail';
import { useParams, useSearchParams } from 'react-router-dom';
import { rvs as initialRvs } from '../data/rvs';

export default function RVManager() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get('name');

  const [rvs, setRvs] = useState(() => {
    const stored = localStorage.getItem('rvs');
    return stored ? JSON.parse(stored) : initialRvs;
  });

  // Sync rvs to localStorage when changed
  useEffect(() => {
    localStorage.setItem('rvs', JSON.stringify(rvs));
  }, [rvs]);

  const updateRVs = (updatedList) => {
    setRvs(updatedList);
    localStorage.setItem('rvs', JSON.stringify(updatedList));
  };

  const updateRV = (id, updatedData) => {
    const updatedList = rvs.map(rv => rv.id === id ? { ...rv, ...updatedData } : rv);
    updateRVs(updatedList);
  };

  const addRV = ({ name, id = null }) => {
    const maxId = rvs.reduce((max, rv) => Math.max(max, rv.id), 0);
    const newId = id !== null ? id : maxId + 1;
    const newRV = {
      id: newId,
      name,
      leasePeriods: [],
      maintenance: [],
      color: '#cccccc'
    };
    const updatedList = [...rvs, newRV];
    updateRVs(updatedList);
    return newRV;
  };

  let rv = null;

  if (id) {
    const rvId = Number(id);
    rv = rvs.find(r => r.id === rvId);

    // If ID not found, create new RV with default name based on ID
    if (!rv) {
      rv = addRV({ name: `RV-${rvId}`, id: rvId });
    }
  } else if (nameParam) {
    rv = rvs.find(r => r.name.toLowerCase() === nameParam.toLowerCase());

    // If not found by name, add it
    if (!rv) {
      rv = addRV({ name: nameParam });
    }
  } else {
    // fallback to first RV
    rv = rvs[0] || null;
  }

  if (!rv) {
    return <div className="p-6 text-lg text-gray-700">No RVs available.</div>;
  }

  return (
    <div>
      <RVDetail rv={rv} updateRV={updateRV} />
    </div>
  );
}




