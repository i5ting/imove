import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import './index.less';

interface IconFontProps {
  type: string;
  className?: string;
}

const XIcon: React.SFC<IconFontProps> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2024452_zgg5gvivois.js',
});

export default XIcon;
