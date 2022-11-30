import { NavLink } from "react-router-dom";
import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      userLoggedIn: false,
    };
    this.searchProducts = this.searchProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  searchProducts(event) {
    event.preventDefault();
    this.props.setSearchString(this.state.searchString);
  }

  logOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  }

  render() {
    const userExist = this.props.isLoggedIn;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand">MyBasket</span>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link  text-white" to="/">
                  Home
                </NavLink>
              </li>
              {userExist ? (
                <li className="nav-item">
                  <NavLink className="nav-link  text-white" to="/profile">
                    Profile
                  </NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <form className="d-flex flex-row bg-dark" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Products"
                aria-label="Search"
                name="searchString"
                value={this.state.searchString}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={this.searchProducts}
              >
                Search
              </button>
            </form>

            {userExist ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/order">
                    My Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    to="/login"
                    onClick={this.logOut}
                  >
                    LogOut
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/login">
                    LogIn
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
