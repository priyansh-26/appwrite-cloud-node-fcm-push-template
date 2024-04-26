import admin from 'firebase-admin'

// initailze firebase app
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FCM_PROJECT_ID,
    clientEmail: process.env.FCM_CLIENT_EMAIL,
    privateKey: process.env.FCM_PRIVATE_KEY,
  }),
  databaseURL: process.env.FCM_DATABASE_URL,
});

/**
 * Throws an error if any of the keys are missing from the object
 * @param {*} obj
 * @param {string[]} keys
 * @throws {Error}
 */
export function throwIfMissing(obj, keys) {
  const missing = [];
  for (let key of keys) {
    if (!(key in obj) || !obj[key]) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * @param {admin.messaging.Message} payload
 * @returns {Promise<string>}
 */
export async function sendPushNotification(payload) {
  console.log(`Sending message to device: ${payload.token}`);
  console.log(`Notification title: ${payload.notification.title}`);
  console.log(`Notification data: ${payload.data}`);
 console. log(`Message: ${JSON.stringify(payload)}`);
 console.log(process.env.FCM_PROJECT_ID)
 console.log(process.env.FCM_CLIENT_EMAIL)
 console.log(process.env.FCM_PRIVATE_KEY)
 console.log(process.env.FCM_DATABASE_URL)
  try {
    return await admin.messaging().send(payload);
  }
  catch (e) {
    throw (`error on messaging ${e}`)
  }
}
