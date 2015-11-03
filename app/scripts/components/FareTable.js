import React from 'react';

export default class FareTable extends React.Component {
    render() {
        var tableBody = this.props.fares.map(function(fare) {
            if (fare.payment > 0) {
                return (
                    <tr>
                        <td>{fare.ride}</td>
                        <td>${fare.payment}</td>
                        <td>${fare.remainder}</td>
                        <td>${fare.bonus}</td>
                    </tr>
                )
            }
        })

        return (
            <div className="row">
                <div className="col s12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Rides (#)</th>
                                <th>You Pay ($)</th>
                                <th>Remainder</th>
                                <th>Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

FareTable.defaultProps = {
    options: [],
}