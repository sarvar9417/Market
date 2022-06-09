import React from 'react';
import { TableHead } from './Invertories/TableHead';
import { TableHeader } from './Invertories/TableHeader';

export const Inventories = () => {
  return (
    <div className='overflow-x-auto'>
      <div className='m-3 min-w[990px]'>
        <TableHeader />
        <TableHead />
      </div>
    </div>
  );
};
