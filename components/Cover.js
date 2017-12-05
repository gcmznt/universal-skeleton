import styled from "styled-components";

const Cover = styled.header`
  background-color: #000;
  text-align: center;
  padding: 50px;
`;

const Title = styled.h1`
  color: #b90003;
  font-family: "Arial black";
  font-size: 120px;
  font-weight: 900;
  letter-spacing: -10px;
  line-height: 0.9em;
  text-transform: uppercase;
  -webkit-text-stroke: 6px #e79705;
`;

export default () => (
  <Cover>
    <Title>
      Don't<br />panic!
    </Title>
  </Cover>
);
