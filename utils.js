import { Location, Permissions } from 'expo';
import moment from 'moment';

export const capitalize = name => {
  const characters = name.toLowerCase().split('');
  characters[0] = characters[0].toUpperCase();
  return characters.join('');
}

export const calcDuration = dayRegistry => {
  if (!dayRegistry) return {};
  const timestamps = dayRegistry.map(position => position.timestamp);
  // SETUP DATA
  const registry1 = moment(timestamps[0]);
  const registry2 = moment(timestamps[1]);
  const registry3 = moment(timestamps[2]);
  const registry4 = moment(timestamps[3]);
  // CALCS
  const afternoon = moment.duration(registry4.diff(registry3)).asHours();
  const morning = moment.duration(registry2.diff(registry1)).asHours();
  const lunch = moment.duration(registry3.diff(registry2)).asHours();
  const total = (morning + afternoon).toFixed(2);
  // RETURN
  return {
    afternoon,
    morning,
    total,
    lunch,
  }
}

export const getPosition = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') return false;
  let location = await Location.getCurrentPositionAsync({});
  return location;
};