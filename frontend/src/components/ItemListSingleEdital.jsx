import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import '../App.css'; // Certifique-se de que este arquivo contém os estilos atualizados

function ItemListSingleEdital({ items }) {
  const navigate = useNavigate(); // Inicialize o hook de navegação

  const handleViewTopics = (id) => {
    navigate(`/single-select-topic?id=${id}`); // Redirecione para a página com o ID da matéria
  };

  return (
    <div className="mt-4">
      {items.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <i className="fas fa-book me-2" /> Nome da Matéria
              </th>
              <th>
                <i className="fas fa-square me-2" /> Tópicos Disponíveis
              </th>
              <th>
                <i className="fas fa-check-square me-2" /> Tópicos Ativos
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
                  <div className="topics-cell">
                    <i className="far fa-circle topics-icon me-2" />
                    <span className="topics-number">{item.topicosDisponiveis}</span>
                  </div>
                </td>
                <td>
                  <div className="topics-cell">
                    <i className="fas fa-check-circle topics-icon me-2" />
                    <span className="topics-number">{item.topicosAtivos}</span>
                  </div>
                </td>
                <td>
                  <div className="table-action-buttons">
                    <Button
                      className="table-btn-editar"
                      onClick={() => handleViewTopics(item.id)} // Chama a função de navegação
                    >
                      <span className="me-2">Ver Tópicos</span>
                      <i className="fas fa-cog" />
                    </Button>
                    <Button className="table-btn-delete">
                      <i className="fas fa-trash" />
                    </Button>
                  </div>
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

export default ItemListSingleEdital;
