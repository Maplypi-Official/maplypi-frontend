import React from 'react';
import './Crown.css';

const Crown: React.FC<{ logoUrl: string }> = ({ logoUrl }) => (
  <div className="dashboard-crown">
    <div className="logo-outer-circle">
      <div className="logo-inner-circle">
        <img src={logoUrl} alt="Logo" className="central-logo" />
      </div>
    </div>
  </div>
);
export default Crown;
