import React from 'react';
import { InputGroup, Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaginationControl from './PaginationControl';
import '../App.css';

const Header = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  getSortOrderLabel,
  currentPage,
  totalPages,
  handlePageChange,
  title = 'Todos os Itens', // Título padrão
  addButtonText = 'Adicionar Item', // Texto do botão padrão
  onAddButtonClick, // Função personalizada para o clique do botão
}) => {
  const navigate = useNavigate();

  /*const handleAddItemClick = () => {
    if (onAddButtonClick) {
      onAddButtonClick();
    } else {
      navigate('/single-edital'); // Rota padrão caso não seja passado um handler
    }
  };*/

  return (
    <div className="header d-flex justify-content-between align-items-center px-3">
      {/* Título dinâmico */}
      <h1 className="header-title mb-0">
        <i className="fas fa-list header-icon me-2" />
        {title}
      </h1>

      {/* Controles alinhados à direita */}
      <div className="header-controls d-flex align-items-center gap-3">
        {/* Barra de pesquisa */}
        <InputGroup className="search-bar">
          <InputGroup.Text className="search-icon">
            <i className="fas fa-search" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {/* Paginação */}
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        {/* Dropdown de filtro */}
        <DropdownButton
          id="dropdown-basic-button"
          title={getSortOrderLabel()}
          variant="outline-secondary"
          onSelect={(eventKey) => setSortOrder(eventKey)}
          className="filter-dropdown"
        >
          <Dropdown.Item eventKey="asc">Ordem Alfabética (A-Z)</Dropdown.Item>
          <Dropdown.Item eventKey="desc">Ordem Alfabética (Z-A)</Dropdown.Item>
        </DropdownButton>

        {/* Botão dinâmico de adicionar item */}
        <Button
          variant="primary"
          className="add-item-btn"
          onClick={onAddButtonClick}
        >
          {addButtonText} <i className="fas fa-plus ms-2" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
