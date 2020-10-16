import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/fetchData'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayDropdown: false,
            displayAutocomplete: false,
            input: '',
            matches: [],
            length: undefined,
            focus: undefined,
            isMouseOver: false
        }
        this.ulRef = createRef()
        this.inputRef = createRef()
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside = (e) => {
        if (this.ulRef.current && !this.ulRef.current.contains(e.target) && !this.inputRef.current.contains(e.target)) {
            this.setState({
                displayDropdown: false,
                displayAutocomplete: false,
                input: '',
                length: undefined,
                focus: undefined
            })
        }
    }

    handleInputClick = () => {
        this.setState({
            displayDropdown: !this.state.displayDropdown,
            focus: undefined
        })
        this.state.displayAutocomplete && this.setState({ displayAutocomplete: false })
    }

    handleChange = (e) => {
        if (e.target.value) {
            this.setState({
                input: e.target.value,
                displayDropdown: false
            })

            let matches = this.props.serverCountries.filter(ctry => ctry.name.toLowerCase().startsWith(e.target.value.toLowerCase()))

            if (matches.length) {
                this.setState({
                    displayAutocomplete: true,
                    matches,
                    length: matches.length
                })
            } else {
                this.setState({
                    displayAutocomplete: false,
                    matches: [],
                    length: undefined
                })
            }
        } else {
            this.setState({
                displayAutocomplete: false,
                input: '',
                matches: [],
                length: undefined,
                focus: undefined
            })
        }
    }

    moveToNextEl = pos => {
        this.setState({ focus: pos })
        this.ulRef.current.children[pos].scrollIntoView({ behavior: 'auto', block: 'center' })
    }

    handleKeyPress = e => {
        const { matches, length, displayDropdown, displayAutocomplete, focus } = this.state

        matches.length > 0
            ? this.setState({ length: matches.length })
            : this.setState({ length: this.props.serverCountries.length })

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            !displayDropdown && !displayAutocomplete && this.setState({ displayDropdown: true })

            if (focus === undefined && e.key === 'ArrowUp') {
                this.setState({ focus: length - 1 })
            } else if (focus === undefined && e.key === 'ArrowDown') {
                this.setState({ focus: 0 })
            } else {
                if (focus === 0) {
                    e.key === 'ArrowUp' ? this.moveToNextEl(length - 1) : this.moveToNextEl(focus + 1)
                } else if (focus === length - 1) {
                    e.key === 'ArrowUp' ? this.moveToNextEl(focus - 1) : this.moveToNextEl(0)
                } else {
                    e.key === 'ArrowUp' ? this.moveToNextEl(focus - 1) : this.moveToNextEl(focus + 1)
                }
            }
        }

        if (e.key === 'Enter') {
            this.ulRef.current && focus !== undefined && this.checkDuplicatesAndFetch(this.ulRef.current.children[focus].innerText)
        }
    }

    handleMouseOver = () => {
        this.setState({
            isMouseOver: true,
            focus: undefined
        })
    }

    checkDuplicatesAndFetch = (country) => {
        const { countries, fetchData } = this.props

        if (countries.findIndex(ctry => ctry.country === country) === -1) {
            fetchData(country)
            this.setState({
                displayAutocomplete: false,
                displayDropdown: false,
                input: '',
                matches: [],
                focus: undefined,
                isMouseOver: false
            })
        } else {
            alert('Already in the list')
        }
    }

    display = (arr) => {
        return (
            <ul ref={this.ulRef} className={this.state.displayAutocomplete ? 'search-results' : 'search-results max-height'}>
                {arr.map((ctry, idx) =>
                    <li
                        key={idx}
                        onClick={e => this.checkDuplicatesAndFetch(e.target.innerText)}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={() => this.setState({ isMouseOver: false })}
                        className={idx === this.state.focus && !this.state.isMouseOver ? 'selected' : null}
                    >
                        {ctry.name}
                    </li>)
                }
            </ul>
        )
    }

    render() {
        const { displayDropdown, displayAutocomplete } = this.state

        return (
            <div className="search-input">
                <input
                    ref={this.inputRef}
                    type="text"
                    placeholder='Select country'
                    id="input"
                    autoComplete="off"
                    value={this.state.input}
                    onClick={this.handleInputClick}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyPress}
                />
                {displayDropdown && this.display(this.props.serverCountries)}
                {displayAutocomplete && this.display(this.state.matches)}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        countries: state.countries,
        serverCountries: state.serverCountries
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: country => dispatch(fetchData(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)