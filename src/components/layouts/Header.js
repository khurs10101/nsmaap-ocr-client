import React from 'react'
import {NavLink} from 'react-router-dom'
import '../../styles/Header.css'

const Header= ()=>(
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/crop">Crop</NavLink>
                </li>
                <li>
                    <NavLink to="/ocr">OCR</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
)


export default Header