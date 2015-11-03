import React from 'react';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: props.balance,
            fare: props.fare
        }
        console.log(props);
    }

    balanceChange(event) {
        this.setState({
            balance: event.target.value
        }, function(){
            this.props.onChange(this.state);
        });
    }

    fareChange(event) {
        this.setState({
            fare: event.target.value
        }, function(){
            this.props.onChange(this.state);
        });
    }

    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.balanceChange.bind(this)} value={this.state.balance} type="number" className="validate" step="0.05" min="0.0"/>
                            <label>Current Balance</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label>Fare</label>
                            <select className="browser-default" onChange={this.fareChange.bind(this)} value={this.state.fare}>
                                <option value="1.35">$1.35</option>
                                <option value="2.75">$2.75</option>
                                <option value="3.25">$3.25</option>
                                <option value="6.50">$6.50</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}