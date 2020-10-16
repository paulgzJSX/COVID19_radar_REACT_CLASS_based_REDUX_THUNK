import React, { Component } from 'react'
import TableHeaderColumn from './TableHeaderColumn'
import { connect } from 'react-redux'
import { clearArrows } from '../helpers/HelperFunctions'


const columns = [
    { title: 'Country', className: 'country title' },
    { title: 'Total', className: 'total title' },
    { title: 'Active', className: 'active title' },
    { title: 'Recovered', className: 'recovered title' },
    { title: 'R-Rate', className: 'recovery-rate title' },
    { title: 'Deaths', className: 'deaths title' },
    { title: 'D-Rate', className: 'death-rate title' },
]


class TableHeader extends Component {

    handleDelete = () => {
        this.props.deleteAll()
        clearArrows()
    }

    render() {
        return (
            <div className='table-header'>
                {columns.map(column =>
                    <TableHeaderColumn
                        key={column.title}
                        column={column}
                        isSelected={this.props.currentColumn === column.className}
                    />)
                }
                <div className="delete">
                    <a href="#" className="clear-all" onClick={this.handleDelete}>Clear</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentColumn: state.currentColumn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteAll: () => dispatch({ type: 'DELETE_ALL' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);