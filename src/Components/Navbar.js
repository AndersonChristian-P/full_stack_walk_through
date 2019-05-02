import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const Navbar = ({ username }) => ( // the component assumes that this.props.username is equal to {username}
  <nav>
    <span>the bank</span>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login" >Login</Link>
      </li>
    </ul>
    {username && <div>Welcome, {username}</div>}
  </nav>
)

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(Navbar)



// {username && <div>Welcome, {username}</div>}  | as long as we have a username (truthy) display <div>Welcome, {username}</div>