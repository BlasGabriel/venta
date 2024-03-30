import React from 'react';

const Titulo = ({ titulo }) => {
  return (
    <h1 style={{ textAlign: 'center', fontSize: '24px', color: '#333' }}>
      {titulo}
    </h1>
  );
};

export default Titulo;
