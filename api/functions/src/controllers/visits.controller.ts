import APIError from '../helpers/APIError'
import * as admin from 'firebase-admin';
import db, {auth} from '../db'

export const getVisit = async (req, res) => {
    const visitId = req.params.id;

    if (!visitId) {
        throw new APIError('Visit id required', 400);
    }

    const visit = await db.collection('visits').doc(visitId).get();

    if (!visit.exists) {
        throw new APIError('Visit not found', 404)
    }

    res.json({
        id: visit.id,
        data: visit.data()
    });
};
export const getVisits = async (req, res) => {
    let ref = db.collection('visits');
    let queryRef = undefined;
    if (req.query.user) {
        queryRef = ref.where('IdUser', '==', req.query.user);
    } else if (req.query.location) {
        queryRef = ref.where('IdLocation', '==', req.query.location);
    } else if (req.query.ad) {
        queryRef = ref.where('IdAd', '==', req.query.ad);
    } else {
        queryRef = ref
    }
    const visitsSnapshot = await queryRef.get();
    let visits = [];
    visitsSnapshot.forEach(
        (doc) => {
            visits.push({
                id: doc.id,
                data: doc.data(),
            });
        }
    );
    res.json(visits);
};

export const saveVisit = async (req, res) => {
    let data = {
        ...req.body,
        VisitedAt: admin.firestore.Timestamp.fromDate(new Date()),
    };

    const visitRef = await db.collection('visits').add(data);
    const visit = await visitRef.get();

    res.json({
        id: visitRef.id,
        data: visit.data()
    });
};
