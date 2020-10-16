import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableRow extends Component {
    handleClick = () => {
        this.props.deleteRow(this.props.ctry.country)
    }

    render() {
        const { ctry } = this.props

        return (
            <div className='table-row'>
                <div className="country">
                    {ctry.iso2 && <img src={require(`../images/flags/${ctry.iso2}.svg`)} alt="" />}
                    <p>{ctry.country}</p>
                </div>
                <div className="total">
                    {ctry.total > 500000
                        ? <p style={{ background: 'red', color: 'white', opacity: .4 }}>{ctry.total.toLocaleString()}</p>
                        : <p>{ctry.total.toLocaleString()}</p>}
                </div>
                <div className="active">
                    <p>{ctry.active.toLocaleString()}</p>
                </div>
                <div className="recovered">
                    <p>{ctry.recovered.toLocaleString()}</p>
                </div>
                <div className="recovery-rate">
                    <p>{ctry.recoveryrate}%</p>
                </div>
                <div className="deaths">
                    <p>{ctry.deaths.toLocaleString()}</p>
                </div>
                <div className="death-rate">
                    <p>{ctry.deathrate}%</p>
                </div>
                <div className="delete" onClick={this.handleClick}>
                    <span className='delete-btn'>
                        <i id='delete' data-country='Spain' className="fa fa-minus-circle" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteRow: country => dispatch({ type: 'DELETE_COUNTRY', country })
    }
}


export default connect(null, mapDispatchToProps)(TableRow);