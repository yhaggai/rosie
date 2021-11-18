import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const app = admin.initializeApp();
const auth = app.auth();
const db = admin.database();

export { app, auth, db, functions, admin };
