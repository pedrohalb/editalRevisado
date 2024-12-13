import React, { useState } from 'react';
import '../Sidebar.css'; // CSS para estilos personalizados

const Sidebar = ({ onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded); // Notifica o pai sobre a mudança
  };

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{
        width: isExpanded ? '200px' : '60px',
        backgroundColor: '#333',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isExpanded ? 'flex-start' : 'center',
        padding: isExpanded ? '10px' : '0',
        overflow: 'hidden',
      }}
    >
      <button
        className="toggle-button"
        onClick={toggleSidebar}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <i className="fas fa-bars" />
      </button>
      <div
        className="menu"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isExpanded ? 'flex-start' : 'center',
          gap: '20px',
        }}
      >
        <button
          className="menu-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: isExpanded ? '#444' : 'transparent',
            border: 'none',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: isExpanded ? '100%' : 'auto',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          <i className="fas fa-th-large" />
          {isExpanded && <span>Editais</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
