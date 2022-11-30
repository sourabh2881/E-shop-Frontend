import "./App.css";
import React, { Component } from "react";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import { NoMtach } from "./components/NoMatch";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { Profile } from "./components/Profile";
import NotLoggedUser from "./components/NotLoggedUser";
import Order from "./components/Order";
import WithRouter from "./components/withRouter";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      userLoggedIn: false,
    };
    this.setSearchString = this.setSearchString.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser() {
    const localStorageUser = localStorage.getItem("id");
    const userExist = this.state.userLoggedIn;
    if ((!localStorageUser && userExist) || (localStorageUser && !userExist)) {
      this.setState({
        userLoggedIn: !userExist,
      });
    }
  }

  componentDidUpdate() {
    this.loadUser();
  }

  componentDidMount() {
    this.loadUser();
  }

  setSearchString(string) {
    this.setState({
      searchString: string,
    });
    this.props.navigate("/");
  }

  render() {
    const userExist = this.state.userLoggedIn;
    return (
      <>
        <Navbar isLoggedIn={userExist} setSearchString={this.setSearchString} />
        <Routes>
          <Route
            path="/"
            element={<Home searchString={this.state.searchString} />}
          />
          <Route path="/login" element={<SignUp />} />
          <Route path="/notLoggedMessage" element={<NotLoggedUser />} />
          {userExist ? (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<Order />} />
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<NoMtach />} />
        </Routes>
      </>
    );
  }
}

export default WithRouter(App);
