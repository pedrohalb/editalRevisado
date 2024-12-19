import React, { useState, useEffect } from 'react';
import { getItems2, getItems3 } from '../services/api';
import Sidebar from '../components/SideBar';
import HeaderSingle from '../components/HeaderSingle';
import ItemListSingleEdital from '../components/ItemListSingleEdital';
import '../App.css';
import RodapeConfig from '../components/RodapeConfig'; // Importe o novo componente
import ModalAdicionarMaterias from '../components/ModalAdicionarMaterias';

const SingleEdital= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    fetchItems(currentPage, searchTerm, sortOrder);
  }, [currentPage, searchTerm, sortOrder]);

  const fetchItems = async (page, search, sort) => {
    try {
      const { data } = await getItems2(page, 11, search, sort);
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

    // Função para buscar matérias para o modal
  const fetchMaterias = async () => {
    try {
      const { data } = await getItems3(1, 100, '', ''); // Carrega até 100 matérias para o modal
      setMaterias(data.items);
    } catch (error) {
      console.error('Erro ao buscar matérias para o modal:', error);
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

  const handleAddClick = async () => {
    await fetchMaterias(); // Carregar matérias antes de abrir o modal
    setIsModalOpen(true);
  };

  const handleSaveMaterias = (selectedMaterias) => {
    console.log('Matérias selecionadas:', selectedMaterias);
    setIsModalOpen(false); // Fecha o modal
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
          <HeaderSingle
          title="Materiais"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          showIcon={true} /* Exibe o ícone apenas aqui */
          onAddClick={handleAddClick}
          />
          <ItemListSingleEdital items={items} />
        </div>
        <RodapeConfig title="Configurações do Edital" />

        <ModalAdicionarMaterias
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={materias}
          onSave={handleSaveMaterias}
        />
      </div>
      
    </div>
  );
};

export default SingleEdital;
