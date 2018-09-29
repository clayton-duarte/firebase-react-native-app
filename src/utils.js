import { Location, Permissions } from 'expo';
import moment from 'moment';

export const capitalize = (name) => {
  const characters = name.toLowerCase().split('');
  characters[0] = characters[0].toUpperCase();
  return characters.join('');
};

export const unFormatNumber = number => Number(number.toString().replace(',', '.')).toFixed(2);
export const formatNumber = number => Number(unFormatNumber(number)).toFixed(2).toString().replace('.', ',');

export const filterDaysByMonth = (days, month) => days.filter(day => day.includes(month));

export const calcDuration = (dayRegistry) => {
  // VERIFY
  const { length } = dayRegistry;
  if (!dayRegistry || !length) return {};
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
  const total = (morning + afternoon);
  // RETURN
  switch (length) {
    case 2:
      return { morning, total };
    case 3:
      return { morning, lunch, total };
    case 4:
      return {
        morning, lunch, afternoon, total,
      };
    default:
      return { total };
  }
};

export const getPosition = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') return false;
  const location = await Location.getCurrentPositionAsync({});
  return location;
};
