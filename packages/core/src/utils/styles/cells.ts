import styled from '@emotion/styled';

const Label = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  padding: 0 5px;
  transform: translateY(-50%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
`;

export default Label;
