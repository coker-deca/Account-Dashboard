import React, { useCallback, useEffect, useState } from 'react';

import DateObjectPicker from '../features/DateObject';

const SelectBox: React.FC<{
  selectItems: any[];
  useValue: (value: any) => void;
}> = ({ selectItems, useValue }) => {
  const [items, setItems] = useState(selectItems || []);
  const [showItems, setShowItems] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectItems && selectItems[0]
  );

  const dropDown = useCallback(() => {
    setShowItems((prevShowItems) => {
      return !prevShowItems;
    });
  }, []);
  const handleDateSelection = useCallback((close: boolean) => {
    close && setShowItems(false);
  }, []);
  const selectItem = useCallback((items) => {
    console.log(items);
    setSelectedItem(items);
    items.id === 2 ? setShowDates(true) : setShowItems(false);
  }, []);

  useEffect(() => {
    setItems(selectItems);
  }, [selectItems]);
  return (
    <div className="select-box--box">
      <div className="select-box--container">
        <div className="select-box--selected-item">{selectedItem.value}</div>
        <div className="select-box--arrow" onClick={dropDown}>
          <span
            className={`${
              showItems ? "select-box--arrow-up" : "select-box--arrow-down"
            }`}
          />
        </div>

        <div
          style={{
            display: showItems ? "block" : "none",
          }}
          className={"select-box--items"}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => selectItem(item)}
              className={selectedItem === item ? "selected" : ""}
            >
              {item.value}
              {showDates && item.id === 2 && (
                <DateObjectPicker
                  useValue={useValue}
                  closeSelect={handleDateSelection}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
