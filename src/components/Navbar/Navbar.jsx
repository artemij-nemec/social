import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

function PresentationNavbar(props) {
    let mainMenu = props.mainMenu.map(
        menuItem => (
            <div className={s.default} key={menuItem.id}>
                <NavLink
                    to={menuItem.link}
                    activeClassName={s.active}>
                    {menuItem.name}
                </NavLink>
            </div>
        )
    )
    return (
        <nav className={s.nav}>
            {mainMenu}
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        mainMenu: state.navbarReducer.mainMenu
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}
const Navbar = connect(mapStateToProps, mapDispatchToProps)(PresentationNavbar)
export default Navbar