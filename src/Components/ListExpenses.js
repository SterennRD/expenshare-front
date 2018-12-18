import React, {Component} from 'react';
import moment from 'moment/min/moment-with-locales.min';

class ListExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            persons: this.props.persons
        };
    }

    componentDidMount() {
    //     fetch('http://localhost/dcdev/php/expenshare/public/expense/', {
    //         method: 'GET',
    //         headers: {
    //             'X-Requested-With': 'XMLHttpRequest'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => this.setState({expenses : data}))
    //     ;

    }

    render() {
        // const expenses = this.state.expenses.filter(expense => {
        //         let result = false;
        //         for (let i = 0; i < this.props.persons.length; ++i) {
        //             if (this.props.persons[i].id == expense.person.id) {
        //                         result = true;
        //             }
        //         }
        //         return result;
        //     }
        // );
        // const realExpense = expenses.map((expense) => <div key={expense.id}>{expense.title + ' ' + expense.amount}</div>);
        // if (this.state.expenses.length === 0) {
        //     return <div>Chargement en cours...</div>
        // }
        moment.locale('fr');
        const expenses = this.props.expenses.map((expense) => <div key={expense.id}><b>{expense.title} ({expense.amount}€)</b> payé par {expense.person.firstname + ' ' + expense.person.lastname} {moment(expense.createdAt).startOf('day').fromNow()} <i className={'fas ' + expense.category.icon}></i></div>);

        const a = this.props.expenses.map((expense) => {
            let total = 0;

            for (let i = 0; i < this.props.expenses.length; ++i) {
                total += parseFloat(this.props.expenses[i].amount);
            }
            return total;
        });
        console.log(this.props.expenses);


        return (
            <div>
                <h1>Les dépenses</h1>
                {expenses}
                Le total est {a} € {this.state.total}
            </div>
        );
    }
}

export default ListExpenses;