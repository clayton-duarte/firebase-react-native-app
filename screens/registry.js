import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut, insertNewRegistry } from '../actions';
import Table from '../components/registryTable';
import Wrapper from '../components/wrapper';
import Header from '../components/header';
import Button from '../components/button';
import List from '../components/list';
import Text from '../components/text';

class LoadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { signOut, navigation: { navigate } } = this.props;
    return(
      <List>
        <Header />
        <Wrapper>
          <Text title>ÚLTIMOS 30 DIAS</Text>
          <Table />
          <Button onPress={() => navigate('Today')}>NOVO REGISTRO</Button>
          {/* <Button onPress={signOut}>LOGOUT</Button> */}
        </Wrapper>
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ signOut, insertNewRegistry }, dispatch);
export default connect(state => state, mapDispatchToProps)(LoadScreen);