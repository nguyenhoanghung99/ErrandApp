import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useState} from 'react';
import MyIcon from '../../@shared/MyIcons';
import {useTranslation} from 'react-i18next';
// import FooterButton from '../../@shared/Button/FooterButton';
import FullWidthButton from '../../@shared/Button/FullWidthButton';

const AiTranslate = () => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const {t} = useTranslation();

  return (
    <>
      <View style={styles.aiTranslate}>
        <Text style={styles.aiText}>{t('aiTranslate')}</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenPopup(true);
          }}>
          <MyIcon name="info" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={isOpenPopup}
        onDismiss={() => setOpenPopup(false)}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setOpenPopup(false)}
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#171717',
                padding: 10,
              }}>
              {t('aiTranslate')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#777777',
                textAlign: 'center',
                padding: 20,
              }}>
              {t('aiTranslateDescription')}
            </Text>
            <View style={{width: '100%', padding: 20}}>
              <FullWidthButton
                title={t('check')}
                onPress={() => {
                  setOpenPopup(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AiTranslate;

const styles = StyleSheet.create({
  aiTranslate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 4,
    paddingHorizontal: 11,
  },
  aiText: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  modalContent: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5, // For Android shadow
  },
});
