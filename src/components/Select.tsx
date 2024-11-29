import React from 'react';
import '../styles/components/Select.scss';

interface SelectProps {
  text: string;
  height: number;
  width: number;
  iconColor: string;
  type?: string;
}

const Select = ({ text, height, width, iconColor, type }: SelectProps) => {
  // Function to convert px to rem
  const pxToRem = (px: number) => `${px / 16}rem`;

  return (
    <div className="selectWrapper">
      <select
        className={`selectWrapper__select ${
          type === 'dynamic' ? 'dynamic' : ''
        }`}
        defaultValue=""
        style={{
          height: pxToRem(height),
          width: pxToRem(width),
        }}
      >
        <option value="" disabled>
          {text}
        </option>
        <option value="category1">Option</option>
        <option value="category2">Option</option>
        <option value="category3">Option</option>
      </select>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="selectWrapper__svg"
      >
        <path
          d="M14.94 6.71249L10.05 11.6025C9.4725 12.18 8.5275 12.18 7.95 11.6025L3.06 6.71249"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Select;
