import '../index.css';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge, Button, Card } from 'react-bootstrap';
import priceSplitter from '../utils/numberFormat';
import ModalEdit from './ModalEdit';
import TotalPrice from './TotalPrice';

// API
import { API_URL } from '../utils/constant';
import axios from 'axios';

// SWEET ALERT
import swal from 'sweetalert';

export default class Total extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      cartDetail: false,
      qty: 0,
      desc: " ",
      total_price: ""
    }
  }

  handleShow = (carts) => {
    this.setState({
      showModal: true,
      cartDetail: carts,
      qty: carts.qty,
      desc: carts.desc,
      total_price: carts.total_price
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  handlePlus = () => {
    this.setState({
      qty: this.state.qty + 1,
      total_price: this.state.cartDetail.products.harga * (this.state.qty + 1)
    })
  }

  handleMinus = () => {
    if (this.state.qty !== 1) {
      this.setState({
        qty: this.state.qty - 1,
        total_price: this.state.cartDetail.products.harga * (this.state.qty - 1)
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      desc: e.target.value
    })
  }

  // Update
  handleSubmit = (e) => { 
    e.preventDefault();

    const cart = {
      qty: this.state.qty,
      total_price: this.state.total_price,
      products: this.state.cartDetail.products,
      desc: this.state.desc
    }

    axios
      .put(API_URL + "carts/" + this.state.cartDetail.id, cart) //create
      .then(res => {
        this.props.getCarts();
        swal({
          title: "Success",
          text: "Data updated",
          icon: "success",
          button: 0,
          timer: 1100,
        });
      })
      .catch(error => {
        console.log(error);
      })
    this.handleClose();
  }

  // Delete
  deleteCart = (id) => {

    this.handleClose();

    axios
      .delete(API_URL + "carts/" + id) //create
      .then(res => {
        this.props.getCarts();
        swal({
          title: "Success",
          text: "Data deleted",
          icon: "success",
          button: 0,
          timer: 1100,
        });
      })
      .catch(error => {
        console.log(error);
      })
  }


  render() {
    const { carts } = this.props;
    return (
      <Col md={3} >
        <h5><strong>Total</strong></h5>
        <hr />

        {carts.length !== 0 && (
          <Card className="overflow-auto total-heigth mb-4">
            <ListGroup variant="flush" className="text-start">
              {carts.map((cart) => (
                <ListGroup.Item key={cart.id}>
                  <Row>
                    <Col xs={2} className="mx-auto">
                      <Badge pill variant="info">{cart.qty}</Badge>

                    </Col>
                    <Col>
                      <h5>{cart.products.nama}</h5>
                      <p>Rp. {priceSplitter(cart.products.harga)}</p>
                    </Col>
                    <Col xs={5} className="text-end">
                      <Row>
                        <strong className="float-right">Rp. {priceSplitter(cart.total_price)}</strong>
                      </Row>

                      <div>
                        <Button
                          onClick={() => this.handleShow(cart)}
                          className="bg-warning border-0 button btn btn-sm mt-1 mr-2">
                          <FontAwesomeIcon icon={faPencil} />
                        </Button>
                        <Button
                          onClick={() => this.deleteCart(cart.id)}
                          className="bg-danger border-0 button btn btn-sm mt-1">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>

                      </div>



                    </Col>
                  </Row>
                </ListGroup.Item>

              ))}

              <ModalEdit handleClose={this.handleClose}
                {...this.state}
                handlePlus={this.handlePlus}
                handleMinus={this.handleMinus}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </ListGroup>
          </Card>
        )}

        <TotalPrice carts={carts} {...this.props} className="mt-4" />
      </Col>
    )
  }
}
