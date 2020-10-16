import React, { Component } from 'react'
import TableRow from './TableRow'
import { connect } from 'react-redux'

class TableContent extends Component {
    render() {
        const { countries } = this.props

        return (
            <div className='table-content'>
                {countries.length > 0 && countries.map(ctry => <TableRow key={ctry.country} ctry={ctry} />)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.countries
    }
}

export default connect(mapStateToProps)(TableContent);