import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'reactstrap';
import {Route} from 'react-router-dom';
import Menu from "./Components/Menu";

class App extends Component {
  render() {
    return (
        <Container>
            <Route path="/" component={Menu} />
        </Container>
    );
  }
}

export default App;
