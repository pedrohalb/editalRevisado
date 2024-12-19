import React from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

const RodapeConfig = ({ title = "Configurações do Edital" }) => {
  return (
    <div className="footer-config">
      <div className="footer-config-title">
      <i className="fas fa-cog m-3"></i>
        <span>{title}</span>
      </div>

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
