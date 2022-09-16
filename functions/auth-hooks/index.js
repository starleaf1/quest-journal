const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const colors = require("../libs/colors");
const { purple } = require("../libs/colors");

const firestore = getFirestore();
const onUserSignUp = functions.auth.user().onCreate(async (user) => {
  try {
    const myColors = {
      red: colors.red.base,
      lightRed: colors.red.lighten5,
      green: colors.green.base,
      lightGreen: colors.green.lighten5,
      blue: colors.blue.base,
      lightBlue: colors.blue.lighten5,
      yellow: colors.yellow.base,
      orange: colors.orange.base,
      purple,
    };
    await firestore.doc(`userData/${user.uid}`).set({ registered: new Date() });

    const batch = firestore.batch();
    Object.keys(myColors).forEach((k) => {
      batch.create(firestore.doc(`userData/${user.uid}/categories/${k}`), {
        color: myColors[k],
        category: k,
      });
    });

    await batch.commit();
  } catch (e) {
    console.error("[on-user-signup-trigger]", e);
  }
});

module.exports = {
  onUserSignUp,
};
