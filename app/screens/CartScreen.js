/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import Item from '../components/Checkout/Item';
import Footer from '../components/Checkout/Footer';
import { deleteCartItem, fetchCartItems, updateCartItemQty } from '../../src/actions/cart';
import AppBase from '../base_components/AppBase';
import BillReceipt from '../components/Checkout/BillReceipt';

const SectionGap = styled.View`
  margin-top: 2%;
`;

const BillReceiptContainer = styled.View`
  margin-bottom: 10%;
`;

class CartScreen extends Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

  _renderItem = ({ item }) => (
    <Item
      key={item._id}
      name={item.food.name}
      price={`₹${item.price * item.qty}`}
      qty={item.qty}
      onChange={value => this.props.updateCartItemQty(item._id, value)}
    />
  );

  render() {
    const { cartData } = this.props;

    const totalBill = parseFloat(cartData.reduce(
      (total, item) => total + (item.price * item.qty),
      0,
    ));
    const taxPercent = 8;

    const tax = +(totalBill * (taxPercent / 100)).toFixed(2);

    const billInfo = [
      {
        name: 'Items Total',
        total: totalBill,
      },
      {
        name: 'Offer Discount',
        total: 18,
      },
      {
        name: `Taxes (${taxPercent}%)`,
        total: tax,
      },
      {
        name: 'Delivery Charges',
        total: 30,
      },
    ];

    return (
      <AppBase
        style={{
          alignItems: 'stretch',
        }}
      >
        <ScrollView>
          <SectionGap />
          {
            cartData.map((item, index) => (
              this._renderItem({ item })
            ))
          }
          <SectionGap />
          <BillReceiptContainer>
            <BillReceipt
              billInfo={billInfo}
            />
          </BillReceiptContainer>
        </ScrollView>
        <Footer totalAmount="184 ₹" />
      </AppBase>
    );
  }
}

CartScreen.propTypes = {
  cartData: PropTypes.array.isRequired,
  fetchCartItems: PropTypes.func.isRequired,
  updateCartItemQty: PropTypes.func.isRequired,
};


function initMapStateToProps(state) {
  return {
    cartData: state.cart.cartData,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    deleteCartItem,
    fetchCartItems,
    updateCartItemQty,
  }, dipatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(CartScreen);
