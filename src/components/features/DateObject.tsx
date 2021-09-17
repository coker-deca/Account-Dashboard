import React, { useCallback, useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';

const DateObjectPicker: React.FC<{
  dateProps?: DateObject | DateObject[];
  closeSelect: (close: boolean) => void;
  useValue: (value: any) => void;
}> = ({ dateProps, closeSelect, useValue }) => {
  const format = "YYYY-MM-DD";

  const [value, setValue] = useState<
    DateObject | DateObject[] | null | undefined
  >(dateProps);

  const handleChange = useCallback(
    (items) => {
      setValue(items);
      Array.isArray(value) && console.log(typeof value, value.length);
      typeof value === "object" &&
        Array.isArray(value) &&
        value.length === 1 &&
        closeSelect(true);
    },
    [closeSelect, value]
  );

  useValue(value?.toString());
  useEffect(() => {
    console.log(value?.toString());
  });
  return (
    <DatePicker format={format} value={value} range onChange={handleChange} />
  );
};

export default DateObjectPicker;
