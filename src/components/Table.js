import React, { Component } from 'react'
import TableHeader from './TableHeader'
import TableContent from './TableContent'

class Table extends Component {
    render() {
        return (
            <div className='table'>
                <TableHeader />
                <TableContent />
            </div>
        );
    }
}

export default Table;