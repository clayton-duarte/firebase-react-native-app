import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default styled.Text`
background-color: ${({ theme }) => theme.secondary};
color: ${({ theme }) => theme.bg_primary};
font-size: ${(width < 360) ? 10 : 12}px;
flex: ${({ flex }) => flex || 1};
letter-spacing: 2px;
text-align: center;
font-weight: bold;
align-self: auto;
padding: 4px 0;
`;
