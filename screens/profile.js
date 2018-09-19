import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateProfile, signOut } from '../actions';
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
      const { displayName } = this.state;
      this.props.updateProfile({ displayName });
      this.props.navigation.navigate('Registry');
    };
    this.setCurrentUserData = () => {
      const { displayName } = this.props.auth.user;
      this.setState({ displayName });
    }
  }
   
  componentDidMount() {
    this.setCurrentUserData();
  }

  render() {
    const { displayName } = this.state;
    const { signOut } = this.props;
    if (!displayName) return <View><Loader /></View>
    return(
      <View>
        <Header />
        <Wrapper>
          <Text label>NOME:</Text>
          <Input
            placeholder=''
            value={displayName}
            onChangeText={displayName => this.setState({ displayName })}
          />
        </Wrapper>
        <Wrapper>          
          <Button onPress={this.handleSubmit}>SALVAR DADOS</Button>
          <Button secondary onPress={signOut}>LOGOUT</Button>
        </Wrapper>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile, signOut }, dispatch);
export default connect(state => state, mapDispatchToProps)(EditScreen);