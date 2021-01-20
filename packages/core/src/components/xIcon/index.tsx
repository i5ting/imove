import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import './index.less';

interface IconFontProps {
  type: string;
  className?: string;
}

const XIcon: React.SFC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2024452_r7nz0cw949.js',
});

export default XIcon;
