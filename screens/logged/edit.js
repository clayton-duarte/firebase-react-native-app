import { Icon, Button as NbButton } from 'native-base';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Wrapper from '../../components/wrapper';
import Button from '../../components/button';
import Header from '../../components/header';
import Loader from '../../components/loader';
import Input from '../../components/input';
import { getPosition } from '../../utils';
import Text from '../../components/text';
import View from '../../components/view';
import { editDay } from '../../actions';
import Row from '../../components/row';

const StyledRow = styled(Row)`
align-items: center;
`;

const StyledInput = styled(Input)`
flex: 1;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.warn};
${({ theme }) => theme.text_shadow};
font-size: 24px;
`;

const IconButton = styled(NbButton)`
justify-content: center;
align-items: center;
margin: 4px 0;
`;

const Col = styled.View`
flex: ${({ flex }) => flex || 1};
`;

class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = () => {
      // ALL THINGS ARE SAVED ON CHANGE
      this.props.navigation.goBack();
    };
    this.setCurrentDay = () => {
      const day = this.props.navigation.getParam('day');
      if (!day) return this.props.navigation.goBack();
      const registry = this.props.registry.history[day];
      this.setState({ registry, day });
    };
    this.updateDayRegistry = async (timestamp, index) => {
      const { day, registry } = this.state;
      const position = {
        timestamp: Number(timestamp),
      };
      registry[index] = position;
      this.props.editDay({ day, registry });
      this.setState({ registry });
    };
    this.removeRegistry = (index) => {
      const { day, registry } = this.state;
      registry.splice(index, 1);
      this.props.editDay({ day, registry });
      this.setState({ registry });
    };
    this.newRegistry = async () => {
      const { day, registry } = this.state;
      const position = await getPosition();
      registry[registry.length] = position;
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
    const { registry, day } = this.state;
    if (!registry) return <View><Loader /></View>
    return(
      <View>
        <Header />
        {
          registry.map((hour, index) => (
            <Wrapper key={`edit-registry-${hour}-${index}`}>
              <Text label>{this.setLabel(index)}</Text>
              <StyledRow>
                <Col>
                  <StyledInput
                    day={day}
                    type='time'
                    value={moment(registry[index].timestamp).format('H:mm')}
                    onChangeText={timestamp => this.updateDayRegistry(timestamp, index)}
                  />
                </Col>
                <IconButton transparent onPress={() => this.removeRegistry(index)}>
                  <StyledIcon name='close-circle' />
                </IconButton>
              </StyledRow>
            </Wrapper>
          ))
        }
        <Wrapper>
          {/* ADD MORE BUTTON */}
          {
            registry.length < 4
            ? (
              <Button secondary disabled={this.state.loading} onPress={this.newRegistry}>ADICIONAR REGISTRO</Button>
            ) : null
          }         
          <Button disabled={this.state.loading} onPress={this.handleSubmit}>CONCLUIR</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ editDay }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);