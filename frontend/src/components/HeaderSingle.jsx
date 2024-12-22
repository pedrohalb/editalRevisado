import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PaginationControl from './PaginationControl';
import '../App.css';

const HeaderSingle = ({ title, barraPesquisa, icon, currentPage, totalPages, handlePageChange, showIcon, onAddClick }) => {
  const [status, setStatus] = useState(false);

  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <div className="header-single">
      {/* Linha com Botão de Status e Nome */}
      <div className="header-single-top">
        {/* Status */}
        <div className="header-single-status">
          <label className="header-single-label">Status</label>
          <button
            className={`status-toggle ${status ? 'active' : ''}`}
            onClick={toggleStatus}
          ></button>
        </div>

        {/* Nome do Edital */}
        <div className="header-single-name">
          <label className="header-single-label">{barraPesquisa}</label>
          <input type="text" placeholder="Nome" />
        </div>
      </div>

      {/* Título, Paginação e Botão */}
      <div className="header-single-title">
        <div className="d-flex align-items-center gap-2">
        {icon && <span className="custom-icon">{icon}</span>} {/* Ícone opcional personalizado */}
          <span className="title-text">{title}</span>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Paginação */}
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />

          {/* Botão de Adicionar Item */}
          <Button variant="primary" className="add-item-btn" onClick={onAddClick}>
            Adicionar <i className="fas fa-plus ms-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

//fas fa-box-open header-icon

export default HeaderSingle;
