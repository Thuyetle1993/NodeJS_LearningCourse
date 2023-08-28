const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const morgan = require('morgan');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
// Middleware POST => PUT
const methodOverride = require('method-override');

// Connect to DB
db.connect();

// Template Engine
app.engine(
    'hbs',
    handlebars.engine({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// HTTP Logger
app.use(morgan('combined'));

// Change HTTP Method
app.use(methodOverride('_method'));

// Routes Init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
