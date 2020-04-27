/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */
import React from 'react';

import {
  Label,
  Panel,
} from 'react-bootstrap';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };

    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        productList {
        id product_category product_name product_price product_image
        }
    }`;

    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    }).then((response) => {
      response.json().then((result) => {
        this.setState({ products: result.data.productList });
      });
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  async createProduct(product) {
    const newProduct = product;

    const query = `mutation productAdd($newProduct: ProductInputs!) {
        productAdd(product: $newProduct) {
            _id
        }
    }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { newProduct } }),
    }).then(() => {
      this.loadData();
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  async deleteProduct(id) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    // // const { products } = this.state;
    // // const { location: { pathname, search }, history } = this.props;
    // // const { id } = issues[index];
    const variables = { id };
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    this.showSuccess('Product deleted product successfully!');
    this.loadData();
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { state } = this;
    const {
      toastVisible,
      toastMessage,
      toastType,
    } = this.state;

    return (
      <div title="Inner Div">
        <h1 className="headerClass"><Label> My Product Inventory </Label></h1>
        <Panel>
          <Panel.Heading>
            <Panel.Title className="headerClass">Showing all available products</Panel.Title>
          </Panel.Heading>
          <hr />
          <Panel.Body>
            <ProductTable products={state.products} deleteProduct={this.deleteProduct} />
          </Panel.Body>
        </Panel>
        <br />
        <br />
        <ProductAdd createProduct={this.createProduct} />
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
