/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import data from "./data";
import { Button, Modal, Table } from "react-bootstrap";
import './index.css';
class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      data: data,
      cartNumber: 0,
      itemsInCart: [],
      show: false,
      current_star: null,
    };
  }

  //Function to display cart
  handleShow = () => {
    this.setState({ show: true });
  };

  //Funtion to hide cart
  handleClose = () => {
    this.setState({ show: false });
  };

  //Printing review
  printStar = (n) => {
    let rows = [];
    for (let i = 0; i < n; i++) {
      rows.push(<div className="bi-star-fill"></div>);
    }

    return rows;
  };

  //Adding to cart
  addCart = (name, price) => {
    let items = [...this.state.itemsInCart];
    let data = [...this.state.data];
    let obj = {
      name: name,
      price: price,
    };
    items.push(obj);
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        data[i].disble = true;
      }
    }

    this.setState({
      itemsInCart: items,
      cartNumber: this.state.cartNumber + 1,
    });
  };

  //removing from cart
  removeItem = (name) => {
    let items = [...this.state.itemsInCart];
    let data = [...this.state.data];
    let list = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].name !== name) {
        list.push(data[i]);
      }
      if (data[i].name === name) {
        data[i].disble = false;
      }
    }

    this.setState({
      itemsInCart: list,
      cartNumber: this.state.cartNumber - 1,
    });
  };

  render() {
  var star;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#!">
              Start Bootstrap
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#!">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    About
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shop
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#!">
                        All Products
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        Popular Items
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        New Arrivals
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <button
                  className="btn btn-outline-dark"
                  type="button"
                  onClick={this.handleShow}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">
                    {this.state.cartNumber}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </nav>
        {/* <!-- Header--> */}
        <header className="bg-dark py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">Shop in style</h1>
              <p className="lead fw-normal text-white-50 mb-0">
                With this shop hompeage template
              </p>
            </div>
          </div>
        </header>
        {/* <!-- Section--> */}
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {this.state.data.map((item, key) => {
                return (
                  <div className="col mb-5" key={key}>
                    <div className="card h-100">
                      {/* <!-- Sale badge--> */}
                      {item.sale && (
                        <div
                          className="badge bg-dark text-white position-absolute"
                          style={{ top: "0.5rem", right: "0.5rem" }}
                        >
                          Sale
                        </div>
                      )}

                      {/* <!-- Product image--> */}
                      <img
                        className="card-img-top"
                        src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                        alt="..."
                      />
                      {/* <!-- Product details--> */}
                      <div className="card-body p-4">
                        <div className="text-center">
                          {/* <!-- Product name--> */}
                          <h5 className="fw-bolder">{item.name}</h5>
                          {/* <!-- Product reviews--> */}
                          <div className="d-flex justify-content-center small text-warning mb-2">
                            {(star = this.printStar(item.star))}
                          </div>
                          {/* <!-- Product price--> */}
                          {item.prevPrice && (
                            <span className="text-muted text-decoration-line-through">
                              {item.prevPrice}
                            </span>
                          )}

                          {item.currentPrice}
                        </div>
                      </div>
                      {/* <!-- Product actions--> */}
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <button
                            className="btn btn-outline-dark mt-auto"
                            onClick={() =>
                              this.addCart(item.name, item.currentPrice)
                            }
                            disabled={item.disble}
                          >
                            {item.buttonValue}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* <!-- Displaying cart--> */}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Items added to cart:
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.itemsInCart.map((i) => {
                  return (
                    <tr>
                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            this.removeItem(i.name);
                          }}
                        >
                          Remove item
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Your Website 2021
            </p>
          </div>
        </footer>
      </>
    );
  }
}
export default Items;