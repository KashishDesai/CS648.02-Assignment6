/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';

export default class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query product($id:Int!) {
    product(id:$id) {
      id product_category product_name product_price product_image
    }
  }`;
    const { match: { params: { id } } } = this.props;
    const variables = { id };
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();

    this.setState({ product: result.data.product });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <img src={product.product_image} style={{ width: 500, height: 500 }} alt="ImageNotFound" />
      </div>
    );
  }
}
