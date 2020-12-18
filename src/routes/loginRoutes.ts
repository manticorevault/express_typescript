import { Router, Request, Response } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
        <div> 
            <label> Email </label>
            <input name="email"/>
        </div>

        <div>
            <label> Password </label>
            <input name="password"/>
        </div>

        <button> Submit! </button>

    </form> 
  `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body

  // Really insecure login logic just to test the routing.
  if (email && password && email === 'art@gmail.com' && password === '123123') {
    // Mark the person as logged in.
    req.session = { loggedIn: true }
    // Redirect them to the root route.
    res.redirect('/')
  } else {
    res.send('Invalid credentials')
  }
})

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>
          You are logged in!
        </div>

        <a href="/logout"> Logout </a>
      </div>
    `)
  } else {
    res.send(`
    <div>
      <div>
        You are NOT logged in!
      </div>

      <a href="/login"> Login! </a>
    </div>
  `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

export { router }
