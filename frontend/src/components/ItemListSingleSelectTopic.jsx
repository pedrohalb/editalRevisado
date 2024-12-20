import React from 'react';
import { Table, Button } from 'react-bootstrap';
import '../App.css'; // Importa o CSS global

function ItemListSingleSelectTopic({ items, selectedItems, onSelectItem, onSelectAll }) {
  // Verifica se todos os itens estão selecionados
  const allSelected = items.every((item) => selectedItems.has(item.id));

  return (
    <div className="mt-4">
      {items.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>
                <div className="select-all">
                  <div
                    className={`select-box ${allSelected ? 'selected' : ''}`}
                    onClick={onSelectAll}
                  >
                    {allSelected && <i className="fas fa-check"></i>}
                  </div>
                  Nome
                </div>
              </th>
              <th>
                <i className="fas fa-check-square me-2" /> PDFs
              </th>
              <th>
                <i className="fas fa-calendar-alt me-2" /> Data
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`table-row ${selectedItems.has(item.id) ? 'selected' : ''}`}
              >
                <td>
                  <div className="row-content">
                    <div
                      className={`select-box ${selectedItems.has(item.id) ? 'selected' : ''}`}
                    >
                      {selectedItems.has(item.id) && <i className="fas fa-check"></i>}
                    </div>
                    {item.nomeTopico}
                  </div>
                </td>
                <td>
                  <Button className="pdf-column-item">
                    <i className="fas fa-file-pdf pdf-icon"></i>
                    <span className="pdf-number ms-2">{item.numeroArquivos}</span>
                    <span className="pdf-text ms-2">
                      {item.numeroArquivos === 1 ? 'Arquivo' : 'Arquivos'}
                    </span>
                  </Button>
                </td>
                <td>{new Date(item.dataCriacao).toLocaleDateString('pt-BR')}</td>
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

export default ItemListSingleSelectTopic;
