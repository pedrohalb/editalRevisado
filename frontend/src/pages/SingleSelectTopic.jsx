import React, { useState, useEffect } from 'react';
import { getItems } from '../services/api';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import ItemList from '../components/ItemListSingleSelectTopic';
import '../App.css';

const SingleSelectTopic= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    fetchItems(currentPage, searchTerm, sortOrder);
  }, [currentPage, searchTerm, sortOrder]);

  const fetchItems = async (page, search, sort) => {
    try {
      const { data } = await getItems(page, 14, search, sort);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
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
          />
          <ItemList items={items} />
        </div>
      </div>
    </div>
  );
};

export default SingleSelectTopic;