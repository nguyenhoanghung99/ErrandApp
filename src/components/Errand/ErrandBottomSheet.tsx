import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  BottomSheetModal,
  BottomSheetTextInput,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import BottomSheet from '../@shared/BottomSheet/BottomSheet';
import IconTextButton from '../@shared/Button/IconTextButton';
import FullWidthButton from '../@shared/Button/FullWidthButton';
import {Picker} from '@react-native-picker/picker';
import {Transportation, Volunteer} from '../../types/errand';
import {Errand} from '../../API';
import {TRANSPORTATION_LIST} from '../../constants/errand';
import {useTranslation} from 'react-i18next';

type Props = {
  errand: Errand | null;
  modalProps: {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>;
    isVisibleModal: boolean;
    setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  helperInfo: {
    id: string;
    helperId: string;
    helperName: string;
    helperProfileImage: string;
    helperScore: number;
    helperCompletedCnt: number;
  };
  handleApply: (volunteer?: Volunteer) => void;
};

const getTimeList = () => {
  const timeList = [];
  for (let i = 5; i <= 300; i += 5) {
    timeList.push(i);
  }
  return timeList;
};

const ErrandBottomSheet = (props: Props) => {
  const {t} = useTranslation();
  const {errand, modalProps, helperInfo, handleApply} = props;
  const [selectedTransportation, setSelectedTransportation] =
    useState<Transportation>();
  const [isVisibleTimePicker, setVisibleTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(5);
  const [displayTime, setDisplayTime] = useState(5);
  const [memo, setMemo] = useState('');

  const timeList = getTimeList();

  const initState = () => {
    setSelectedTransportation(undefined);
    setSelectedTime(5);
    setDisplayTime(5);
    setMemo('');
  };

  return (
    <BottomSheet title={t('apply')} {...modalProps}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{t('estimateTime')}</Text>
          <TouchableOpacity
            style={styles.estimateTimeContainer}
            onPress={() => {
              setVisibleTimePicker(true);
            }}>
            <Text style={styles.estimateTimeText}>
              {displayTime}
              {t('minute')}
            </Text>
          </TouchableOpacity>
          {isVisibleTimePicker && (
            <View>
              <View style={styles.pickerButtonContainer}>
                <Button
                  color="#FB3048"
                  title={t('cancel')}
                  onPress={() => {
                    setVisibleTimePicker(false);
                  }}
                />
                <Button
                  color="#FB3048"
                  title={t('check')}
                  onPress={() => {
                    setDisplayTime(selectedTime);
                    setVisibleTimePicker(false);
                  }}
                />
              </View>
              <Picker
                dropdownIconColor={'#171717'}
                style={{color: '#171717'}}
                selectedValue={selectedTime}
                onValueChange={itemValue => {
                  setSelectedTime(itemValue);
                }}>
                {timeList.map(time => (
                  <Picker.Item
                    key={time}
                    label={time.toString() + t('minute')}
                    value={time}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{t('transportation')}</Text>
          <View style={styles.transferContainer}>
            {TRANSPORTATION_LIST.map(transportation => (
              <IconTextButton
                key={transportation.id}
                iconName={transportation.iconName}
                text={t(transportation.name)}
                onPress={() => setSelectedTransportation(transportation.id)}
                isSelected={selectedTransportation === transportation.id}
              />
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{t('leaveMemo')}</Text>
          <BottomSheetTextInput
            placeholderTextColor={'#C7C7CC'}
            style={styles.input}
            placeholder={t('leaveMemo')}
            value={memo}
            onChangeText={m => setMemo(m)}
          />
        </View>
        <FullWidthButton
          disabled={!selectedTransportation}
          title={t('runningErrand')}
          onPress={() => {
            handleApply({
              ...helperInfo,
              transportation: selectedTransportation as Transportation,
              estimateTime: displayTime,
              memo,
              price: errand?.price as number,
              distance: 0,
            });
            initState();
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default ErrandBottomSheet;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    gap: 33,
  },
  row: {
    gap: 25,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#171717',
  },
  transferContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 3,
    padding: 16,
    color: '#171717',
  },
  estimateTimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 3,
  },
  estimateTimeText: {
    fontSize: 14,
    color: '#757575',
  },
  pickerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
