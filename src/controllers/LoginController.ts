import { Request, Response, NextFunction } from 'express'
import { get, controller, bodyValidator, post } from './decorators'

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
          <form method="POST">
              <div> 
                  <label> Email </label>
                  <input name="email"/>
              </div>
      
              <div>
                  <label> Password </label>
                  <input name="password" type="password"/>
              </div>
      
              <button> Submit! </button>
      
          </form> 
        `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body

    // Really insecure login logic just to test the routing.
    if (email === 'art@gmail.com' && password === '123123') {
      // Mark the person as logged in.
      req.session = { loggedIn: true }
      // Redirect them to the root route.
      res.redirect('/')
    } else {
      res.send('Invalid credentials')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}
