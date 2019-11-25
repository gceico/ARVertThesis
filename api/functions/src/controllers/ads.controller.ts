import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db from '../db'

export const getAd = async (req, res) => {
    const adId = req.params.id;

    if (!adId) {
        throw new APIError('Ad id required', 400);
    }

    const ad = await db.collection('ads').doc(adId).get();

    if (!ad.exists) {
        throw new APIError('Ad not found', 404)
    }

    res.json({
        id: ad.id,
        data: ad.data()
    });
};
export const getAds = async (req, res) => {
    let ref = db.collection('ads');
    let queryRef = undefined;
    if (req.query.user) {
        queryRef = ref.where('IdUser', '==', req.query.user);
    } else {
        queryRef = ref
    }
    const adsSnapshot = await queryRef.get();
    let ads = [];
    adsSnapshot.forEach(
        (doc) => {
            const data = doc.data();
            const plan = data.Plan;
            console.log(plan);
            ads.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );

    res.json(ads);
};
export const saveAd = async (req, res) => {
    let data = {
        ...req.body,
        CreatedAt: admin.firestore.Timestamp.fromDate(new Date()),
        UpdatedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };
    data.EndAt = admin.firestore.Timestamp.fromDate(new Date(data.EndAt));

    const adRef = await db.collection('ads').add(data);
    const ad = await adRef.get();

    res.json({
        id: adRef.id,
        data: ad.data()
    });
};
export const updateAd = async (req, res) => {
    const adId = req.params.id;

    if (!adId) {
        throw new APIError('Ad id required', 400);
    }

    let data = {
        ...req.body,
    };
    const adRef = await db.collection('ads')
        .doc(adId)
        .set(data, { merge: true });

    res.json({
        id: adId,
        data
    })
};
export const deleteAd = async (req, res) => {
    const adId = req.params.id;

    if (!adId) {
        throw new APIError('Ad id required', 400);
    }

    await db.collection('ads')
        .doc(adId)
        .delete();

    res.json({
        id: adId,
    })
};