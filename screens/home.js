import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../components/registryTable';
import { insertNewRegistry } from '../actions';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import Header from '../components/header';
import Clock from '../components/clock';
import View from '../components/view';
import Text from '../components/text';


class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.newRegistry = () => {
      const { registry } = this.props;
      const time = new Date();
      this.props.insertNewRegistry({ registry, time })
    };
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return(
      <View>
        <Header />
        <Clock onPress={this.newRegistry}></Clock>
        <Wrapper>
          <Text label>ÚLTIMOS REGISTROS</Text>
          <Table depth={1} />
          <Button onPress={() => navigate('Registry')}>MEUS REGISTROS</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ insertNewRegistry }, dispatch);
export default connect(state => state, mapDispatchToProps)(Today);