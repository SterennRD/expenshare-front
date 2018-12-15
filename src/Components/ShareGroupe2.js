import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListPersons from "./ListPersons";
import ListExpenses from "./ListExpenses";

class ShareGroupe2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: []
        }
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/php/expenshare/public/person/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({group : data}))
        ;
    }

    function BasicExample() {
        return (
            <Router>
                <div>
                    <Link to={`${this.props.match.url}/persons`}>Props v. State</Link>
                    <Link to={`${this.props.match.url}/expenses`}>Expenses</Link>

                    <hr />

                    <Route exact path="/" component={ListExpenses} />
                </div>
            </Router>
        );
    }

    function Home() {
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }

    function About() {
        return (
            <div>
                <h2>About</h2>
            </div>
        );
    }

    function Topics({ match }) {
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>

                <Route path={`${match.path}/:topicId`} component={ListPersons} />
                <Route
                    exact
                    path={match.path}
                    render={() => <h3>Please select a topic.</h3>}
                />
            </div>
        );
    }

    function Topic({ match }) {
        return (
            <div>
                <h3>{match.params.topicId}</h3>
            </div>
        );
    }
}


export default ShareGroupe2;