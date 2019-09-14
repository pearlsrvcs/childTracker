const functions = require('firebase-functions');
const admin = require('firebase-admin');
let message
admin.initializeApp({
  databaseURL: "https://childtracker.firebaseio.com"
});


exports.emergencyNotification = functions.firestore
  .document('notify/{location}/emergency/{date}/Notification/{time}')
  .onWrite((change, context) => {
    const msg = change.after.data().message;
    const title = change.after.data().title;

      const payload = {
        data: {
          body: msg,
          title: 'Notification ' + title ,
          priority: 'high',
          emergencyLevel: '0',
          color: 'red',
        }
      };
      //console.log(context.params.location);
      loc = context.params.location
      const dbLocation = 'notify/' + loc + '/tokens';
      let tokens = [];
      admin.firestore().collection(dbLocation).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // //console.log('Token ID: ',doc.data().tokenId);
          tempID = doc.data().tokenId;
          tokens.push(tempID);
        })
        admin.messaging().sendToDevice(tokens, payload)
        .then((response) => {
          console.log(`Successfully sent message: {response}`);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
      })
      return Promise.resolve();
    });

    exports.emailLogNotification = functions.firestore
      .document('log/{time}')
      .onWrite((change, context) => {
        msg = change.after.data().message;
        const mailTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kim.mosher@nside.io',
            pass: 'lejzzvexnvisawrw',
          },
        });

        const mailOptions = {
          from: '"nSide, Inc',
          to: 'kim.mosher@nside.io',
        };
        mailOptions.subject = 'An Error has occurred on nSideNotify'
        mailOptions.text = msg
        try {
          mailTransport.sendMail(mailOptions);
          console.log(`logEmail sent to kim.mosher@nside.io: ${msg}`);
        } catch(error) {
          console.error('There was an error while sending the email:', error);
        }
        return null;
        });
