import React, { useState, useEffect } from 'react';
import { getItems3, getItems4 } from '../services/api';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import ItemList from '../components/ItemListSingleSelectTopic';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import RodapeConfig from '../components/RodapeConfig'; // Importe o novo componente


const SingleSelectTopic= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set()); // Mantém seleções globais como um Set
  const [totalItems, setTotalItems] = useState(0); // Número total de tópicos disponíveis

  useEffect(() => {
    fetchItems(currentPage, searchTerm, sortOrder);
  }, [currentPage, searchTerm, sortOrder]);

  const fetchItems = async (page, search, sort) => {
    try {
      const { data } = await getItems4(page, 14, search, sort);
      setItems(data.topics);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems); // Total de itens disponíveis no sistema
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  // Alterna a seleção de um item
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) => {
      const updated = new Set(prevSelected);
      if (updated.has(id)) {
        updated.delete(id); // Remove a seleção se já estava selecionado
      } else {
        updated.add(id); // Adiciona à seleção
      }
      return updated;
    });
  };

  // Seleciona ou desmarca todos os itens da página atual
  const handleSelectAll = () => {
    setSelectedItems((prevSelected) => {
      const updated = new Set(prevSelected);
      const allSelected = items.every((item) => updated.has(item.id));
      if (allSelected) {
        // Remove todos os itens da página atual
        items.forEach((item) => updated.delete(item.id));
      } else {
        // Adiciona todos os itens da página atual
        items.forEach((item) => updated.add(item.id));
      }
      return updated;
    });
  };

  const handlePageChange = (page) => setCurrentPage(page);

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

  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onToggle={(expanded) => setIsSidebarExpanded(expanded)} />
      <div
        className={`main-content ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          padding: '3rem',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            getSortOrderLabel={getSortOrderLabel}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            title="Tópicos Disponíveis"
            addButtonText="Adicionar Tópico"
            onAddButtonClick={() => navigate('/single-topic')}
          />
          <ItemList
            items={items}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
          />
        </div>
        <RodapeConfig
          title="Configurações da Matéria"
          totalItems={totalItems} // Total de itens no sistema
          selectedItems={selectedItems.size} // Total de itens selecionados

        />
      </div>
    </div>
  );
};

export default SingleSelectTopic;
