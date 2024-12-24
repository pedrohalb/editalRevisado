import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate e useLocation do React Router
import '../App.css';

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Inicia expandida
  const navigate = useNavigate(); // Hook para navegação
  const location = useLocation(); // Hook para obter a localização atual

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  const handleNavigate = (path) => {
    navigate(path); // Redireciona para a rota especificada
  };

  // Função para verificar se a rota está ativa
  const isActive = (paths) => paths.includes(location.pathname);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Botão de Toggle */}
      <button className="toggle-button" onClick={toggleSidebar}>
        <i className="fas fa-bars me-2" /> {isExpanded && <span className="logo-text">LOGO</span>}
      </button>

      {/* Menu */}
      <div className="menu">
        <button
          className={`menu-item ${isActive(['/','/single-edital','/single-select-topic']) ? 'active' : ''}`}
          onClick={() => handleNavigate('/')}
        >
          <i className="fas fa-th-large" />
          {isExpanded && <span>Editais</span>}
        </button>
        <button
          className={`menu-item ${isActive(['/default-materia', '/single-materia']) ? 'active' : ''}`}
          onClick={() => handleNavigate('/default-materia')}
        >
          <i className="fas fa-layer-group" />
          {isExpanded && <span>Matérias</span>}
        </button>
        <button
          className={`menu-item ${isActive(['/config']) ? 'active' : ''}`}
          onClick={() => handleNavigate('/config')}
        >
          <i className="fas fa-cog" />
          {isExpanded && <span>Configurações</span>}
        </button>
      </div>

      {/* Botão de Sair */}
      <button className="menu-item logout-button" onClick={() => handleNavigate('/logout')}>
        <i className="fas fa-sign-out-alt" />
        {isExpanded && <span>Sair</span>}
      </button>
    </div>
  );
};

export default Sidebar;
