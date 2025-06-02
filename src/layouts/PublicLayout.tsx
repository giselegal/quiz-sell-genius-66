
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9]">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
