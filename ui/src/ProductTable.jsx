/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  Table,
  Tooltip,
  Button,
  Glyphicon,
  OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const deleteTooltip = (
  <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
);

const editTooltip = (
  <Tooltip id="edit-tooltip" placement="top">Edit Product Details</Tooltip>
);

const viewTooltip = (
  <Tooltip id="view-tooltip" placement="top">View Product Image</Tooltip>
);

const ProductRow = withRouter(({ product, deleteProduct, index }) => (
  <tr>
    <td>{product.product_name}</td>
    <td>
      $
      {product.product_price}
    </td>
    <td>{product.product_category}</td>
    <td>
      {/* <Link to={`/image/${product.id}`}>View</Link> */}
      <LinkContainer to={`/image/${product.id}`}>
        <OverlayTrigger delayShow={1000} overlay={viewTooltip}>
          <Button bsStyle="primary">
            <Glyphicon glyph="eye-open" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>
    </td>
    <td>
      {/* <Link to={`/edit/${product.id}`}>Edit</Link> */}
      <LinkContainer to={`/edit/${product.id}`}>
        <OverlayTrigger delayShow={1000} overlay={editTooltip}>
          <Button bsStyle="primary">
            <Glyphicon glyph="edit" />
          </Button>
        </OverlayTrigger>
      </LinkContainer>
    </td>
    <td>
      <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
        <Button bsStyle="primary" type="button" onClick={() => { deleteProduct(index); }}>
          <Glyphicon glyph="trash" />
        </Button>
      </OverlayTrigger>
    </td>
  </tr>
));

export default function ProductTable({ products, deleteProduct }) {
  // eslint-disable-next-line max-len
  const productRows = products.map(product => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={product.id} />);

  return (
    <div>
      <Table bordered condensed hover responsive>
        <thead>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
    </div>
  );
}
