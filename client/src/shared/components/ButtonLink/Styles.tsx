import styled from '@emotion/styled';

export const Button = styled.button`
  backdrop-filter: blur(3px);
  background-color: rgba(white, 0.1);
  border: 1px solid rgba(white, 0.1);
  border-radius: 100px;
  box-shadow: 2px 2px 2px rgba(black, 0.1);
  cursor: pointer;
  color: gray(245);
  text-shadow: 0px 0px 2px rgba(black, 0.1);

  &:hover {
    background-color: rgba(white, 0.2);
    border: 1px solid rgba(white, 0.3);
  }
`;
