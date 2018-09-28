import styled from 'styled-components/native';

export default styled.TouchableOpacity`
background-color: ${({ theme }) => theme.bg_primary};
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
justify-content: space-between;
flex-direction: row;
margin: 4px;
`;
