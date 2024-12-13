import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
import { getItems, addItem } from '../services/api';
import ItemList from '../components/ItemList';
import '../App.css'; // Certifique-se de que o caminho para o arquivo CSS está correto
import Sidebar from '../components/sideBar'; // Certifique-se de que o caminho está correto


const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchItems(currentPage, searchTerm, sortOrder);
  }, [currentPage, searchTerm, sortOrder]);

  const fetchItems = async (page, search, sort) => {
    try {
      const { data } = await getItems(page, 11, search, sort);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      await addItem(newItem);
      fetchItems(currentPage, searchTerm, sortOrder);
      setNewItem({ name: '', description: '' });
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

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

  // Lógica para exibir no máximo 3 páginas visíveis
  const getVisiblePages = () => {
    let pages = [];
    if (currentPage === 1) {
      pages = [1, 2, 3];
    } else if (currentPage === totalPages) {
      pages = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return pages.filter((page) => page > 0 && page <= totalPages);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '3rem' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="d-flex align-items-center" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
            <i className="fas fa-list me-2" style={{ fontSize: '24px', color: '#333' }} /> {/* Ícone de lista */}
            Todos os Itens
          </h1>
          <div
            className="d-flex align-items-center mb-4"
            style={{
              gap: '1rem',
              fontSize: '16px', // Tamanho da fonte
              color: '#333', // Cor do texto
              height: '40px', // Altura consistente para os elementos
            }}
          >
            {/* Barra de pesquisa */}
            <InputGroup style={{ maxWidth: '250px', flexShrink: 0, height: '100%' }}>
              <InputGroup.Text>
                <i className="fas fa-search" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '16px', height: '100%' }} // Fonte e altura consistentes
              />
            </InputGroup>
  
            {/* Paginação */}
            <Pagination
              className="custom-pagination"
              style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px', // Espaçamento entre os itens
              }}
            >
              {/* Botão de página anterior */}
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0 12px',
                }}
              >
                &lt;
              </Pagination.Prev>
  
              {/* Números de página */}
              {[...Array(totalPages).keys()]
                .filter((page) => {
                  const pageIndex = page + 1;
                  // Lógica para exibir 3 páginas
                  if (currentPage === 1) {
                    return pageIndex <= 3; // Primeira página: exibe 1, 2, 3
                  }
                  if (currentPage === totalPages) {
                    return pageIndex >= totalPages - 2; // Última página: exibe antepenúltima, penúltima e última
                  }
                  return (
                    pageIndex === currentPage || // Página atual
                    pageIndex === currentPage - 1 || // Página anterior
                    pageIndex === currentPage + 1 // Próxima página
                  );
                })
                .map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                    style={{
                      backgroundColor: page + 1 === currentPage ? '#fff' : 'transparent', // Fundo ativo e inativo
                      color: '#444', // Cor dos números
                      border: page + 1 === currentPage ? '1px solid #ddd' : 'none', // Borda do ativo
                      borderRadius: '5px',
                      padding: '0 12px',
                      fontWeight: page + 1 === currentPage ? 'bold' : 'normal', // Negrito para ativo
                    }}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
  
              {/* Botão de próxima página */}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0 12px',
                }}
              >
                &gt;
              </Pagination.Next>
            </Pagination>
  
            {/* Dropdown para seleção de filtro */}
            <DropdownButton
              id="dropdown-basic-button"
              title={getSortOrderLabel()}
              variant="outline-secondary"
              onSelect={(eventKey) => setSortOrder(eventKey)}
              style={{
                fontSize: '16px', // Fonte consistente
                height: '100%', // Altura consistente
                color: '#333', // Cor do texto
              }}
            >
              <Dropdown.Item eventKey="asc">Ordem Alfabética (A-Z)</Dropdown.Item>
              <Dropdown.Item eventKey="desc">Ordem Alfabética (Z-A)</Dropdown.Item>
            </DropdownButton>
  
            {/* Botão de adicionar item */}
            <Button
              variant="primary"
              style={{
                fontSize: '16px', // Fonte consistente
                height: '100%', // Altura consistente
                color: '#fff', // Cor do texto para o botão
                backgroundColor: '#444', // Preto mais claro
                borderColor: '#444', // Borda da mesma cor do botão
              }}
              onClick={() => document.getElementById('add-item-form').scrollIntoView()}
            >
              Adicionar Item <i className="fas fa-plus ml-2" />
            </Button>
          </div>
        </div>
  
        {/* Lista de itens */}
        <ItemList items={items} />
  
        {/* Formulário para adicionar item 
        <div id="add-item-form" className="mt-4">
          <h3>Adicionar Novo Item</h3>
          <Form onSubmit={handleAddItem}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Adicionar Item
            </Button>
          </Form>
        </div>
        */}
  
        {/* Botão para página de listagem 
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/items')}>
          Ver Itens Listados
        </Button>**/}
        </div>
      </div>
  );
};

export default HomePage;
