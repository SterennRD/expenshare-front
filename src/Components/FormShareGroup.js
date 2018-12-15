import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Redirect, Route, Link } from "react-router-dom";
import ShareGroup from "./ShareGroup";

class FormShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups : [],
            value: '',
            redirect: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/php/expenshare/public/share/group/', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({groups : data}))
        ;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleOpen(event) {
        event.preventDefault();
        if (this.state.value && this.state.value.trim().length) {
            for (let i = 0; i < this.state.groups.length; ++i) {
                if (this.state.groups[i].slug == this.state.value) {
                    alert('ça correspond');
                    this.setState({ redirect: true });
                    return;
                } else {
                    alert('Aucun groupe ne correspond à ce nom');
                    return;
                }
            }
        } else {
            alert('entrez un nom');
        }
    }

    handleCreate(event) {
        event.preventDefault();
        if (this.state.value && this.state.value.trim().length) {
            for (let i = 0; i < this.state.groups.length ; ++i) {
                if (this.state.groups[i].slug == this.state.value) {
                    alert('Un groupe de ce nom existe déjà');
                } else {
                    alert('Création du groupe');
                }
            }
        } else {
            alert('entrez un nom');
        }
    }


    render() {
        if (this.state.groups.length === 0) {
            return <div>Chargement en cours...</div>
        }

        const groups = this.state.groups.map((group) => <div key={group.id}>{group.slug}</div>);

        if (this.state.redirect == true) {
            return <Redirect to={"/group/" + this.state.value} component={ShareGroup} />;
        }
        return (
            <div>
                {groups}
                <Form className="text-center">
                    <FormGroup>
                        <Label for="slug" className="h2">Saisissez l'identifiant du groupe</Label>
                        <Input type="text" value={this.state.value} onChange={this.handleChange} name="email" id="slug" placeholder="Group ID" />
                    </FormGroup>
                    <Button onClick={this.handleCreate} className="m-1" color="primary">Créer</Button>
                    <Button onClick={this.handleOpen} className="m-1" color="primary">Ouvrir</Button>
                </Form>
            </div>
        );
    }
}

export default FormShareGroup;