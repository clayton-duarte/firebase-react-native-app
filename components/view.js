import styled from 'styled-components/native';
import { Constants } from 'expo';

export default styled.View`
border-top-width: ${({ inset }) => !inset ? Constants.statusBarHeight : 0};
background-color: ${({ theme }) => theme.bg_secondary};
border-color: ${({ theme }) => theme.primary};
justify-content: space-between;
align-items: stretch;
flex: 1;
`;