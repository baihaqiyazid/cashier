import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// API
import { API_URL } from '../utils/constant';
import axios from 'axios';

export default class OrderSuccess extends Component {
  
  componentDidMount() {
    //CARTS
    axios
      .get(API_URL + "carts")
      .then(res => {
        const carts = res.data;
        carts.map((cart) => {
          return axios.delete(API_URL+"carts/"+cart.id)
        })
      })
      .catch(error => {
        console.log(error);
      })
  };
  render() {
    return (
      <div className='mt-5 text-center'>
        <Image src='assets/images/success.svg' width='400' />
        <h3>Order Successful</h3>
        <Button
          as={Link}
          to="/"
          className='btn-secondary'>Back
        </Button>
      </div>
    )
  }
}
