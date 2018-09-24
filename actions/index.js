import { Alert } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';

import { LOG_IN, LOG_OUT, REGISTRY, CLOCK } from './types';
import Firebase from '../firebase.config';
import { getPosition } from '../utils';

// INSTANCES
const Google = new firebase.auth.GoogleAuthProvider();
const Database = Firebase.database();
const Auth = Firebase.auth();
Auth.languageCode = 'pt-BR';

// AUTH
export const signInWithEmailAndPassword = params => dispatch => {
  // SETUP
  const { email, password } = params;
  // REQUEST
  Auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      const user = Auth.currentUser;
      dispatch(getPreviousRegistry());
      dispatch({
        type: LOG_IN,
        payload: {
          user,
        },
      });
    })
    .catch(error => console.log('signInWithEmailAndPassword', error));
};

export const verifyAuthentication = callback => dispatch => {
  // REQUEST
  Auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(getPreviousRegistry());
      dispatch({
        type: LOG_IN,
        payload: {
          user,
        },
      });
      console.log("Olá", user.displayName);
    }
    callback();
  }, (error) => {
    console.log('verifyAuthentication', error);
    callback();
  });
};

export const createUserWithEmailAndPassword = params => dispatch => {
  // SETUP
  const { email, password, ...profile } = params;
  // REQUEST
  Auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(updateProfile({ ...profile }));
    })
    .catch(error => console.log('createUserWithEmailAndPassword', error));
};

export const signOut = () => dispatch => {
  // REQUEST
  Auth.signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT,
      });
    })
    .catch(error => console.log('signOut', error));
};

export const updateProfile = params => dispatch => {
  const { displayName, ...profile } = params;
  // UPDATE AUTH
  Auth.currentUser.updateProfile({ displayName })
    .then(() => {
      const { uid } = user = Auth.currentUser;
      // UPDATE PROFILE
      Database.ref(`${uid}/profile`).set({ ...profile })
      .then(() => {
        dispatch(getPreviousRegistry());
      })
      .catch(error => console.log(error));
      console.log('USER:', user)
      dispatch({
        type: LOG_IN,
        payload: { user },
      });
    })
    .catch(error => console.log('updateProfile', error));
};

export const signInWithProvider = provider => dispatch => {
  // REQUEST
  Auth.signInWithPopup(provider).then(({ user }) => {
    // var token = result.credential.accessToken;
      dispatch({
        type: LOG_IN,
        payload: { user },
      });
  }).catch(error => console.log('signInWithProvider', error));
};

export const signInWithGoogle = () => dispatch => {
  // REQUEST
  dispatch(signInWithProvider(Google));
};

// REGISTRY
export const makeRegistry = params => dispatch => {
  // SETUP
  const { day, index, position } = params;
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}/history/${day}/${index}`).set(position)
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => console.log('makeRegistry', error));
  dispatch(getPreviousRegistry());
};

export const insertNewRegistry = params => async dispatch => {
  // SETUP
  let { registry: { history } } = params;
  if(!history) history = {};
  const position = await getPosition();
  if (!position) return alert('Precisamos da permissão de localização para poder registrar a hora com maior precisão. Por favor, permita o acesso para podermos continuar.')
  // PREPARE DATA
  const day = moment(position.timestamp).format('YYYYMMDD');
  if (!history[day]) history[day] = [];
  const index = history[day].length;
  if (index > 3) return Alert.alert(
    'Ops',
    'Todas as entradas deste dia já foram preenchidas',
    [
      { text: 'Voltar' },
      { text: 'Editar Dia' , onPress: () => router.navigate('Editar', { day })},
    ]
  )
  // REQUEST
  dispatch(makeRegistry({ day, index, position }));
};

export const editDay = params => dispatch => {
  // SETUP
  const { day, registry } = params;
  const { uid } = Auth.currentUser;
  const registryArray = Object.values(registry);
  // REQUEST
  Database.ref(`${uid}/${day}`).set(registryArray)
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => console.log('editDay', error));
  dispatch(getPreviousRegistry());
};

export const getPreviousRegistry = () => dispatch => {
  // SETUP
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}`).once('value')
    .then((snapshot) => {
      const { profile, history } = snapshot.val() || {};
      const prevHistory = history || {};
      const hours = Object.values(prevHistory);
      const days = Object.keys(prevHistory);
      hours.reverse();
      days.reverse();
      dispatch({
        type: REGISTRY,
        payload: {
          profile,
          history,
          hours,
          days,
        },
      })
    })
    .catch(error => console.log('getPreviousRegistry', error));
};

// CLOCK
export const internalClock = () => dispatch => {
  dispatch({
    type: CLOCK,
  });
};