import React, { Component } from 'react'
import Search from './components/Search';
import Header from './components/Header';
import Table from './components/Table'
import MacroRegions from './components/MacroRegions';
import { connect } from 'react-redux'

class App extends Component {

  async componentDidMount() {
    const baseURL = 'https://covid19.mathdro.id/api'

    try {
      let { countries } = await (await fetch(baseURL + '/countries')).json()
      this.props.fetchCountries(countries)

    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <Search />
          <MacroRegions />
          <Table />
        </main>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCountries: (countries) => dispatch({ type: 'FETCH_COUNTRIES', countries })
  }
}

export default connect(null, mapDispatchToProps)(App);
