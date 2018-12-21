import React, {Component} from 'react';

class Homepage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center mb-auto mt-auto">
                <h1 className="maintitle">Partagez vos dépenses</h1>
                <h2 className="text-dark">Outil de partage de dépenses en ligne</h2>
            </div>
        );
    }
}

export default Homepage;