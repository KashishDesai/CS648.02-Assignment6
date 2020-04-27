/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  Form,
  Modal,
} from 'react-bootstrap';

import Toast from './Toast.jsx';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
      showAddProductModal: false,
    };

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAddForm;
    const price = form.productPrice.value;
    const product = {
      product_name: form.productName.value,
      product_price: parseFloat(price.substring(1, price.length)),
      product_category: form.productCategory.value,
      product_image: form.productImage.value,
    };
    const { props } = this;
    props.createProduct(product);
    this.showSuccess('Product Added Successfully');
    this.handleModalClose();
    form.productName.value = '';
    form.productPrice.value = '$';
    form.productImage.value = '';
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }


  handleModalClose() {
    this.setState({ showAddProductModal: false });
  }

  handleModalShow() {
    this.setState({ showAddProductModal: true });
  }

  render() {
    const {
      toastVisible,
      toastMessage,
      toastType,
      showAddProductModal,
    } = this.state;

    return (
      <div>
        <Button variant="primary" onClick={this.handleModalShow}>
          Add a Product
        </Button>

        <Modal show={showAddProductModal} onHide={this.handleModalClose}>

          <Modal.Header closeButton>
            <Modal.Title>Add a new product</Modal.Title>
          </Modal.Header>

          <Form name="productAddForm" onSubmit={this.handleSubmit}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel className="addFormTitle" htmlFor="productCategory">
                  Category
                </ControlLabel>
                <select name="productCategory" sm="6">
                  <option>Shirts</option>
                  <option>Jeans</option>
                  <option>Jackets</option>
                  <option>Sweaters</option>
                  <option>Accessories</option>
                </select>
              </FormGroup>

              <FormGroup>
                <ControlLabel className="addFormTitle cl-2" htmlFor="productPrice">
                  Product Price
                </ControlLabel>
                <input defaultValue="$" type="text" name="productPrice" />
              </FormGroup>

              <FormGroup>
                <ControlLabel className="addFormTitle" htmlFor="productName">
                  Product Name
                </ControlLabel>
                <input type="text" name="productName" placeholder="Product Name" />
              </FormGroup>

              <FormGroup>
                <ControlLabel className="addFormTitle" htmlFor="productImage">
                  Product Image URL
                </ControlLabel>
                <input type="text" name="productImage" placeholder="Product Image" />
              </FormGroup>

              <br />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Close
              </Button>
              <Button bsStyle="primary" type="submit">Add Product</Button>
            </Modal.Footer>

          </Form>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </div>
    );
  }
}
