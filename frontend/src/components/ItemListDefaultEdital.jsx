import React from 'react';
import { Table, Button } from 'react-bootstrap';
import '../App.css'; // Importa o CSS global

function ItemList({ items }) {
  return (
    <div className="mt-4">
      {items.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <i className="fas fa-book me-2" /> Matérias
              </th>
              <th>
                <i className="fas fa-calendar-alt me-2" /> Data
              </th>
              <th>
                <i className="fas fa-square me-2" /> Tópicos
              </th>
              <th>
                <i className="fas fa-cog me-2" /> Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.nomeMateria}</td>
                <td>
                  {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
                </td>
                <td>
                  <Button className="table-btn-subitens">
                    <span className="subitens-number">{item.numeroTopicos}</span>
                    <span className="ms-2">{item.numeroTopicos === 1 ? 'Tópico' : 'Tópicos'}</span>
                  </Button>
                </td>
                <td>
                  <Button className="table-btn-editar">
                    <span className="me-2">Editar</span>
                    <i className="fas fa-cog" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
    </div>
  );
}

export default ItemList;
