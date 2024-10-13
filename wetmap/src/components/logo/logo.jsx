import React from 'react';
import './logo.css';


export default function Logo(props) {
  const { setShowAdminPortal, showAdminPortal } = props;

  return (
    <h2
      className="text"
      onDoubleClick={() => setShowAdminPortal(!showAdminPortal)}
    >
      Scuba SEAsons
    </h2>
  );
}
