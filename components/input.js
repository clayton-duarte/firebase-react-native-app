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

const openTimePicker = async (onChangeText, value) => {
  const initialHour = Number(moment(value, 'H:mm:ss').format('H'));
  const initialMinute = Number(moment(value, 'H:mm:ss').format('mm'));
  const { action, hour, minute } = await TimePickerAndroid.open({ hour: initialHour, minute: initialMinute, is24Hour: false });
  if (action !== TimePickerAndroid.dismissedAction) {
    return onChangeText(moment(`${hour}:${minute}:00`, 'H:mm:ss').format('H:mm:ss'));
  }
}

const Picker = ({ onChangeText, value, ...rest }) => (
  <Touch onPress={() => openTimePicker(onChangeText, value)} {...rest}>
    <Text isPlaceholder={value}>{value}</Text>
  </Touch>
);

// COMPONENT ITSELF
export default ({ type, ...rest }) => (
  (type === 'time') 
  ? <Picker {...rest} />
  : <Input {...rest} />
);