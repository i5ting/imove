import React from 'react';

import {Graph} from '@antv/x6';

import Save from './save';
import Undo from './undo';
import Redo from './redo';
import Zoom from './zoom';
import Bold from './bold';
import Italic from './italic';
import BgColor from './bgColor';
import FontSize from './fontSize';
import TextColor from './textColor';
import LineColor from './lineColor';
import LineStyle from './lineStyle';
import Underline from './underline';
import FitWindow from './fitWindow';
import BringToTop from './bringToTop';
import BringToBack from './bringToBack';
import VerticalAlign from './verticalAlign';
import HorizontalAlign from './horizontalAlign';

interface IProps {
  flowChart: Graph;
}

const tools: React.FC<IProps>[][] = [
  [Save, FitWindow, Undo, Redo],
  [Zoom],
  [FontSize, Bold, Italic, Underline, TextColor],
  [HorizontalAlign, VerticalAlign],
  [BgColor, LineColor, LineStyle],
  [BringToTop, BringToBack]
];

export default tools;