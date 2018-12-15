import React, {Component} from 'react';

class ListPersons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: []
        }
    }


    render() {

        console.log(this.props.persons);
        const persons = this.props.persons.map((person) => <div key={person.id}>{person.firstname + ' ' + person.lastname}</div>);
        return (
            <div>
                <h1>Personnes</h1>
                {persons}
            </div>
        );
    }
}

export default ListPersons;