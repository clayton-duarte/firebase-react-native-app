import styled from 'styled-components/native';

export default styled.TouchableOpacity`
border-radius: ${({ theme }) => theme.radius};
${({ theme }) => theme.shadow};
overflow: hidden;
margin: 4px;
`;
