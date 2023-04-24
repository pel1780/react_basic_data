import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = ({ gugun }) => {
    return (
        <header className='Header'>
            <h1><Link to='/'>부산 맛집 지도</Link></h1>
            <Nav gugun={gugun} />
        </header>
    )
}

export default Header;