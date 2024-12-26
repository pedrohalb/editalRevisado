import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

const RodapeConfig = ({
  title = "Configurações do Edital",
  totalItems,
  selectedItems,
  isSidebarExpanded, // Recebe o estado da sidebar
}) => {
  return (
    <div
      className={`footer-config ${
        isSidebarExpanded ? 'expanded' : 'collapsed'
      }`}
    >
      {/* Título */}
      <div className="footer-config-title">
        <i className="fas fa-cog"></i>
        <span>{title}</span>
      </div>

      {/* Espaço flexível */}
      <div className="footer-config-spacer"></div>

      {/* Informações de Tópicos */}
      {totalItems !== undefined && selectedItems !== undefined && (
        <div className="footer-config-info">
          <div className="footer-config-info-box">
            Tópicos Selecionados: {selectedItems}
          </div>
          <div className="footer-config-info-box">
            Tópicos Disponíveis: {totalItems}
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="footer-config-buttons">
        <Button className="footer-config-button footer-config-button-cancel">
          Cancelar
          <i className="fas fa-times"></i>
        </Button>
        <Button className="footer-config-button footer-config-button-save">
          Salvar
          <i className="fas fa-check"></i>
        </Button>
      </div>
    </div>
  );
};


export default RodapeConfig;
