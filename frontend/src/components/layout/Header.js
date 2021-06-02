import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'

import '../../App.css'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3 text-light text-center">
                    <div className="navbar-brand">
                        <Link to="/">
                            <span>E-COM</span>
                        </Link>
                    </div>
                </div>

                {/*<div className="col-12 col-md-6 mt-2 mt-md-0">*/}
                {/*    <Route render={({ history }) => <Search history={history} />} />*/}
                {/*</div>*/}

                <div className="col-12 col-md-6 mt-2 mt-md-0 text-light text-center">
                    <span> SELL FASTER, BUY SMARTER </span>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>

                            </div>


                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}


                </div>
            </nav>
            <div className="row justify-content-md-center header_side">

                <div className="col-md-auto">
                    <p className="text-center"> Find anything in <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <button type="button" className="btn btn-primary btn-sm">All Ivory Coast</button>
                    </p>
                    <Route render={({ history }) => <Search history={history} />} />
                </div>
            </div>

        </Fragment>
    )
}

export default Header
