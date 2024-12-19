import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import '../App.css';

const ModalAdicionarMaterias = ({ 
  isOpen, 
  onClose, 
  items = [], 
  onSave 
}) => {
  const [selectedMaterias, setSelectedMaterias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!isOpen) {
      setSelectedMaterias([]); // Limpa seleção ao fechar o modal
      setSearchTerm(''); // Reseta a barra de pesquisa
    }
  }, [isOpen]);

  useEffect(() => {
    // Filtra as matérias com base no termo de busca
    const filtered = items.filter((item) =>
      item.nomeMateria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const handleMateriaSelect = (materiaId) => {
    setSelectedMaterias((prevSelected) => {
      if (prevSelected.includes(materiaId)) {
        return prevSelected.filter((id) => id !== materiaId); // Remove se já estiver selecionada
      }
      return [...prevSelected, materiaId]; // Adiciona se não estiver selecionada
    });
  };

  const handleSelectAll = () => {
    if (selectedMaterias.length === filteredItems.length) {
      setSelectedMaterias([]); // Desmarcar todos
    } else {
      setSelectedMaterias(filteredItems.map((item) => item.id)); // Selecionar todos
    }
  };

  const handleSave = () => {
    const selectedItems = items.filter((item) => selectedMaterias.includes(item.id));
    onSave(selectedItems);
    onClose(); // Fecha o modal após salvar
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose} 
      aria-hidden={!isOpen} 
      aria-labelledby="modal-title" 
      aria-describedby="modal-description"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title">Adicionar Matéria</h2>
          <button 
            className="close-button" 
            onClick={onClose} 
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
        <div id="modal-description" className="modal-body">
          {/* Barra de Pesquisa */}
          <InputGroup className="search-bar mb-3">
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

          {/*
          <button 
            className="select-all-button mb-3" 
            onClick={handleSelectAll}
          >
            {selectedMaterias.length === filteredItems.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
          </button>*/}

          {/* Lista de Matérias */}
          {filteredItems.length > 0 ? (
            <ul className="materias-list">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className={`materia-item ${
                  selectedMaterias.includes(item.id) ? 'selected' : ''
                }`}
                onClick={() => handleMateriaSelect(item.id)}
              >
                <div className="materia-info">
                  {/* Ícone de Confirmação */}
                  <span className="materia-icon">
                    <i
                      className={`fas ${
                        selectedMaterias.includes(item.id)
                          ? 'fa-check-circle'
                          : 'fa-circle'
                      }`}
                    />
                  </span>
          
                  {/* Nome da Matéria */}
                  <span className="materia-nome">{item.nomeMateria}</span>
                </div>
          
                {/* Número de Tópicos */}
                <span className="materia-topicos">{item.numeroTopicos} Tópicos</span>
              </li>
            ))}
          </ul>
          
          ) : (
            <p className="no-items-message">Nenhuma matéria encontrada.</p>
          )}
        </div>
            <div className="modal-footer">
            <Button className="cancel-button" onClick={onClose}>
                Cancelar
                <i className="m-2 fas fa-times"></i>
                </Button>
            <Button className="save-button" 
            onClick={handleSave} 
            disabled={selectedMaterias.length === 0}
          >
            Salvar
            <i className="m-2 fas fa-check"></i>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdicionarMaterias;