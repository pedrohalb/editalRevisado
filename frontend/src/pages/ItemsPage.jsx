import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/api';
import { Button, ListGroup, Pagination } from 'react-bootstrap';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const fetchItems = async (page) => {
    const { data } = await getItems(page);
    setItems(data.items);
    setTotalPages(data.totalPages);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      await deleteItem(id);
      fetchItems(currentPage); // Atualiza a lista após exclusão
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1>Exlua os Itens Listados</h1>
      <ListGroup className="mt-4">
        {items.map((item) => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}:</strong> {item.description}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                Excluir
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Pagination className="mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ItemsPage;