import styled from 'styled-components/native';
import { Icon } from 'native-base';
import React from 'react';

const Touch = styled.TouchableOpacity`
background-color: ${({ theme }) => theme.action};
${({ theme }) => theme.shadow};
justify-content: center;
border-radius: 25px;
align-items: center;
position: absolute;
height: 50px;
margin: 20px;
width: 50px;
bottom: 0;
right: 0;
`;

const StyledIcon = styled(Icon)`
color: ${({ theme }) => theme.bg_primary};
${({ theme }) => theme.text_shadow};
font-family: custom-font;
text-align: center;
font-size: 20px;
`;

export default props => (<Touch {...props}><StyledIcon name="create" /></Touch>);
