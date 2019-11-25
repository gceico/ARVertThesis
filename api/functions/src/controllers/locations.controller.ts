import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db from '../db'
// import {geocoder} from '../helpers/helpers'

export const getLocation = async (req, res) => {
    const locationId = req.params.id;

    if (!locationId) {
        throw new APIError('Location id required', 400);
    }

    const location = await db.collection('locations').doc(locationId).get();

    if (!location.exists) {
        throw new APIError('Location not found', 404)
    }

    res.json({
        id: location.id,
        data: location.data()
    });
};
export const getLocations = async (req, res) => {
    let ref = db.collection('locations');
    let queryRef = undefined;
    if (req.query.user) {
        queryRef = ref.where('IdUser', '==', req.query.user);
    } else {
        queryRef = ref
    }
    const locationsSnapshot = await queryRef.get();
    let locations = [];
    locationsSnapshot.forEach(
        (doc) => {
            const data = doc.data()
            locations.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );

    res.json(locations);
};
export const saveLocation = async (req, res) => {
    // const locationAddress = await geocoder.geocode(req.body.Address);
    // const coordinates = {
    //     _latitude: locationAddress.latitude,
    //     _longitude: locationAddress.longitude
    // };
    let data = {
        ...req.body,
        // Coordinates: coordinates,
        CreatedAt: admin.firestore.Timestamp.fromDate(new Date()),
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    const locationRef = await db.collection('locations').add(data);
    const location = await locationRef.get();

    res.json({
        id: locationRef.id,
        data: location.data()
    });
};
export const updateLocation = async (req, res) => {
    const locationId = req.params.id;

    if (!locationId) {
        throw new APIError('Location id required', 400);
    }
    // const locationAddress = await geocoder.geocode(req.body.Address);
    //
    // const coordinates = {
    //     _latitude: locationAddress.latitude,
    //     _longitude: locationAddress.longitude
    // };
    let data = {
        ...req.body,
        // Coordinates: coordinates,
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    const locationRef = await db.collection('locations')
        .doc(locationId)
        .set(data, {merge: true});

    res.json({
        id: locationId,
        data
    })
};
export const deleteLocation = async (req, res) => {
    const locationId = req.params.id;

    if (!locationId) {
        throw new APIError('Location id required', 400);
    }

    await db.collection('locations')
        .doc(locationId)
        .delete();

    res.json({
        id: locationId,
    })
};