import styled from 'styled-components/native';

export default styled.View`
justify-content: ${({ justify }) => justify || 'flex-start'};
align-items: ${({ align }) => align || 'center'};
flex-direction: row;
position: relative;
`;