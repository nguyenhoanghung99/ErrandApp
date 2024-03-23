import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import MyIcon from '../MyIcons';

export type SelectData = {key: string; value: string};

interface SelectProps {
  data: SelectData[];
  onSelect: (selectedItem: SelectData, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

const Select = (props: Partial<SelectProps>) => {
  const {data, onSelect} = props;
  return (
    <SelectDropdown
      data={data || []}
      defaultValue={data?.[0].value}
      onSelect={onSelect || (() => {})}
      renderDropdownIcon={(isOpen: boolean) => (
        <MyIcon name={isOpen ? 'upTriangle' : 'downTriangle'} />
      )}
      buttonStyle={styles.picker}
      buttonTextStyle={styles.pickerValue}
      dropdownStyle={styles.dropDown}
      rowTextStyle={styles.dropDownRowText}
      rowStyle={styles.dropDownRow}
    />
  );
};

export default Select;

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  pickerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#757575',
  },
  picker: {
    width: 90,
    height: 34,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  pickerValue: {
    fontSize: 14,
    color: '#171717',
  },
  dropDown: {
    width: 80,
    maxHeight: 300,
  },
  dropDownRow: {
    height: 40,
  },
  dropDownRowText: {
    fontSize: 14,
  },
});
