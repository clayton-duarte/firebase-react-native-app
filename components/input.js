import DateTimePicker from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import React, { Component } from 'react';
import moment from 'moment';

import theme from '../theme';

// NORMAL INPUT
const Input = styled.TextInput`
background-color:  ${({ theme }) => theme.bg_primary};
border-radius: ${({ theme }) => theme.radius};
color:  ${({ theme }) => theme.primary};
${({ theme }) => theme.shadow};
letter-spacing: 0.5px;
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
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
padding: 12px;
margin: 4px;
`;

const Text = styled.Text`
color:  ${({ theme }) => theme.primary};
letter-spacing: 0.5px;
font-size: 16px;
`;

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
    this.openTimePicker = () => this.setState({ visible: true });
    this.onCancel = () => this.setState({ visible: false });
    this.onConfirm = time => {
      const value = moment(time).format('H:mm');
      const timestamp = moment(`${this.props.day} ${value}`, 'YYYYMMDD H:mm').format('x');
      this.props.onChangeText(timestamp);
      this.setState({ visible: false, value });
    }
  }

  render() {
    const { visible, value } = this.state;
    return (
      <Touch onPress={this.openTimePicker}>
        <Text isPlaceholder={value}>{value}</Text>
        <DateTimePicker
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          isVisible={visible}
          mode='time'
        />
      </Touch>
    );
  }
}

// COMPONENT ITSELF
export default ({ type, ...rest }) => (
  (type === 'time') 
  ? <Picker {...rest} />
  : <Input {...rest} />
);