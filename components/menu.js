import styled from 'styled-components/native';
import { Icon, Button } from 'native-base';
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

const Item = styled.TouchableOpacity`
background-color: ${({ active, theme }) => active ? theme.secondary : theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
align-items: center;
padding: 12px;
`;

const ItemText = styled.Text`
color: ${({ active, theme }) => active ? theme.bg_primary : theme.action};
${({ theme }) => theme.text_shadow};
letter-spacing: 2px;
font-weight: bold;
font-size: 12px;
`;

const MenuItem = ({ active, children, ...rest }) => (
  <Item active={active} {...rest}>
    <ItemText active={active}>{children.toUpperCase()}</ItemText>
  </Item>
);

const Menu = ({ 
  navigation: { navigate, closeDrawer, state: { index } }, auth: { user: { displayName } } 
}) => (
  <View>
    <Wrapper>
      <StyledRow>
        <Button transparent onPress={closeDrawer}>
          <StyledIcon name='menu' />
        </Button>
        <Text label>OLÁ {displayName.toUpperCase()}</Text>
        <Wrapper/>
      </StyledRow>
      <MenuItem onPress={() => navigate('Today')} active={(index === 0)}>hoje</MenuItem>
      <MenuItem onPress={() => navigate('Registry')} active={(index === 1)}>registros</MenuItem>
      <MenuItem onPress={() => navigate('History')} active={(index === 2)}>histórico</MenuItem>
      <MenuItem onPress={() => navigate('Profile')} active={(index === 3)}>meu perfil</MenuItem>
    </Wrapper>
    <Wrapper>
      <Text label center>desenvolvido por{'\n'}CLAYTON DUARTE</Text>
    </Wrapper>
  </View>
);

export default connect(state => state)(Menu);