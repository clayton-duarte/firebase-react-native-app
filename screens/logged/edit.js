import { Icon, Button as NbButton } from 'native-base';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { editDay, insertNewRegistry } from '../../actions';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Header from '../../components/header';
import Loader from '../../components/loader';
import Input from '../../components/input';
import Text from '../../components/text';
import View from '../../components/view';
import Row from '../../components/row';

const StyledRow = styled(Row)`
width: 100%;
`;

const StyledInput = styled(Input)`
flex: 1;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.warn};
${({ theme }) => theme.text_shadow};
margin: 12px 4px 4px 12px;
font-size: 24px;
`;

class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = () => {
      // ALL THINGS ARE SAVED ON CHANGE
      this.props.navigation.navigate('Registry');
    };
    this.setCurrentDay = () => {
      const day = this.props.navigation.getParam('day');
      if (!day) return this.props.navigation.navigate('Registry');
      const registry = this.props.registry.history[day];
      this.setState({ registry, day });
    };
    this.updateDayRegistry = (value, index) => {
      const { day, registry } = this.state;
      registry[index] = value;
      this.props.editDay({ day, registry });
      this.setState({ registry });
    };
    this.removeRegistry = (index) => {
      const { day, registry } = this.state;
      registry.splice(index, 1);
      this.props.editDay({ day, registry });
      this.setState({ registry });
    };
    this.newRegistry = () => {
      const { day, registry } = this.state;
      registry[registry.length] = moment().format('H:mm:ss');
      this.props.editDay({ day, registry });
      this.setState({ registry });
    };
    this.setLabel = (index) => {
      switch (index) {
        case 0:
          return 'ENTRADA 1';
        case 1:
          return 'SAÍDA 1';
        case 2:
          return 'ENTRADA 2';
        case 3:
          return 'SAÍDA 2';
        default:
          return 'REGISTRO';
      }
    }
  }
   
  componentDidMount() {
    this.setCurrentDay();
  }

  render() {
    const { registry } = this.state;
    if (!registry) return <View><Loader /></View>
    return(
      <View>
        <Header />
        {
          registry.map((hour, index) => (
            <Wrapper key={`edit-registry-${hour}-${index}`}>
              <Text label>{this.setLabel(index)}</Text>
              <StyledRow>
                <StyledInput
                  type='time'
                  value={moment(registry[index], 'H:mm:ss').format('h:mm a')}
                  onChangeText={value => this.updateDayRegistry(value, index)}
                />
                <NbButton transparent onPress={() => this.removeRegistry(index)}>
                  <StyledIcon name='close-circle' />
                </NbButton>
              </StyledRow>
            </Wrapper>
          ))
        }
        {/* ADD MORE BUTTON */}
        {
          registry.length < 4
          ? (
            <Wrapper>
              <Button secondary disabled={this.state.loading} onPress={this.newRegistry}>ADICIONAR REGISTRO</Button>
            </Wrapper>
          ) : null
        }
        <Wrapper>          
          <Button disabled={this.state.loading} onPress={this.handleSubmit}>CONCLUIR</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ editDay, insertNewRegistry }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);