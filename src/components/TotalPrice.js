import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import priceSplitter from '../utils/numberFormat';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../index.css'

// API
import { API_URL } from '../utils/constant';
import axios from 'axios';

import { Link } from 'react-router-dom';


export default class TotalPrice extends Component {

  checkout = (sum) => {
    const order = {
      total_bayar: sum,
      menus: this.props.carts
    }

    axios.post(API_URL + "orders", order)
  }
  render() {

    const sum = this.props.carts.reduce(function (result, item) {
      return result + item.total_price;
    }, 0);

    return (
      <>
        {/* Web */}
        <div className='fixed-bottom d-none d-md-block'>
          <Row>
            <Col md={{ span: 3, offset: 9 }} className='py-4 px-4 total'>
              <h4>Total : <strong className='total-number'>Rp. {priceSplitter(sum)}</strong></h4>
              {this.props.carts.length > 0 &&
                <Button variant="primary" className="button-checkout" onClick={() => this.checkout(sum)} as={Link} to='/order-success'>
                  <FontAwesomeIcon icon={faShoppingCart} />Checkout
                </Button>
              }
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className='d-sm-block d-md-none'>
          <Row>
            <Col md={{ span: 3, offset: 9 }} className='py-4 px-4 total'>
              <h4>Total : <strong className='total-number'>Rp. {priceSplitter(sum)}</strong></h4>
              {this.props.carts.length > 0 &&
                <Button variant="primary" className="button-checkout" onClick={() => this.checkout(sum)} as={Link} to='/order-success'>
                  <FontAwesomeIcon icon={faShoppingCart} />Checkout
                </Button>
              }
            </Col>
          </Row>
        </div>
      </>


    )
  }
}

