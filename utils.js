import moment from 'moment';

export const capitalize = name => {
  const characters = name.toLowerCase().split('');
  characters[0] = characters[0].toUpperCase();
  return characters.join('');
}

export const calcDuration = dayRegistry => {
  // SETUP DATA
  const registry1 = moment(dayRegistry[0], 'H:mm:ss');
  const registry2 = moment(dayRegistry[1], 'H:mm:ss');
  const registry3 = moment(dayRegistry[2], 'H:mm:ss');
  const registry4 = moment(dayRegistry[3], 'H:mm:ss');
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