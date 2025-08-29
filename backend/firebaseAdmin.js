const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require("../serviceAccountKey.json");

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  admin,
  auth: getAuth(),
};
