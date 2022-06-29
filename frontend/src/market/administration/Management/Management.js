import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ManagementRouter } from './ManagementRouter';
import { Navbar } from './Navbar/Navbar';

export const Management = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <ManagementRouter />
      </Router>
    </div>
  );
};
