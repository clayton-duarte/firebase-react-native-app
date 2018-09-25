import styled from 'styled-components/native';
import { Icon, Button } from 'native-base';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

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

const ButtonIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
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

const StyledButton = styled(Button)`
margin-left: 12px;
`;

const MenuItem = ({ children, ...rest }) => (
  <Item {...rest}>
    <ItemText>{children.toUpperCase()}</ItemText>
  </Item>
);

const Menu = ({ 
  navigation: { navigate, closeDrawer }, auth: { user: { displayName } }
}) => (
  <View>
    {/* FAKE HEADER */}
    <Wrapper>
      <StyledRow>
        <Button transparent onPress={closeDrawer}>
          <StyledIcon name='menu' />
        </Button>
        <Text label>OLÁ {displayName ? displayName.toUpperCase() : null}</Text>
        <Wrapper/>
      </StyledRow>
    </Wrapper>
    {/* MENU */}
    <Wrapper>
      <MenuItem onPress={() => navigate('Today')}>hoje</MenuItem>
      <MenuItem onPress={() => navigate('Registry')}>registros</MenuItem>
      {/* <MenuItem onPress={() => navigate('History')}>histórico</MenuItem> */}
      <MenuItem onPress={() => navigate('Profile')}>meu perfil</MenuItem>
    </Wrapper>
    {/* CREDITS */}
    <Wrapper>
      <StyledButton transparent onPress={() => Linking.openURL('https://www.linkedin.com/in/clayton-duarte-95b381121/')}>
        <Text label center>by <ButtonIcon name='logo-linkedin' /> clayton duarte</Text>
      </StyledButton>
    </Wrapper>
  </View>
);

export default connect(state => state)(Menu);