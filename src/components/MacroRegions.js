import React, { Component } from 'react'
import { macro } from '../data/data'
import { clearArrows, trimRegionName, splitRegionName } from '../helpers/HelperFunctions'
import { connect } from 'react-redux'
import { fetchData } from '../actions/fetchData'


class MacroRegions extends Component {

    handleClick = (region) => {
        const { serverCountries, deleteAll, fetchData } = this.props
        clearArrows()

        if (region === 'GLOBAL') {
            deleteAll()
            serverCountries.map(ctry => fetchData(ctry.name))
        } else {
            deleteAll()
            macro[trimRegionName(region)].map(ctry => fetchData(ctry))
        }
    }
    render() {
        return (
            <div className='macro-regions'>
                <a href="#" onClick={e => this.handleClick(e.target.innerText)}>GLOBAL</a>
                {Object.keys(macro).map(region =>
                    <a
                        href="#"
                        key={region}
                        onClick={e => this.handleClick(e.target.innerText)}
                    >
                        {splitRegionName(region)}
                    </a>)
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        serverCountries: state.serverCountries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteAll: () => dispatch({ type: 'DELETE_ALL' }),
        fetchData: (country) => dispatch(fetchData(country))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MacroRegions);