import * as NodeGeocoder from 'node-geocoder';
import {mapKey} from "../secret";
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: mapKey,
    formatter: null
};
export const geocoder = NodeGeocoder(options);

