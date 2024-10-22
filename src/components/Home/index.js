import {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  gettingDelete = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
          <button
            type="button"
            className="logout-button"
            onClick={this.gettingDelete}
          >
            Logout
          </button>
        </div>
        <div className="bank-container">
          <h1 className="bank-heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
