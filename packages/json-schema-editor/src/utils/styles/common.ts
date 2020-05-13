import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  SettingOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const iconStyle = css`
  vertical-align: middle;
  cursor: pointer;
`;

const actionStyle = css`
  margin: 0 5px;
  svg {
    font-size: 14px;
  }
`;

export const CaretDownIcon = styled(CaretDownOutlined)`
  ${iconStyle}
`;

export const CaretRightIcon = styled(CaretRightOutlined)`
  ${iconStyle}
`;

export const EditIcon = styled(EditOutlined)`
  ${iconStyle}
`;

export const SettingIcon = styled(SettingOutlined)`
  color: #00a854;
  ${iconStyle}
  ${actionStyle}
`;

export const PlusIcon = styled(PlusOutlined)`
  color: #2395f1;
  ${iconStyle}
  ${actionStyle}
`;

export const CloseIcon = styled(CloseOutlined)`
  color: #ff561b;
  ${iconStyle}
  ${actionStyle}
`;
