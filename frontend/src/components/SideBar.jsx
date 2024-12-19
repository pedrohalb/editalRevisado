import React, { useState } from 'react';
import '../App.css';

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Inicia expandida

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Botão de Toggle */}
      <button className="toggle-button" onClick={toggleSidebar}>
        <i className="fas fa-bars me-2" /> {isExpanded && <span className="logo-text">LOGO</span>}
      </button>

      {/* Menu */}
      <div className="menu">
        <button className="menu-item active">
          <i className="fas fa-th-large" />
          {isExpanded && <span>Editais</span>}
        </button>
        <button className="menu-item">
          <i className="fas fa-layer-group" />
          {isExpanded && <span>Matérias</span>}
        </button>
        <button className="menu-item">
          <i className="fas fa-cog" />
          {isExpanded && <span>Configurações</span>}
        </button>
      </div>

      {/* Botão de Sair */}
      <button className="menu-item logout-button">
        <i className="fas fa-sign-out-alt" />
        {isExpanded && <span>Sair</span>}
      </button>
    </div>
  );
};

export default Sidebar;
