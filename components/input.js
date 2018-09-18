import styled from 'styled-components/native';
import theme from '../theme';

const Input = styled.TextInput`
background-color:  ${({ theme }) => theme.bg_primary};
color:  ${({ theme }) => theme.primary};
${({ theme }) => theme.shadow};
font-family: sans-serif;
letter-spacing: 0.5px;
border-radius: 4px;
padding: 8px 16px;
font-size: 16px;
margin: 4px;
`;

Input.defaultProps = {
  underlineColorAndroid: 'transparent',
  selectionColor: theme.warn,
  autoCapitalize: 'none',
  blurOnSubmit: true,
}

export default Input;