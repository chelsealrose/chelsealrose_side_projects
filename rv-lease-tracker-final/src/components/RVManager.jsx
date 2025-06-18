import React, { useState } from 'react';
import { rvs as initialRvs } from '../data/rvs';
import RVDetail from './RVDetail';
import { useParams } from 'react-router-dom';

export default function RVManager() {
  const [rvs, setRvs] = useState(initialRvs);

  const updateRV = (id, updatedData) => {
    setRvs(prev =>
      prev.map(rv => (rv.id === id ? { ...rv, ...updatedData } : rv))
    );
  };

  // For demo: pick id from URL params or elsewhere
  const { id } = useParams();
  const rvId = Number(id);
  const rv = rvs.find(r => r.id === rvId) || rvs[0];

  return (
    <div>
      <RVDetail rv={rv} updateRV={updateRV} />
      {/* Render your calendar here with updated rvs */}
    </div>
  );
}

