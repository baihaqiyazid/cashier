import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Modal } from 'react-bootstrap'
import priceSplitter from '../utils/numberFormat';

const ModalEdit = ({ showModal, handleClose, cartDetail, 
                     qty, desc, total_price,
                     handlePlus, handleMinus, handleChange, handleSubmit }) => {
    
    if (cartDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><strong>{cartDetail.products.nama}</strong></Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        {/* price */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="fw-semibold">Total</Form.Label>
                            <p>Rp. {priceSplitter(total_price)}</p>
                        </Form.Group>
                        {/* qty */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="fw-semibold">Quantity</Form.Label>
                            <br />
                            <Button size="sm"><FontAwesomeIcon icon={faMinus} onClick={() => handleMinus()} /></Button>
                            <span className="mx-2 fs-4">{qty}</span>
                            <Button size="sm"><FontAwesomeIcon icon={faPlus} onClick={() => handlePlus()} /></Button>
                            
                        </Form.Group>
                        {/* desc */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="fw-semibold">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Contoh: (Tidak pedas, manis)"
                                value={desc}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        )
    }
}

export default ModalEdit