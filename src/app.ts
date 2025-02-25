import express from 'express';
import routes from './routes/apiRoutes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/warehouse', routes());

app.get('/', (req, res) => {
  res.send('Server is running ...');
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
