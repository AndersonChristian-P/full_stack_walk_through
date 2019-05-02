const bcrypt = require("bcryptjs")

module.exports = {
  getUsers: (req, res) => {
    const db = req.app.get("db")
    db.getAllUsers()
      .then((data) => {
        res.status(200).send(data)
      })
  },

  register: async (req, res) => {
    const db = req.app.get("db")

    const { email, firstname, lastname, username, password } = req.body
    const { session } = req
    let emailTaken = await db.checkEmail({ email }) // db always returns an array
    emailTaken = +emailTaken[0].count // emailTaken comes back as an array with an object | [{count: <some value>}]
    if (emailTaken !== 0) {
      return res.sendStatus(409)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user_id = await db.registerUser({
      email,
      firstname,
      lastname,
      username,
      hash
    }) // sends user info to the db

    session.user = {
      username,
      hash,
      login_id: user_id[0].balance_id
    } // adds the user to the session
    res.sendStatus(200)
  },

  login: async (req, res) => {
    const db = req.app.get("db")
    const { session } = req // you can pull session off of req
    const { loginUsername: username } = req.body
    // loginUsername is to differentiate between a register and login username
    try {
      let user = await db.login({ username }) // await returns an array
      session.user = user[0]
      const authenticated = bcrypt.compareSync(req.body.loginPassword, user[0].password)
      if (authenticated) {
        res.status(200).send({ authenticated, user_id: user[0].login_id })
      } else {
        throw new Error(401)
      }
    } catch (err) {
      res.sendStatus(401)
    }
  }
  // we don't destructure loginPassword off of req.body into it's own variable - bad practice
  // const authenticated returns a boolean
  // if authenticated is false throw new Error (401) and the catch
}
