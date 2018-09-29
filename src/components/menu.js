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
color: ${({ theme }) => theme.action};
${({ theme }) => theme.text_shadow};
font-size: 20px;
`;

const ButtonIcon = styled(Icon)`
color: ${({ theme }) => theme.secondary};
font-size: 12px;
`;

const Item = styled.TouchableOpacity`
padding: ${({ month }) => (month ? '12px 12px 12px 20px' : '12px')};
background-color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.shadow};
flex-direction: row;
align-items: center;
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
        <MenuItem onPress={() => navigate('Today')}>hoje</MenuItem>
        {
        months
          ? months.map((month, index) => (
            <MenuItem
              onPress={() => navigate('Registry', { month })}
              key={`menu-month-list-${index}`}
              month
            >
              {moment(month, 'YYYYMM').format('MMMM')}
            </MenuItem>
          )) : null
        }
        <MenuItem onPress={() => navigate('Profile')}>meu perfil</MenuItem>
      </Wrapper>
    </List>
    {/* CREDITS */}
    <Wrapper>
      <StyledButton transparent onPress={() => Linking.openURL('https://www.linkedin.com/in/clayton-duarte-95b381121/')}>
        <Text label center>
          by
          {' '}
          <ButtonIcon name="logo-linkedin" />
          {' '}
          clayton duarte
        </Text>
      </StyledButton>
    </Wrapper>
  </View>
);

Menu.propTypes = {
  navigation: objectOf(any).isRequired,
  registry: objectOf(any).isRequired,
  auth: objectOf(any).isRequired,
};

export default connect(state => state)(Menu);
