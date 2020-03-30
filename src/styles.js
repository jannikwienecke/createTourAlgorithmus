import styled from "styled-components";

export const LKW = styled.div`
  border: 2px solid #232323;
  width: 745px;
  height: 255px;
  background: #111;
  position: absolute;
  left: 50%;
  margin-left: -372px;
  margin-top: 5rem;

  ${({ count }) =>
    count &&
    `
  top: ${20 * (count - 1)}rem;
 `}

  ${({ width }) =>
    width &&
    `
    width: ${width}px;
 `}
`;

export const LoadingZone = styled.div`
  width: 400px;
  height: 255px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  background: #232323;

  ${({ width }) =>
    width &&
    `
    width: ${width}px;
 `}
`;

export const PalleteWrapper = styled.div`
height: 80px;
/* background: #ddd; */
border: 1px solid #ccc;
background: #fefefe;
margin: 0.5px;
position: relative;

${({ type }) =>
  type === "euro" &&
  `
  width : 120px;
  height: 80px;
 `}

${({ type }) =>
  type === "industry" &&
  `
  width : 100px;
  height: 120px;
 `}

${({ turn, type }) =>
  turn &&
  type === "euro" &&
  `
  width : 80px;
  height: 120px;
 `}

${({ isFree }) =>
  isFree &&
  `
  background : #af4448;
 `}
`;
