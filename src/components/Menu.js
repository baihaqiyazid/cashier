import React from 'react'
import { Col, Card, Button} from 'react-bootstrap';
import priceSplitter from '../utils/numberFormat';

const Menus = ({ menu, setCart }) => {

    return (
        <Col md={4} xs={6} className="mt-3 mb-4">
            <Card>
                <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar } height="150"/>
                <Card.Body>
                    <Card.Title><strong>{menu.nama}</strong></Card.Title>
                    
                    <Card.Text>
                        Rp {priceSplitter(menu.harga)}
                    </Card.Text>
                    <Button variant="primary button-order" onClick={() => setCart(menu)}>Order</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus;