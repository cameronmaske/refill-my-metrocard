import React from 'react';

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: props.balance,
            fare: props.fare
        }
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
                <div className="options">
                    <form>
                        <fieldset className="form-group">
                            <label>Fare</label>
                            <select className="form-control" onChange={this.fareChange.bind(this)} value={this.state.fare}>
                                <option value="1.35">$1.35 (Senior Fare)</option>
                                <option value="2.75">$2.75 (Regular Fare)</option>
                                <option value="3.25">$3.25 (Senior Express Bus)</option>
                                <option value="6.50">$6.50 (Regular Express Bus)</option>
                            </select>
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Current Balance</label>
                            <div className="prefix-form-control">
                                <span className="prefix">$</span>
                                <input className="form-control" onChange={this.balanceChange.bind(this)} value={this.state.balance} type="number" pattern="[\d\.]*" inputmode="numeric" step="0.05" min="0.0"/>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}