import React, { useState } from 'react';

const ToggleSwitch = ({toggleHandler}) => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center" onClick={toggleHandler || ''}>
      <input
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
      />
      <div className={`relative w-9 h-4 rounded-full ${checked ? 'bg-green-900' : 'bg-gray-400'} shadow-inner`}>
        <div className={`absolute left-0 -top-[0.1rem] w-5 h-5 rounded-full transform scale-110 shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-full' : ''} ${checked ? 'bg-[#62CD5D]' : 'bg-white'}`}></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;