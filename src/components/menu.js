import styled from 'styled-components/native';
import { objectOf, any } from 'prop-types';
import { Icon, Button } from 'native-base';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';

import View from './view';
import List from './list';
import Text from './text';
import Row from './row';


const Wrapper = styled.View``;

const StyledIcon = styled(Icon)`
font-size: ${({ size }) => size || 20}px;
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
font-family: custom-font;
`;

const ButtonIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 16px;
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
font-family: custom-font-bold;
letter-spacing: 2px;
align-items: center;
font-size: 16px;
`;

const MenuItem = ({ children, ...rest }) => (
  <Item {...rest}>
    <ItemText>{children}</ItemText>
  </Item>
);

const Menu = ({
  navigation: { navigate, closeDrawer }, auth: { user: { displayName } }, registry: { months },
}) => (
  <View>
    {/* FAKE HEADER */}
    <Wrapper>
      <Row justify="space-between">
        <Button transparent onPress={closeDrawer}>
          <StyledIcon name="menu" />
        </Button>
        <Text label>
          OLÁ
          {' '}
          {displayName ? displayName.toUpperCase() : null}
        </Text>
        <Wrapper />
      </Row>
    </Wrapper>
    {/* MENU */}
    <List>
      <Wrapper>
        <MenuItem onPress={() => navigate('Today')}>HOJE</MenuItem>
        {
        months
          ? months.map((month, index) => (
            <MenuItem
              onPress={() => {
                navigate('Registry', { month });
                closeDrawer();
              }}
              key={`menu-month-list-${index}`}
              month
            >
              <StyledIcon size={12} name="calendar" />
              {' '}
              {moment(month, 'YYYYMM').format('MMMM').toUpperCase()}
            </MenuItem>
          )) : null
        }
        <MenuItem onPress={() => navigate('Profile')}>MEU PERFIL</MenuItem>
      </Wrapper>
    </List>
    {/* CREDITS */}
    <Wrapper>
      <Row justify="space-between">
        <Button transparent onPress={() => Linking.openURL('https://www.linkedin.com/in/clayton-duarte-95b381121/')}>
          <ButtonIcon name="logo-linkedin" />
          <Text label>CONTATO</Text>
        </Button>
        <Button transparent onPress={() => Linking.openURL('https://github.com/clayton-duarte/')}>
          <Text label>PROJETOS</Text>
          <ButtonIcon name="logo-github" />
        </Button>
      </Row>
    </Wrapper>
  </View>
);

Menu.propTypes = {
  navigation: objectOf(any).isRequired,
  registry: objectOf(any).isRequired,
  auth: objectOf(any).isRequired,
};

export default connect(state => state)(Menu);
