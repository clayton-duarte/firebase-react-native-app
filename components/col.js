import styled from 'styled-components/native';

export default styled.TouchableOpacity`
${({ theme }) => theme.shadow};
border-radius: 4px;
overflow: hidden;
margin: 4px;
`;