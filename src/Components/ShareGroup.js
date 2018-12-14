import React, {Component} from 'react';

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
        console.log(this.state.group);
        return (
            <div>
                <h1>{this.props.match.params.id}</h1>
                <Route path={`${match.path}/:id`} component={Topic} />
            </div>
        );
    }
}

export default ShareGroup;