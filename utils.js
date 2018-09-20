import { Location, Permissions } from 'expo';
import moment from 'moment';

export const capitalize = name => {
  const characters = name.toLowerCase().split('');
  characters[0] = characters[0].toUpperCase();
  return characters.join('');
}

export const calcDuration = dayRegistry => {
  const timestamps = dayRegistry.map(position => position.timestamp);
  // SETUP DATA
  const registry1 = moment(timestamps[0]);
  const registry2 = moment(timestamps[1]);
  const registry3 = moment(timestamps[2]);
  const registry4 = moment(timestamps[3]);
  const diff1 = moment.duration(registry2.diff(registry1));
  const diff2 = moment.duration(registry4.diff(registry3));
  const morning = diff1.asHours();
  const allDay = diff1.add(diff2).asHours();
  const format = time => time.toString().substring(0,4).replace('.', ',');
  // RETURN
  switch (dayRegistry.length) {
    case 2:
    case 3:
      return format(morning);
    case 4:
      return format(allDay);
    default:
      return '+0:00';
  }
}

export const getPosition = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') return false;
  let location = await Location.getCurrentPositionAsync({});
  return location;
};