import styled from "styled-components";

const S = {};

S.TossPayButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #ffd400;
  color: black;
  width: 250px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin-top: 20px;
  margin-left: 30px;
  cursor: pointer;
`;

export default S;