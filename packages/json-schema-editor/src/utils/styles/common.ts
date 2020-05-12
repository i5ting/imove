import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const cursorStyle = css`
  cursor: pointer;
`;

const IconStyle = css`
  margin: 0 5px;
  svg {
    font-size: 14px;
  }
`;

export const CaretDownIcon = styled(CaretDownOutlined)`
  ${cursorStyle}
`;

export const CaretRightIcon = styled(CaretRightOutlined)`
  ${cursorStyle}
`;

export const EditIcon = styled(EditOutlined)`
  ${cursorStyle}
`;

export const SettingIcon = styled(SettingOutlined)`
  color: #00a854;
  ${cursorStyle}
  ${IconStyle}
`;

export const PlusIcon = styled(PlusOutlined)`
  color: #2395f1;
  ${cursorStyle}
  ${IconStyle}
`;
