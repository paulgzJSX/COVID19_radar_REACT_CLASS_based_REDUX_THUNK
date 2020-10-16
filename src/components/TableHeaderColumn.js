import React, { Component, createRef } from 'react';
import { connect } from 'react-redux'
import DownIcon from './DownIcon'
import UpIcon from './UpIcon'

class TableHeaderColumn extends Component {
    constructor(props) {
        super(props);
        this.titleRef = createRef()
    }

    handleClick = () => {
        const { countries, toggleSort, setCurrentColumn, sortDirection, sortAsc, sortDesc } = this.props

        if (countries.length) {
            toggleSort()

            const columnName = this.titleRef.current.classList[0].split('-').join('')
            setCurrentColumn(this.titleRef.current.classList.value)

            sortDirection ? sortDesc(columnName) : sortAsc(columnName)
        }
    }

    render() {
        const { column, isSelected, countries, sortDirection } = this.props

        return (
            <div ref={this.titleRef} className={column.className} onClick={this.handleClick}>
                {column.title === 'Country' && <h4>{column.title}</h4>}
                {countries.length > 1 && isSelected
                    ? sortDirection ? <DownIcon /> : <UpIcon />
                    : null
                }
                {column.title !== 'Country' && <h4>{column.title}</h4>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.countries,
        sortDirection: state.sortDirection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortDesc: (column) => dispatch({ type: 'SORT_DESC', field: column }),
        sortAsc: (column) => dispatch({ type: 'SORT_ASC', field: column }),
        toggleSort: () => dispatch({ type: 'TOGGLE_SORT_DIRECTION' }),
        setCurrentColumn: (column) => dispatch({ type: 'SET_CURRENT_COLUMN', column })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeaderColumn);