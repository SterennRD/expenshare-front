import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'reactstrap';
import {Route} from 'react-router-dom';
import Menu from "./Components/Menu";
import FormShareGroup from "./Components/FormShareGroup";

class App extends Component {
  render() {
    return (
        <Container>
            <Route path="/" component={Menu} />
            <Route path="/group" component={FormShareGroup}/>
        </Container>
    );
  }
}

export default App;
