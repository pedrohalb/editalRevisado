import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ItemList from '../components/ItemList'; // Importa o ItemList

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1>Bem-vindo ao Gerenciador de Itens</h1>

      {/* Inclui o componente ItemList */}
      <ItemList />

      {/* Botão para ir para a página de itens listados */}
      <Button variant="secondary" className="mt-4" onClick={() => navigate('/items')}>
        Excluir Itens 
      </Button>
    </div>
  );
};

export default HomePage;
