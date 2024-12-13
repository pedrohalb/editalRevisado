import React from 'react';
import { Table, Button } from 'react-bootstrap';

function ItemList({ items }) {
  return (
    <div className="mt-4">
      {items.length > 0 ? (
        <Table
          bordered
          hover
          responsive
          className="rounded"
          style={{
            borderRadius: '18px',
            overflow: 'hidden', // Bordas arredondadas sem overflow
          }}
        >
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th style={{ width: '40%', height: '50px', verticalAlign: 'middle' }}>
                <i className="fas fa-flag me-2" /> Itens
              </th>
              <th style={{ width: '10%', height: '50px', verticalAlign: 'middle' }}>
                <i className="fas fa-calendar-alt me-2" /> Data
              </th>
              <th style={{ width: '10%', height: '50px', verticalAlign: 'middle' }}>
                <i className="fas fa-square me-2" /> Subitens
              </th>
              <th style={{ width: '5%', height: '50px', verticalAlign: 'middle' }}>
                <i className="fas fa-cog me-2" /> Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ height: '80px' }}> {/* Aumenta a altura das células */}
                <td style={{ verticalAlign: 'middle' }}>{item.name}</td>
                <td style={{ verticalAlign: 'middle' }}>{item.data}</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="d-flex align-items-center"
                    style={{backgroundColor: '#f0f0f0', color: '#000', fontWeight: 'bold' }} // Preto mais forte e negrito
                  >
                    {item.subitens} <span className="ms-2">
                      {item.subitens === 1 ? 'Subitem' : 'Subitens'}</span>
                  </Button>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className="d-flex align-items-center"
                    style={{
                      backgroundColor: '#444', // Fundo branco
                      color: '#fff', // Texto branco
                      borderColor: '#ccc', // Borda cinza clara
                      fontWeight: 'bold', // Negrito
                    }}
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

export default ItemList;
