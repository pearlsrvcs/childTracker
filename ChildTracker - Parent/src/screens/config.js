import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import rnfirebase from 'react-native-firebase';
//import { firebaseConfig } from './config/firebase';

const GLOBAL = require('../Globals');

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCJifH-46GRw3E8i1rU8Bd438Gl8V6S1yk',  
        projectId: 'childtracker', 
        token: 'AAAAcyS9VuM:APA91bFqiWF6_rBhFgZ_nEp4ABOEayLwIbumKiNzRCVbBC00WHtjF9vt7xlgAo_NA5EDMm4I_6dPCKgMj8KhsLB3X9cYJzuHSpiJavusIbn4p6RFruFU-0yGUFpphnOnYdjOR43gmuLY',
        senderID: '494537627363',
        storageBuicket: 'childtracker.appspot.com'
        });
      const firestore = firebase.firestore();
      const messaging = rnfirebase.messaging();
      const settings = { timestampsInSnapshots: true  };
      firestore.settings(settings);
      this.app = firestore;
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService().app;
export default firebaseService;