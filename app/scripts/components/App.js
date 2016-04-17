import React from 'react';
import FareTable from './FareTable';
import Options from './Options';
import HelpText from './HelpText';


function roundToFiveCents(value) {
    return parseFloat((Math.ceil(value * 20) / 20).toFixed(2))
}

function optimalFare(ride, balance, fare) {
    /*
    Things to rememeber:

    Metro card only allow payment to $ 0.05
    11% bonus added when you buy $ 5.50
    */

    var requiredTotal = (fare * ride) - balance;
    var payment = roundToFiveCents(requiredTotal);
    var bonus = 0;
    var remainder = 0;

    if ((payment / 1.11) >= 5.50) {
        payment = roundToFiveCents(payment / 1.11);
        bonus = parseFloat((payment * 0.11).toFixed(2));
    }

    remainder = (payment + bonus) - requiredTotal;

    return {
        total: payment * bonus,
        payment: payment,
        ride: ride,
        bonus: bonus,
        remainder: parseFloat(remainder.toFixed(2))
    }
}

function recalculateFares(balance, fare) {
    var rides = Array.from(Array(100).keys());
    var options = [];
    for (let ride of rides) {
        options.push(
            optimalFare(ride, balance, fare)
        );
    }
    return options;
}


class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <span className="navbar-brand">Refill My MetoCard</span>
            </nav>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0.00,
            fare: 2.75,
        }
    }

    optionsChange(options) {
        this.setState({
            balance: parseFloat(options.balance) || 0,
            fare: parseFloat(options.fare)
        })
    }

    render() {
        let fares = recalculateFares(
            parseFloat(this.state.balance),
            parseFloat(this.state.fare)
        )
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <HelpText/>
                    <Options onChange={this.optionsChange.bind(this)} fare={this.state.fare} balance={this.state.balance}></Options>
                    <FareTable fares={fares}></FareTable>
                </div>
                <div className="footer">
                    An open-source effort by <a href="http://www.cameronmaske.com">@cameronmaske</a>.
                    <br></br>
                    <a href="https://github.com/cameronmaske/metro-card-recharge">Contributions welcome</a>.
                </div>
            </div>
        )
    }
}

export default App