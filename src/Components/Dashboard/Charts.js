import React, {Component} from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';

class Charts extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let datapersons = [];
        let dataexpenses = [];
        let datacolor = [];
        let datacolor2 = [];
        let datawidth = [];
        let balances = [];
        let totalP = [];

        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }
        const shareExpense = total / this.props.persons.length;

        for (let i=0; i < this.props.persons.length; ++i) {
            datapersons.push(this.props.persons[i].firstname + ' ' + this.props.persons[i].lastname);
            dataexpenses.push(this.props.persons[i].expenses.length);
            let color = 'rgba(' + Math.floor(Math.random() * 256) +', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) +', ';
            datacolor.push(color + '0.2)');
            datacolor2.push(color + '1)');
            datawidth.push('1');
            let total = 0;
            if (this.props.persons[i].expenses.length > 0) {
                for (let j=0; j < this.props.persons[i].expenses.length; ++j) {
                    total += parseFloat(this.props.persons[i].expenses[j].amount);
                    console.log(this.props.persons[i].expenses[j]);
                }
            } else {
                let total = 0;
            }
            let balance = (total - shareExpense).toFixed(2);
            balances.push(balance);
            totalP.push(total);
        }

        const data = {
            labels: datapersons,
            datasets: [
                {
                    data: dataexpenses,
                    backgroundColor: datacolor,
                    hoverBackgroundColor: datacolor2,
                    borderColor: datacolor2,
                    borderWidth: datawidth
                }]
        };

        const data2 = {
            labels: datapersons,
            datasets: [
                {
                    label: 'Total des dépenses par personne',
                    data: totalP,
                    backgroundColor: datacolor,
                    hoverBackgroundColor: datacolor2,
                    borderColor: datacolor2,
                    borderWidth: datawidth
                },
                {
                    label: 'Balance des dépenses',
                    data: balances,
                    backgroundColor: datacolor,
                    hoverBackgroundColor: datacolor2,
                    borderColor: datacolor2,
                    borderWidth: datawidth
                }]
        };
        return (
            <div className="d-flex">
                <div className="w-50">
                <Doughnut data={data} width={200} options={{
                    legend: {
                        display: false
                    },
                    title: {
                        text: 'Nombre de dépenses par personne',
                        position: 'top',
                        display: true
                    }
                }}/>
                </div>
                <div className="w-50">
                <Bar
                    data={data2}
                    width={50}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
                </div>
            </div>
        );
    }
}

export default Charts;