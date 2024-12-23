import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate do React Router
import '../App.css'; // Importa o CSS global

function ItemListSingleMateria({ items }) {
  const navigate = useNavigate(); // Hook para navegação

  const handleEditClick = (id) => {
    navigate(`/single-topic`); // Redireciona para a página de edição com o ID
  };

  return (
    <div className="mt-4">
      {items.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <i className="fas fa-book me-2" /> Nome
              </th>
              <th>
                <i className="fas fa-calendar-alt me-2" /> Data
              </th>
              <th>
                <i className="fas fa-check-square me-2" /> PDFs
              </th>
              <th>
                <i className="fas fa-cog me-2" /> Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.nomeTopico}</td>
                <td>{new Date(item.dataCriacao).toLocaleDateString('pt-BR')}</td>
                <td>
                <Button className="pdf-column-item">
                    <i className="fas fa-file-pdf pdf-icon"></i>
                    <span className="pdf-number ms-2">{item.numeroArquivos}</span>
                    <span className="pdf-text ms-2">
                      {item.numeroArquivos === 1 ? 'Arquivo' : 'Arquivos'}
                    </span>
                  </Button>
                </td>
                <td>
                  <Button
                    className="table-btn-editar"
                    onClick={() => handleEditClick(item.id)} // Redireciona ao clicar
                  >
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

export default ItemListSingleMateria;
