import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';


//API
import { API_URL } from '../utils/constant';
import axios from 'axios';

const Icon = ({ name }) => {
  if (name === 'Makanan') return <FontAwesomeIcon icon={faUtensils} className="mr-3"/>;
  if (name === 'Minuman') return <FontAwesomeIcon icon={faCoffee} className="mr-3" />;
  if (name === 'Cemilan') return <FontAwesomeIcon icon={faCheese} className="mr-3" />;
}

export default class Categories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        console.log(error);
      })
  };

  render() {

    const { categories } = this.state;
    const { changeCategory, chooseCategory } = this.props;

    return (
      <Col md={2} className="mb-4">
        <h5><strong>Categories</strong></h5>
        <hr />
        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={chooseCategory === category.nama && "text-white bg-dark"}
              style={{ cursor: "pointer" }}>
              <div className="d-flex">
                <Icon name={category.nama} />
                <h6 className='text-start ml-4'>{category.nama}</h6>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    )
  }
}
