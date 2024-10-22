import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', pin: '', errorMsg: '', onFailure: false}

  gettingUserName = e => {
    this.setState({
      userName: e.target.value,
    })
  }

  gettingPin = e => {
    this.setState({
      pin: e.target.value,
    })
  }

  upadteToken = jwtTkoken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtTkoken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({
      errorMsg,
      onFailure: true,
    })
  }

  loginIn = async e => {
    e.preventDefault()
    const {userName, pin} = this.state
    const userDetails = {user_id: userName, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.upadteToken(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {pin, userName, onFailure, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.loginIn}>
            <h1 className="login-heading">Welcome Back!</h1>
            <div className="form-control">
              <label htmlFor="userid" className="label">
                User ID
              </label>
              <input
                id="userid"
                className="input-is"
                type="text"
                placeholder="Enter User Id"
                onChange={this.gettingUserName}
                value={userName}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                PIN
              </label>
              <input
                id="password"
                className="input-is"
                type="password"
                placeholder="Enter PIN"
                onChange={this.gettingPin}
                value={pin}
              />
            </div>
            <button type="submit" className="button-element">
              Login
            </button>
            {onFailure && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
