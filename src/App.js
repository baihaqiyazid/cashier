import React, { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// COMPONENT
import NavbarComponent from './components/NavbarComponent';
import { Home, OrderSuccess } from './pages'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavbarComponent />
          <main>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/order-success" element={<OrderSuccess />} exact />
            </Routes>
          </main>
        </BrowserRouter>
      </div>

      // <div>
      //   <h1>Hallo</h1>
      // </div>
    )
  }
}
