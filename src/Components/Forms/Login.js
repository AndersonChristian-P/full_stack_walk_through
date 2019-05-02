import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class Login extends Component {

  componentDidMount() {
    if (this.props.username) { // only occurs if we have logged in and have a username
      this.props.history.push("/info")
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Login))

// withRouter() gives us the ability to access this.props.history






// {this.props.children} says I don't care what's passed through just display it