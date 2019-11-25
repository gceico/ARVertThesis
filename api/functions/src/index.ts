import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import router from './routes';

const app = express();
const main = express();

main.use('/api/', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.use('/', router);