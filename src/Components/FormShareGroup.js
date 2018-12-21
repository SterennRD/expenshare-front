import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Redirect, Route, Link } from "react-router-dom";
import ShareGroup from "./Dashboard/ShareGroup";
import slugify from 'slugify/index';

class FormShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: "",
            sharegroup: null
        };
    }

    // CHANGEMENT DU STATE AU CHANGEMENT DE L'INPUT
    handleChange(event) {
        event.preventDefault();
        this.setState({ slug: event.target.value });

    }

    // CREATION D'UN GROUPE
    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/php/expenshare/public/sharegroup/', {
            method: 'POST',
            body: JSON.stringify({ slug: slugify(this.state.slug) })
        })
            .then(response => response.json())
            .then(data => {
                alert('Nouveau groupe créé avec succès !');
                this.handleOpen(event);
            })
            .catch(err => alert('Erreur lors de la création du groupe'))
        ;
    }

    // ACCES A UN GROUPE
    handleOpen(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/php/expenshare/public/sharegroup/' + slugify(this.state.slug))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ sharegroup: JSON.parse(data) });
            })
            .catch(err => alert('Ce groupe n\'existe pas !'))
        ;
    }

    render() {

        // Si le groupe existe, on est redirigé
        if (this.state.sharegroup) {
            return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
        }

        return (
            <div className="d-flex flex-column align-items-center bg-light p-3 mb-auto mt-auto">
                <h2>Rentrez l'identifiant d'un groupe</h2>
                <input className="p-1 mb-2 w-75" type="text" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="Group ID"/>
                <div>
                    <Button onClick={e => this.handleCreate(e)} color="primary" className="mr-2">Creér</Button>
                    <Button onClick={e => this.handleOpen(e)} color="primary">Ouvrir</Button>
                </div>
            </div>
        );
    }
}

export default FormShareGroup;