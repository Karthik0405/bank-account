import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="page-found">Page Not Found</h1>
    <p className="page-found-family">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
