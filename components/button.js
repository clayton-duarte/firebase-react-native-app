import styled from 'styled-components/native';
import React from 'react';

const Touch = styled.TouchableOpacity`
background-color: ${({ theme, secondary }) => secondary ? 'transparent' : theme.action};
border-width: ${({ secondary }) => secondary ? 2 : 0}px;
${({ theme }) => theme.shadow};
border-radius: 4px;
padding: 8px 16px;
margin: 4px;
`;

const Text = styled.Text`
color: ${({ theme, secondary }) => secondary ? theme.action : theme.bg_primary};
${({ theme, secondary }) => secondary ? '' : theme.text_shadow};
font-family: sans-serif;
letter-spacing: 2px;
text-align: center;
font-weight: bold;
font-size: 12px;
`;

export default props => (<Touch {...props}><Text {...props}/></Touch>);