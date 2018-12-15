import React, {Component} from 'react';
import ListExpenses from "./ListExpenses";
import { Route, Link, Switch,BrowserRouter } from 'react-router-dom';
import ListPersons from "./ListPersons";

class ShareGroup extends Component {
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

    render() {

        // console.log(this.state.group);
        const persons = this.state.group.map((person) => <div key={person.id}>{person.firstname}</div>);
        return (
            <BrowserRouter>
            <div>
                <h1>{this.props.match.params.id}</h1>
                <Link to={`${this.props.match.url}/persons`}>Props v. State</Link>
                <Link to={`${this.props.match.url}/expenses`}>Expenses</Link>
                <Switch>
                    <Route path={`${this.props.match.path}/persons`} render={()=><ListPersons persons={this.state.group}/>} />
                    <Route path={`${this.props.match.path}/expenses`} component={ListExpenses} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default ShareGroup;