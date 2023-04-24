import React from 'react'
import { Link } from 'react-router-dom';

const Nav = ({ gugun }) => {
    return (
        <nav>
            <ul>
                {
                    gugun.map((it, idx) => <li key={idx}><Link to={`/${it}`}>{it}</Link></li>)
                }
            </ul>
        </nav>
    )
}

export default Nav;