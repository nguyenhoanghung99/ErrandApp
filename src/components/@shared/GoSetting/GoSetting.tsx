import React from 'react';
import {Linking, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {isIosPlatform} from '../../../utils/util';
import {useTranslation} from 'react-i18next';
import {messagePermissionAndroid} from '../../../constants/messages';

interface GoSettingProp {
  onClose?: () => void;
  onDeny?: () => void;
  onOpenSetting: () => void;
  title?: string;
  settingPath?: string;
  modalVisible?: boolean;
}

const GoSetting = ({
  onClose,
  onOpenSetting,
  title,
  modalVisible,
}: GoSettingProp) => {
  const {t} = useTranslation();
  const openSetting = async () => {
    Linking.openSettings()
      .then(v => {
        onOpenSetting();
      })
      .catch(() => {
        console.log('====================================');
        console.log('Unable to open settings');
        console.log('====================================');
      });
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalNoticeText}>{t('Notice')}</Text>
          <Text style={styles.modalText}>{`${t(
            title ||
              'Allow Handsfree to access your photos to download images. Press:',
          )} ${t('Go to Settings')} ${
            isIosPlatform
              ? t('Photos > Selected Photos or All Photos')
              : t(messagePermissionAndroid.default)
          }`}</Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={openSetting}>
              <Text style={styles.textStyle}>Setting</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalNoticeText: {
    color: '#000',
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default GoSetting;
