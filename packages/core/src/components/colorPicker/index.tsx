import React, { useState, useEffect } from 'react';

import { SketchPicker, ColorResult } from 'react-color';

interface IProps {
  color: string;
  onChangeComplete: (color: string) => void;
}

const ColorPicker: React.FC<IProps> = (props) => {
  const { color, onChangeComplete: changeCb } = props;
  const [curColor, setCurColor] = useState(color);

  // life
  useEffect(() => setCurColor(color), [color]);

  // events
  const onChange = (color: ColorResult): void => setCurColor(color.hex);
  const onChangeComplete = (color: ColorResult): void => changeCb(color.hex);

  return <SketchPicker color={curColor} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default ColorPicker;
