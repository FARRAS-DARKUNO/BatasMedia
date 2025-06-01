import React from 'react';
import * as FaIcons from 'react-icons/fa6';

export type IconName = keyof typeof FaIcons;

interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'black', ...props }) => {
  const IconComponent = FaIcons[name];

  return IconComponent ? <IconComponent size={size} color={color} {...props} /> : null;
};

export default Icon;