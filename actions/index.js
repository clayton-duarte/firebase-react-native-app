import { Alert } from 'react-native';

import { LOG_IN, LOG_OUT, REGISTRY } from './types';
import Firebase from '../firebase.config';
import moment from 'moment';

// INSTANCES
const Database = Firebase.database();
const Auth = Firebase.auth();

// AUTH
export const signInWithEmailAndPassword = params => async dispatch => {
  // SETUP
  const { email, password } = params;
  // REQUEST
  Auth.signInWithEmailAndPassword(email, password)
    .then(async () => {
      const user = Auth.currentUser;
      dispatch(getPreviousRegistry());
      dispatch({
        type: LOG_IN,
        payload: {
          user,
        },
      });
    })
    .catch(error => console.log(error));
};

verifyAuthentication

export const verifyAuthentication = callback => async dispatch => {
  // REQUEST
  Auth.onAuthStateChanged(async (user) => {
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
    console.log(error);
    callback();
  });
};

export const createUserWithEmailAndPassword = params => async dispatch => {
  // SETUP
  const { email, password } = params;
  // REQUEST
  Auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      alert(JSON.stringify(response))
      dispatch({
        type: LOG_IN,
        payload: response,
      });
    })
    .catch(error => console.log(error));
};

export const signOut = () => async dispatch => {
  // SETUP
  // REQUEST
  Auth.signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT,
      });
    })
    .catch(error => console.log(error));
};

export const updateProfile = params => async dispatch => {
  // SETUP
  // REQUEST
  Auth.currentUser.updateProfile(params)
    .then(response => {
      const user = response;
      dispatch({
        type: LOG_IN,
        payload: {
          user,
        },
      });
    })
    .catch(error => console.log(error));
};

// REGISTRY
export const makeRegistry = params => async dispatch => {
  // SETUP
  const { day, index, hour } = params;
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}/${day}/${index}`).set(hour)
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => console.log(error));
  dispatch(getPreviousRegistry());
};

export const insertNewRegistry = params => async dispatch => {
  // SETUP
  const { registry: { history } } = params;
  // PREPARE DATA
  const day = moment().format('YYYYMMDD');
  const hour = moment().format('H:mm:ss');
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
  dispatch(makeRegistry({ day, hour, index }));
};

export const editDay = params => async dispatch => {
  // SETUP
  const { day, registry } = params;
  const { uid } = Auth.currentUser;
  const registryArray = Object.values(registry);
  // REQUEST
  Database.ref(`${uid}/${day}`).set(registryArray)
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => console.log(error));
  dispatch(getPreviousRegistry());
};

export const getPreviousRegistry = () => async dispatch => {
  // SETUP
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}`).once('value')
    .then((snapshot) => {
      const history = snapshot.val() || {};
      const hours = Object.values(history);
      const days = Object.keys(history);
      hours.reverse();
      days.reverse();
      dispatch({
        type: REGISTRY,
        payload: {
          history,
          hours,
          days,
        },
      })
    })
    .catch(error => console.log(error));
};