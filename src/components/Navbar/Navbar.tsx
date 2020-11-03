import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootStateType } from '../../redux/redux-store';
import { NavigationElementType } from '../../types/types';
import s from './Navbar.module.css';

type PropsType = {
    mainMenu: Array<NavigationElementType>
}
const PresentationNavbar: React.FC<PropsType> = props => {
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

const mapStateToProps = (state: RootStateType): PropsType => ({
    mainMenu: state.navbarReducer.mainMenu
})

const Navbar = connect<PropsType, {}, {}, RootStateType>(
    mapStateToProps,
    {}
)(PresentationNavbar)

export default Navbar