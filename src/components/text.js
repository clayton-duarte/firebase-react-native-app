import styled from 'styled-components/native';
import React from 'react';

const Text = styled.Text`
color: ${({ theme, label, title }) => ((label || title) ? theme.secondary : theme.action)};
letter-spacing: ${({ label, title, onPress }) => ((label || title || onPress) ? 2 : 0)}px;
font-family: custom-font${({ label, title }) => ((label || title) ? '-bold' : '')};
text-align: ${({ center, title }) => ((center || title) ? 'center' : 'left')};
margin: ${({ title, onPress }) => ((title || onPress) ? '0 auto' : '4px')};
font-size: ${({ label, onPress }) => ((label || onPress) ? 16 : 20)}px;
`;

const View = styled.View`
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
margin: 4px;
`;

const InvisibleButton = styled.TouchableOpacity`
background-color: transparent;
border-width: 0;
margin: 4px;
width: 100%;
`;

export default (props) => {
  if (props.onPress) return <InvisibleButton transparent onPress={props.onPress}><Text {...props} /></InvisibleButton>;
  if (props.title) return <View><Text {...props} /></View>;
  return <Text {...props} />;
};
