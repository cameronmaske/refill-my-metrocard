import React from 'react';

class FareHeader extends React.Component {
    render() {
        return (
            <div className="fare-header">
                <div className="ride">
                    Rides
                </div>
                <div className="you-pay">
                    You Pay
                </div>
                <div className="bonus">
                    Bonus
                </div>
                <div className="remainder">
                    Remainder
                </div>
            </div>
        )
    }
}


class FareItem extends React.Component {
    render() {
        let classes = "fare-item";
        let label = null;
        if (this.props.remainder == 0 && this.props.bonus > 0) {
            classes += " best";
            label = <div className="fare-item-label">No remainder</div>;
        }
        return (
            <div>
                {label}
                <div className={classes}>
                    <div className="ride">
                        {this.props.ride}
                    </div>
                    <div className="you-pay">
                        ${this.props.payment.toFixed(2)}
                    </div>
                    <div className="bonus">
                        ${this.props.bonus.toFixed(2)}
                    </div>
                    <div className="remainder">
                        ${this.props.remainder.toFixed(2)}
                    </div>
                </div>
            </div>
        )
    }
}

export default class FareTable extends React.Component {
    render() {
        var fareList = this.props.fares.map(function(fare) {
            if (fare.payment > 0) {
                return (
                    <FareItem ride={fare.ride} payment={fare.payment} bonus={fare.bonus} remainder={fare.remainder}/>
                )
            }
        })

        return (
            <div>
                <FareHeader/>
                {fareList}
            </div>
        )
    }
}

FareTable.defaultProps = {
    options: [],
}