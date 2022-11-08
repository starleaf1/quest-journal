const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const colors = require("../libs/colors");

const firestore = getFirestore();
const onUserSignUp = functions.auth.user().onCreate(async (user) => {
  try {
    const myColors = {
      red: colors.red.darken2,
      lightRed: colors.red.base,
      green: colors.green.darken2,
      lightGreen: colors.green.base,
      blue: colors.blue.darken2,
      lightBlue: colors.blue.base,
      yellow: colors.yellow.darken2,
      orange: colors.orange.darken2,
      purple: colors.purple.darken2,
      list1: '#233D4D',
      list2: '#FE7F2D',
      list3: '#FCCA46',
      list4: '#29371B',
      list5: '#477164',
      list6: '#513B3C'
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
