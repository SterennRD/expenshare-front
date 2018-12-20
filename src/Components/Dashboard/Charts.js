import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

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

        for (let i=0; i < this.props.persons.length; ++i) {
            datapersons.push(this.props.persons[i].firstname + ' ' + this.props.persons[i].lastname);
            dataexpenses.push(this.props.persons[i].expenses.length);
            let color = 'rgba(' + Math.floor(Math.random() * 256) +', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) +', ';
            datacolor.push(color + '0.2)');
            datacolor2.push(color + '1)');
            datawidth.push('1');
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
        return (
            <div>
                <Doughnut data={data} width={500} options={{
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
        );
    }
}

export default Charts;