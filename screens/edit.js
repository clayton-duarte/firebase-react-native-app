import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editDay } from '../actions';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import Header from '../components/header';
import Loader from '../components/loader';
import Input from '../components/input';
import Text from '../components/text';
import View from '../components/view';

class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = () => {
      const { day, registry } = this.state;
      this.props.editDay({ day, registry });
      this.props.navigation.navigate('Registry');
    };
    this.setCurrentDay = () => {
      const day = this.props.navigation.getParam('day');
      if (!day) return this.props.navigation.navigate('Registry');
      const registry = this.props.registry.history[day];
      this.setState({ registry, day });
    };
    this.updateDayRegistry = (value, index) => {
      const { registry } = this.state;
      registry[index] = value;
      this.setState({ registry });
    };
    this.setLabel = index => {
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
              <Input
                type='time'
                placeholder='00:00'
                value={registry[index]}
                onChangeText={value => this.updateDayRegistry(value, index)}
              />
            </Wrapper>
          ))
        }
        {/* ADD MORE BUTTON */}
        {
          registry.length < 4
          ? (
            <Wrapper>
              <Button secondary disabled={this.state.loading} onPress={this.handleSubmit}>ADICIONAR REGISTRO</Button>
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

const mapDispatchToProps = dispatch => bindActionCreators({ editDay }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);