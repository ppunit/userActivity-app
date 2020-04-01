import React from 'react'
import { connect } from 'react-redux'
import loginimg from "./download.svg"
import './style.scss'
import {
    Redirect,
} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.isAuthenticate = this.isAuthenticate.bind(this)
    }
    onSubmit(type, event) {
        this.props.dispatch({ type: type, target: event.target.value })
    }
    isAuthenticate(event) {
        event.preventDefault();
        if (this.props.username === "admin" && this.props.password === "admin") {
            document.getElementById('user101').style.display = 'none'
            this.props.dispatch({ type: "onLoginSuccess", target: true })
        }
        else {
            document.getElementById('user101').style.display = 'block'
            this.props.dispatch({ type: "onLoginSuccess", target: false })
        }
    }

    render() {
        if (this.props.isLoginSuccess) {
            return <Redirect to='/dashboard' push />;
        }

        return (
            <div className="App-login">
                <div className="login">
                    <div className="container">
                        <div className="base-container">
                            <div className='header'>UserActivity Login</div>
                            <div className="content">
                                <div className="image">
                                    <img src={loginimg} alt="#"></img>
                                </div>
                                <div className="form">
                                    <div className="form-group">
                                        <div className="error-on-login" id="user101"><span>Invalid username or password</span></div>
                                        <form onSubmit={(e) => this.isAuthenticate(e)} method="Post">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" name="username" placeholder="Username" onChange={(e) => this.onSubmit("username", e)} required />
                                            <br></br>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" placeholder="Password" onChange={(e) => this.onSubmit("password", e)} required />
                                            <button type="submit" className="btn" >Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoginSuccess: state.isLoginSuccess,
        username: state.username,
        password: state.password,

    }
}

export default connect(mapStateToProps)(Login);
