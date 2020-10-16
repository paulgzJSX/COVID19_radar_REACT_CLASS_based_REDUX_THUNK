import React, { Component } from 'react'
import image from '../images/covid.jpg'

class Header extends Component {
    render() {
        return (
            <header>
                <h2>C<img src={image} className='header-img' alt="" />VID-19 Radar</h2>
            </header>
        );
    }
}

export default Header;