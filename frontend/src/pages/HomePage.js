import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
import ItemList from '../components/ItemList';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para a barra de pesquisa
  const [sortOrder, setSortOrder] = useState(''); // Estado para o filtro
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas

  // Define o título do botão com base no filtro aplicado
  const getSortOrderLabel = () => {
    switch (sortOrder) {
      case 'asc':
        return 'Ordem Alfabética (A-Z)';
      case 'desc':
        return 'Ordem Alfabética (Z-A)';
      default:
        return 'Selecionar Filtro';
    }
  };

  return (
    <div className="p-4">
      {/* Topo da página */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Todos os Itens</h1>

        {/* Barra de pesquisa e filtro */}
        <div className="d-flex align-items-center">
          <InputGroup style={{ maxWidth: '300px', marginRight: '1rem' }}>
            <InputGroup.Text>
              <i className="fas fa-search" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
            />
          </InputGroup>

          {/* Dropdown para seleção de filtro */}
          <DropdownButton
            id="dropdown-basic-button"
            title={getSortOrderLabel()} // Atualiza o título dinamicamente
            variant="outline-secondary"
            onSelect={(eventKey) => setSortOrder(eventKey)} // Atualiza a ordem de classificação
          >
            <Dropdown.Item eventKey="asc">Ordem Alfabética (A-Z)</Dropdown.Item>
            <Dropdown.Item eventKey="desc">Ordem Alfabética (Z-A)</Dropdown.Item>
          </DropdownButton>

          {/* Botão de adicionar itens */}
          <Button
            variant="outline-secondary" // Mesma cor do filtro
            className="d-flex align-items-center"
            style={{ whiteSpace: 'nowrap', marginLeft: '1rem' }}
            //onClick={() => alert('Adicionar novo item')}
          >
            Adicionar Item <i className="fas fa-plus ml-2" /> {/* Ícone de "+" */}
          </Button>
        </div>
      </div>

      {/* Lista de itens */}
      <ItemList searchTerm={searchTerm} sortOrder={sortOrder} /> {/* Passa os filtros para o ItemList */}

      {/* Botão para página de listagem */}
      <Button variant="secondary" className="mt-4" onClick={() => navigate('/items')}>
        Ver Itens Listados
      </Button>
    </div>
  );
};

export default HomePage;
