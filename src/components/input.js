import DateTimePicker from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import React, { Component } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment';

import theme from '../theme';

// NORMAL INPUT
const Input = styled.TextInput`
background-color:  ${theme.bg_primary};
border-radius: ${theme.radius};
color:  ${theme.primary};
letter-spacing: 0.5px;
${theme.shadow};
font-size: 16px;
padding: 12px;
margin: 4px;
`;

Input.defaultProps = {
  underlineColorAndroid: 'transparent',
  selectionColor: theme.warn,
  autoCapitalize: 'none',
  blurOnSubmit: true,
};

// TIME PICKER
const Touch = styled.TouchableOpacity`
background-color:  ${theme.bg_primary};
border-radius: ${theme.radius};
${theme.shadow};
padding: 12px;
margin: 4px;
`;

const Text = styled.Text`
color:  ${theme.primary};
letter-spacing: 0.5px;
font-size: 16px;
`;

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openTimePicker = () => this.setState({ visible: true });
    this.onCancel = () => this.setState({ visible: false });
    this.toTimeStamp = time => moment(`${this.props.day} ${time}`, 'YYYYMMDD H:mm').format('x');
    this.onConfirm = (time) => {
      const value = moment(time).format('H:mm');
      const timestamp = this.toTimeStamp(value);
      this.props.onChangeText(timestamp);
      this.setState({ visible: false });
    };
  }

  render() {
    const { value } = this.props;
    return (
      <Touch onPress={this.openTimePicker}>
        <Text isPlaceholder={value}>{value}</Text>
        <DateTimePicker
          isVisible={this.state.visible}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          mode="time"
        />
      </Touch>
    );
  }
}

Picker.propTypes = {
  onChangeText: func.isRequired,
  value: string.isRequired,
  day: string.isRequired,
};

// COMPONENT ITSELF
export default ({ type, ...rest }) => (
  (type === 'time')
    ? <Picker {...rest} />
    : <Input {...rest} />
);
