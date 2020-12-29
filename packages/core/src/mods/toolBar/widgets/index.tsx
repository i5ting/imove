import React from 'react';

import { Graph } from '@antv/x6';

import Save from './save';
import Undo from './undo';
import Redo from './redo';
import Zoom from './zoom';
import Bold from './bold';
import Italic from './italic';
import BgColor from './bgColor';
import FontSize from './fontSize';
import TextColor from './textColor';
import LineStyle from './lineStyle';
import Underline from './underline';
import NodeAlign from './nodeAlign';
import FitWindow from './fitWindow';
import BringToTop from './bringToTop';
import BringToBack from './bringToBack';
import BorderColor from './borderColor';
import VerticalAlign from './verticalAlign';
import HorizontalAlign from './horizontalAlign';

interface IProps {
  flowChart: Graph;
}

const tools: React.FC<IProps>[][] = [
  [Save, FitWindow, Undo, Redo],
  [Zoom],
  [FontSize, Bold, Italic, Underline],
  [TextColor, BgColor, BorderColor, LineStyle],
  [HorizontalAlign, VerticalAlign],
  [NodeAlign, BringToTop, BringToBack],
];

export default tools;
