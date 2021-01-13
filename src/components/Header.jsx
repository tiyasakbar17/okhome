import React from 'react'
import { useHistory } from 'react-router-dom'

function Header() {
    const history = useHistory();
    const homeHandler = () => {
        history.push("/")
    };
    const paymentHandler = () => {
        history.push("/2")
    };
    return (
        <div className="header pointer">
            <div className="logo" onClick={homeHandler} >
                <img src="/logo512.png" alt="Logo" className="images" />
            </div>
            <span className="headerItem pointer" onClick={homeHandler} >
                <strong>No.1</strong>
            </span>
            <span className="headerItem pointer" onClick={paymentHandler} >
                <strong>No.2</strong>
            </span>
        </div>
    )
}

export default Header
