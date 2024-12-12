import React, { useEffect, useState } from 'react';
import { getItems, addItem, deleteItem } from '../services/api';
import { Button, Form, ListGroup } from 'react-bootstrap';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await getItems();
      setItems(data.items || data); // Use `data.items` se a resposta for paginada
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      setItems([]); // Garante que `items` seja um array mesmo em caso de erro
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(newItem);
    fetchItems();
    setNewItem({ name: '', description: '' });
  };

  /*const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      await deleteItem(id);
      fetchItems(); // Atualiza a lista após exclusão
    }
  };*/
  

  return (
    <div className="p-4">
      <h1>Lista de Itens</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a descrição"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Adicionar Item
        </Button>
      </Form>

      <ListGroup className="mt-4">
        {items.map((item) => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}:</strong> {item.description}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

    </div>
  );
}

export default ItemList;
