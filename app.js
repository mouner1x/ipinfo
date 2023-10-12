const express=require("express")
const geoip = require('geoip-lite');

const HOST = process.env.HOST || 'http://localhost';
const PORT = 4500

const app = express();

app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  const xRealIP = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(",")[0] : req.connection.remoteAddress;
  const info =geoip.lookup(xRealIP)
  res.status(200).json({msg:`your ip is ${xRealIP}`,info})
});

app.listen(PORT, () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});