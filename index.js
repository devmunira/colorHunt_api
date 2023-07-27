import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectMongoDB from './src/config/db.js';
import { notFoundHandellar, globalErrorHandellar } from './src/middleware/errorHandler.js';
import {middleware} from './src/middleware/presetMiddleware.js';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import router from './src/routes/index.js';
const swaggerSpec = YAML.load('./swagger.yaml')


dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Global middleware set
app.use(middleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route
app.use('/api/v1' , router)


// Global error handler
app.use([notFoundHandellar, globalErrorHandellar]);

// Connect with DB and Server listening
connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${PORT}`.green);
    });
  })
  .catch((err) => console.log(err.message.red));
