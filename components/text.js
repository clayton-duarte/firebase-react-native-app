import styled from 'styled-components/native';

export default styled.Text`
color: ${({ theme, label, title }) => (label || title) ? theme.secondary : theme.primary};
text-align: ${({ center, title }) => (center || title) ? 'center' : 'left'};
font-weight: ${({ label, title }) => (label || title) ? 'bold' : 'normal'};
letter-spacing: ${({ label, title }) => (label || title) ? 2 : 0}px;
${({ theme, title }) => title ? theme.shadow : ''};
font-size: ${({ label }) => label ? 12 : 16}px;
font-family: sans-serif;
margin: 4px;
`;