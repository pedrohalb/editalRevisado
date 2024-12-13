import React, { useEffect, useState } from 'react';
import { getItems, addItem } from '../services/api';
import { Button, Form, ListGroup } from 'react-bootstrap';

function ItemList({ searchTerm, sortOrder }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [filteredItems, setFilteredItems] = useState([]); // Lista filtrada

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    let updatedItems = [...items];

    // Filtra os itens com base no termo de pesquisa
    if (searchTerm) {
      updatedItems = updatedItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordena os itens com base no filtro selecionado
    if (sortOrder === 'asc') {
      updatedItems.sort((a, b) => a.name.localeCompare(b.name)); // Ordem A-Z
    } else if (sortOrder === 'desc') {
      updatedItems.sort((a, b) => b.name.localeCompare(a.name)); // Ordem Z-A
    }

    setFilteredItems(updatedItems);
  }, [searchTerm, sortOrder, items]);

  const fetchItems = async () => {
    try {
      const { data } = await getItems();
      setItems(data.items || data); // Usa `data.items` se a resposta for paginada
      setFilteredItems(data.items || data); // Inicializa a lista filtrada
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      setItems([]); // Garante que `items` seja um array mesmo em caso de erro
      setFilteredItems([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    await addItem(newItem);
    fetchItems(); // Atualiza a lista após adicionar um item
    setNewItem({ name: '', description: '' }); // Limpa o formulário
  };

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

      {/* Lista de itens filtrada */}
      <ListGroup className="mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}:</strong> {item.description}
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </ListGroup>
    </div>
  );
}

export default ItemList;
