import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from 'reactstrap';
import {Route} from 'react-router-dom';
import Menu from "./Components/Menu";
import FormShareGroup from "./Components/FormShareGroup";
import ShareGroup from "./Components/ShareGroup";

class App extends Component {
  render() {
    return (
        <Container>
            <Menu/>
            <Route exact path="/group" component={FormShareGroup}/>
            <Route exact path="/group/:id" component={ShareGroup}/>
        </Container>
    );
  }
}

export default App;
