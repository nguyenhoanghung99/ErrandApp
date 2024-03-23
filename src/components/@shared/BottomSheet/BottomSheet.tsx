import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {PropsWithChildren, useMemo} from 'react';
import {BottomSheetModal, TouchableOpacity} from '@gorhom/bottom-sheet';

interface BottomSheetProps extends PropsWithChildren {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  isVisibleModal: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const BottomSheet = (props: BottomSheetProps) => {
  const {
    bottomSheetModalRef,
    isVisibleModal,
    setVisibleModal,
    title,
    children,
  } = props;
  const snapPoints = useMemo(() => ['33%', '66%'], []);

  if (!bottomSheetModalRef) {
    return null;
  }

  const handleClose = () => {
    bottomSheetModalRef.current?.close();
    setVisibleModal(false);
  };

  return (
    <TouchableOpacity
      style={isVisibleModal ? styles.backdrop : {}}
      onPress={handleClose}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        onChange={e => {
          if (e === -1) {
            handleClose();
          }
        }}
        snapPoints={snapPoints}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            bottomSheetModalRef.current?.snapToIndex(1);
          }}>
          <View style={styles.contentContainer}>
            {/* <TouchableOpacity
            style={styles.close}
            onPress={e => {
              e.stopPropagation();
              handleClose();
            }}>
            <MyIcon name="close" />
          </TouchableOpacity> */}
            <View style={styles.contentHeader}>
              <Text style={styles.contentHeaderText}>{title}</Text>
            </View>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 0,
    height: 20,
    left: 12,
  },
  contentHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  contentHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
  },
});
