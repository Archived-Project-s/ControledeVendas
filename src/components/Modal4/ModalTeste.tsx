import React from "react";
import Select from 'react-select'

export const ModalForm = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
   return (
    <Select  onChange={(e) => console.log(e)} isMulti={true} options={options} />
  );
};
