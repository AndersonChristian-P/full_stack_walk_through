import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateUserId, updateUsername } from "../../redux/reducer"
import axios from "axios"

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      loginUsername: "",
      loginPassword: "",
      loginError: false,
      loginErrorMessage: "Username or password is incorrect. Please try again"
    }
  }

  handleFormInputUpdate = (event) => {
    let { value, name } = event.target
    this.setState({
      [name]: value,
      loginError: false
    })
  }

  handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    const { loginUsername, loginPassword } = this.state
    try {
      const res = await axios.post("/auth/login", { loginUsername, loginPassword })
      this.props.updateUsername(loginUsername)
      this.props.updateUserId(res.data.user_id)
      this.props.history.push("/info")
    } catch (err) {
      this.setState({
        loginUsername: "",
        loginPassword: "",
        loginError: true
      })
    }
  }

  // public class field syntax (also known as an arrow function) auto binds 'this'

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input
            type="text"
            name="loginUsername"
            placeholder="username"
            value={this.state.loginUsername}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type="text"
            name="loginPassword"
            placeholder="password"
            value={this.state.loginPassword}
            onChange={this.handleFormInputUpdate}
          />
          <button>Login</button>
        </form>
        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
      </>
    )
  }
}
// since we have a parent container div we can wrap our JSX in a fragment <> </>

const mapDispatchToProps = {
  updateUserId,
  updateUsername
}

export default connect(null, mapDispatchToProps)(withRouter(LoginForm))