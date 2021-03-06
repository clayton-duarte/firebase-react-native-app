import { Permissions, Notifications } from 'expo';
import { Alert, Vibration } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';

import Firebase from '../firebase.config';
import { getPosition } from '../utils';
import {
  LOG_IN, LOG_OUT, REGISTRY, CLOCK, NOTIFICATION_TOKEN, NOTIFICATION_SEND,
} from './types';

// INSTANCES
const Google = new firebase.auth.GoogleAuthProvider();
const Database = Firebase.database();
const Auth = Firebase.auth();
Auth.languageCode = 'pt-BR';

// VIBRATION PATTERN
const vibrate = () => Vibration.vibrate([500, 500, 500]);

// NOTIFICATIONS
export const registerForPushNotifications = () => async (dispatch) => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return Alert.alert('Erro!', `notification permission status: ${finalStatus}`);

  const token = await Notifications.getExpoPushTokenAsync();
  // this.subscription = Notifications.addListener(this.handleNotification);
  return dispatch({
    type: NOTIFICATION_TOKEN,
    payload: { token },
  });
};

export const sendPushNotification = ({ token, title, body }) => async dispatch => fetch('https://exp.host/--/api/v2/push/send', {
  body: JSON.stringify({
    data: { message: `${title} - ${body}` },
    title,
    body,
    to: token,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
}).then(
  dispatch({
    type: NOTIFICATION_SEND,
    // payload: {}
  }),
);

// REGISTRY
export const getPreviousRegistry = () => (dispatch) => {
  // SETUP
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}`).once('value')
    .then((snapshot) => {
      // RETRIEVE INFORMATION
      const { profile, history } = snapshot.val() || {};
      const prevHistory = history || {};
      // PARSE DATA
      const days = Object.keys(prevHistory);
      const dirtyMonths = days.map(day => day.substring(0, 6));
      const months = dirtyMonths.filter((item, index, self) => (self.indexOf(item) === index));
      // REVERSE DATA (FOR DECRESCENT TIME)
      days.reverse();
      months.reverse();
      dispatch({
        type: REGISTRY,
        payload: {
          profile,
          history,
          months,
          days,
        },
      });
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

export const makeRegistry = params => (dispatch) => {
  // SETUP
  const { day, index, position } = params;
  const { uid } = Auth.currentUser;
  // REQUEST
  Database.ref(`${uid}/history/${day}/${index}`).set(position)
    .then(() => {
      vibrate();
      dispatch(getPreviousRegistry());
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
  dispatch(getPreviousRegistry());
};

export const insertNewRegistry = params => async (dispatch) => {
  // SETUP
  const { router } = params;
  let { registry: { history } } = params;
  if (!history) history = {};
  const position = await getPosition();
  if (!position) return Alert.alert('Precisamos da permissão de localização para poder registrar a hora com maior precisão. Por favor, permita o acesso para podermos continuar.');
  // PREPARE DATA
  const day = moment(position.timestamp).format('YYYYMMDD');
  if (!history[day]) history[day] = [];
  const index = history[day].length;
  if (index > 3) {
    return Alert.alert(
      'Ops',
      'Todas as entradas deste dia já foram preenchidas',
      [
        { text: 'Voltar' },
        { text: 'Editar Dia', onPress: () => router.navigate('Edit', { day }) },
      ],
    );
  }
  // REQUEST
  return dispatch(makeRegistry({ day, index, position }));
};

export const editDay = params => (dispatch) => {
  // SETUP
  const { day, registry } = params;
  const { uid } = Auth.currentUser;
  const registryArray = Object.values(registry);
  // REQUEST
  Database.ref(`${uid}/history/${day}`).set(registryArray)
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
  // dispatch(getPreviousRegistry());
};


// AUTH
export const signOut = () => (dispatch) => {
  // REQUEST
  Auth.signOut()
    .then(() => {
      dispatch({
        type: LOG_OUT,
      });
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

export const signInWithEmailAndPassword = params => (dispatch) => {
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
    .catch((error) => {
      Alert.alert('Erro!', `${error.message || error}`);
      dispatch(signOut());
    });
};

export const verifyAuthentication = callback => (dispatch) => {
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
    }
    callback();
  }, (error) => {
    Alert.alert('Erro!', `${error.message || error}`);
    dispatch(signOut());
    callback();
  });
};

export const updateProfile = params => (dispatch) => {
  const { displayName, ...profile } = params;
  // UPDATE AUTH
  Auth.currentUser.updateProfile({ displayName })
    .then(() => {
      const user = Auth.currentUser;
      const { uid, email } = user;
      // UPDATE PROFILE
      Database.ref(`${uid}/profile`).set({ ...profile, displayName, email })
        .then(() => {
          dispatch(getPreviousRegistry());
        })
        .catch(error => Alert.alert('Erro!', `${error.message || error}`));
      dispatch({
        type: LOG_IN,
        payload: { user },
      });
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

export const createUserWithEmailAndPassword = params => (dispatch) => {
  // SETUP
  const { email, password, ...profile } = params;
  // REQUEST
  Auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(updateProfile({ ...profile }));
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

export const sendPasswordResetEmail = params => () => {
  // SETUP
  const { email, router } = params;
  // REQUEST
  Auth.sendPasswordResetEmail(email)
    .then(() => {
      router.navigate('Register', { email });
      Alert.alert('Enviado!', 'Você receberá um email com instruções em alguns instantes');
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

export const signInWithProvider = provider => (dispatch) => {
  // REQUEST
  Auth.signInWithPopup(provider).then(({ user }) => {
    // var token = result.credential.accessToken;
    dispatch({
      type: LOG_IN,
      payload: { user },
    });
  }).catch((error) => {
    Alert.alert('Erro!', `${error.message || error}`);
    dispatch(signOut());
  });
};

export const signInWithGoogle = () => (dispatch) => {
  // REQUEST
  dispatch(signInWithProvider(Google));
};

// WORKPLACE
export const registerWorkplace = ({ profile }) => async (dispatch) => {
  // SETUP
  const user = Auth.currentUser;
  const { uid } = user;
  const workplace = await getPosition();
  // REQUEST
  Database.ref(`${uid}/profile`).set({ ...profile, workplace })
    .then(() => {
      dispatch(getPreviousRegistry());
    })
    .catch(error => Alert.alert('Erro!', `${error.message || error}`));
};

// CLOCK
export const internalClock = () => (dispatch) => {
  dispatch({
    type: CLOCK,
  });
};
