import React from 'react';
import { Contact } from '../types';

interface HomeProps {
  contacts?: Contact[];
}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <h1>Danh bạ</h1>
    </div>
  );
};

export default Home;
