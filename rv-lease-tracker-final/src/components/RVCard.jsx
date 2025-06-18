import { Link } from 'react-router-dom';
import React from 'react';


export default function RVCard({ rv }) {
  return (
    <Link to={`/rv/${rv.id}`}>
      <div
        className="border-4 rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
        style={{ borderColor: rv.color }}
      >
        <h2 className="text-xl font-semibold mb-2">{rv.name}</h2>
        {rv.lease && rv.lease.client ? (
          <>
            <p><strong>Leased to:</strong> {rv.lease.client}</p>
            <p>
              <strong>From:</strong> {rv.lease.startDate} <br />
              <strong>To:</strong> {rv.lease.endDate}
            </p>
          </>
        ) : (
          <p className="italic text-gray-500">Available</p>
        )}
      </div>
    </Link>
  );
}
