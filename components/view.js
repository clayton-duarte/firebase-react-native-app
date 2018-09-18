import styled from 'styled-components/native';
import { Constants } from 'expo';

export default styled.View`
background-color: ${({ theme }) => theme.bg_secondary};
border-top-width: ${Constants.statusBarHeight};
border-color: ${({ theme }) => theme.primary};
justify-content: space-between;
align-items: stretch;
flex: 1;
`;