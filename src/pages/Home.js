import '../App.css';
import '../index.css';
import React, { Component } from 'react'

import { Row, Container, Col } from 'react-bootstrap';

// API
import { API_URL } from '../utils/constant';
import axios from 'axios';

// SWEET ALERT
import swal from 'sweetalert';

// COMPONENT
import Categories from '../components/Categories';
import Total from '../components/Total';
import Menu from '../components/Menu';


// import {NavbarComponent, Categories, Menu, Total} from './components';


export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            carts: [],
            chooseCategory: "Makanan"
        }

        this.changeCategory = this.changeCategory.bind(this);
    }

    componentDidMount() {

        //PRODUCTS
        axios
            .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            })

        //CARTS
       this.getCarts();
    };

    getCarts = () => {
        axios
            .get(API_URL + "carts")
            .then(res => {
                const carts = res.data;
                this.setState({ carts });
            })
            .catch(error => {
                console.log(error);
            })
    }
    // componentDidUpdate(prevState) {
    //     if (this.state.carts !== prevState.carts) {
    //         axios
    //             .get(API_URL + "carts")
    //             .then(res => {
                    
    //                 const carts = res.data;
    //                 this.setState({ carts });
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     }
    // }
    changeCategory = (value) => {
        this.setState({
            chooseCategory: value,
            menus: [],
        })

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error);
            })

    };

    // CART
    setCart = (value) => {
        axios
            .get(API_URL + "carts?products.id=" + value.id)
            .then(res => {
                if (res.data.length === 0) {
                    const cart = {
                        qty: 1,
                        total_price: value.harga,
                        products: value
                    }

                    axios
                        .post(API_URL + "carts", cart) //create
                        .then(res => {
                            this.getCarts();
                            swal({
                                title: "Success",
                                text: "Order added successfully",
                                icon: "success",
                                button: 0,
                                timer: 1100,
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })

                } else {
                    const cart = {
                        qty: res.data[0].qty + 1,
                        total_price: res.data[0].total_price + value.harga,
                        products: value
                    }

                    axios
                        .put(API_URL + "carts/" + res.data[0].id, cart) //update
                        .then(res => {
                            swal({
                                title: "Success",
                                text: "Order added successfully",
                                icon: "success",
                                button: 0,
                                timer: 1100,
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }

            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        const { menus, chooseCategory, carts } = this.state;

        return (
           
                <Container fluid className="mt-4 menu">
                    <Row>
                        <Categories changeCategory={this.changeCategory} chooseCategory={chooseCategory} />
                        <Col>
                            <h5><strong>Menu</strong></h5>
                            <hr />
                            <Row>
                                {menus && menus.map((menu) => (
                                    <Menu key={menu.id} menu={menu} setCart={this.setCart} />
                                ))}
                            </Row>
                        </Col>

                        <Total carts={carts} {...this.props} getCarts={this.getCarts}/>
                    </Row>
                </Container>
            
        )
    }
}
