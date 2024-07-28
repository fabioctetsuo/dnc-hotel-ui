const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const MOCKED_SECRET = "your-secret-key";

app.db = router.db;

app.use(jsonServer.bodyParser);

app.post('/auth/login', (req, res) => {
    const body = req.body;
    
    const user = app.db
        .get('users')
        .find({ email: body.email, password: body.password })
        .value();

    if (user) {
        const access_token = jwt.sign(
            { email: user.email, sub: user.id },
            MOCKED_SECRET,
            { expiresIn: '1h'}
        )

        res.status(201).jsonp({ access_token })
    } else {
        res.status(401).jsonp({ message: 'Not authorized' })
    }
})

app.use(router);
app.listen(3000);