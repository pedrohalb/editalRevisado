import React from 'react';
import { ListGroup } from 'react-bootstrap';

function ItemList({ items }) {
  return (
    <ListGroup className="mt-4">
      {items.length > 0 ? (
        items.map((item) => (
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
  );
}

export default ItemList;
