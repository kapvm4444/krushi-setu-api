const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const documentRouter = require('./routes/documentRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const adminPanelRouter = require('./routes/adminPanelRoute');

const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(helmet());

//Development logging (logs)
//if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//limit the number of requests of APIs in a specific period of time
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many requests from this IP, please wait for a few hour before you log in again',
});
app.use('/api', limiter);

//body parser - reading data from req.body
app.use(express.json({ limit: '10kb' }));

//sanitize the data (when someone try to get access without entering proper email and password)
app.use(mongoSanitize());

//block XSS (cross-site scripting attacks)
app.use(xss());

// block http parameters pollutions (hpp) [when someone try to give multiple same parameters in URL]
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'ratingsQuantity',
      'difficulty',
      'price',
    ],
  }),
);

console.log(`${process.env.NODE_ENV} from app,js`);

app.get('/', (req, res) => {
  res.end('Welcome to Krushi-Setu');
});

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/documents', documentRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/admin', adminPanelRouter);

app.use(globalErrorHandler);

module.exports = app;
