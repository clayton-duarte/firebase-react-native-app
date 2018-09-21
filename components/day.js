import styled from 'styled-components/native';

export default styled.Text`
background-color: ${({ theme }) => theme.secondary};
color: ${({ theme }) => theme.bg_primary};
flex: ${({ flex }) => flex || 1};
letter-spacing: 2px;
text-align: center;
font-weight: bold;
align-self: auto;
font-size: 12px;
padding: 4px;
`;