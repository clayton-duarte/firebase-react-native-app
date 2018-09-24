import { Alert } from 'react-native';
import moment from 'moment';

import { LOG_IN, LOG_OUT, REGISTRY } from './types';
import Firebase from '../firebase.config';
import { getPosition } from '../utils';

// INSTANCES
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
    .catch(error => console.log(error));
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
    console.log(error);
    callback();
  });
};

export const createUserWithEmailAndPassword = params => dispatch => {
  // SETUP
  const { email, password, displayName } = params;
  // REQUEST
  Auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(updateProfile({ displayName }));
    })
    .catch(error => console.log(error));
};

export const signOut = () => dispatch => {
  // REQUEST
  Auth.signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT,
      });
    })
    .catch(error => console.log(error));
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
    .catch(error => console.log(error));
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
    .catch(error => console.log(error));
  // dispatch(getPreviousRegistry());
};

export const insertNewRegistry = params => async dispatch => {
  // SETUP
  const { registry: { history } } = params;
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
    .catch(error => console.log(error));
  dispatch(getPreviousRegistry());
};

export const getPreviousRegistry = () => dispatch => {
  // SETUP
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}`).once('value')
    .then((snapshot) => {
      const { profile, history } = snapshot.val() || {};
      const hours = Object.values(history);
      const days = Object.keys(history);
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
    .catch(error => console.log(error));
};