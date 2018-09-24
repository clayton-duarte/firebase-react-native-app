import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';

import { signOut } from '../actions';
import View from './view';
import Text from './text';
import Row from './row';

const Wrapper = styled.View``;

const StyledRow = styled(Row)`
background-color: ${({ theme }) => theme.bg_primary};
justify-content: space-between;
${({ theme }) => theme.shadow};
border-right-width: 0;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
font-size: 20px;
`;

const Item = styled.TouchableOpacity`
background-color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
align-items: center;
padding: 12px;
`;

const ItemText = styled.Text`
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
letter-spacing: 2px;
font-weight: bold;
font-size: 12px;
`;

const MenuItem = ({ children, ...rest }) => (
  <Item {...rest}>
    <ItemText>{children.toUpperCase()}</ItemText>
  </Item>
);

const Menu = ({ 
  navigation: { navigate, closeDrawer }, auth: { user: { displayName } }, signOut
}) => (
  <View>
    <Wrapper>
      <StyledRow>
        <Button transparent onPress={closeDrawer}>
          <StyledIcon name='menu' />
        </Button>
        <Text label>OLÁ {displayName ? displayName.toUpperCase() : null}</Text>
        <Wrapper/>
      </StyledRow>
      <MenuItem onPress={() => navigate('Today')}>hoje</MenuItem>
      <MenuItem onPress={() => navigate('Registry')}>registros</MenuItem>
      {/* <MenuItem onPress={() => navigate('History')}>histórico</MenuItem> */}
      <MenuItem onPress={() => navigate('Profile')}>meu perfil</MenuItem>
      {/* <MenuItem onPress={signOut}>logout</MenuItem> */}
    </Wrapper>
    <Wrapper>
      <Text label center>desenvolvido por{'\n'}CLAYTON DUARTE</Text>
    </Wrapper>
  </View>
);

const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch);
export default connect(state => state, mapDispatchToProps)(Menu);