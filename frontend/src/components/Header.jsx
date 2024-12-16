import React from 'react';
import { InputGroup, Form, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import PaginationControl from './PaginationControl';
import '../App.css'; // Certifique-se de importar o CSS global

const Header = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  getSortOrderLabel,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      {/* Título à esquerda */}
      <h1 className="header-title">
        <i className="fas fa-list header-icon" />
        Todos os Itens
      </h1>

      {/* Elementos à direita */}
      <div className="header-controls">
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

        {/* Botão de adicionar item */}
        <Button variant="primary" className="add-item-btn">
          Adicionar Item <i className="fas fa-plus ms-2" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
