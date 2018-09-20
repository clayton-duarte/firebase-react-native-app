import { TimePickerAndroid } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import React from 'react';

import theme from '../theme';

// NORMAL INPUT
const Input = styled.TextInput`
background-color:  ${({ theme }) => theme.bg_primary};
color:  ${({ theme }) => theme.primary};
${({ theme }) => theme.shadow};
letter-spacing: 0.5px;
border-radius: 4px;
font-size: 16px;
padding: 12px;
margin: 4px;
`;

Input.defaultProps = {
  underlineColorAndroid: 'transparent',
  selectionColor: theme.warn,
  autoCapitalize: 'none',
  blurOnSubmit: true,
}

// TIME PICKER
const Touch = styled.TouchableOpacity`
background-color:  ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
border-radius: 4px;
padding: 12px;
margin: 4px;
`;

const Text = styled.Text`
color:  ${({ theme }) => theme.primary};
letter-spacing: 0.5px;
font-size: 16px;
`;

const openTimePicker = async (onChangeText, value, day) => {
  const initialHour = Number(moment(value).format('H'));
  const initialMinute = Number(moment(value).format('mm'));
  const { action, hour, minute } = await TimePickerAndroid.open({ hour: initialHour, minute: initialMinute, is24Hour: false });
  if (action !== TimePickerAndroid.dismissedAction) {
    const format = moment(`${day} ${hour}:${minute}`, 'YYYYMMDD H:mm').format();
    const timestamp = moment(format).format('x');
    return onChangeText(timestamp);
  }
}

const Picker = ({ onChangeText, value, day, ...rest }) => (
  <Touch onPress={() => openTimePicker(onChangeText, value, day)} {...rest}>
    <Text isPlaceholder={value}>{value}</Text>
  </Touch>
);

// COMPONENT ITSELF
export default ({ type, ...rest }) => (
  (type === 'time') 
  ? <Picker {...rest} />
  : <Input {...rest} />
);