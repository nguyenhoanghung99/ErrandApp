import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ProfileInfoCardProps {
  infoList: {
    label: string;
    value: string;
  }[];
}

const ProfileInfoCard = ({infoList}: ProfileInfoCardProps) => {
  if (infoList.length === 0 || !infoList) {
    return null;
  }

  return (
    <View style={styles.container}>
      {infoList.map((info, index) => (
        <React.Fragment key={info.label}>
          <View style={styles.infoItem}>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTextValue} numberOfLines={1}>
                {info.value}
              </Text>
              <Text style={styles.infoTextLabel}>{info.label}</Text>
            </View>
          </View>
          {index !== infoList.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ProfileInfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    height: 96,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#EBEBEB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 36,
    marginTop: 20,
    marginBottom: 36,
  },
  infoItem: {
    maxWidth: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: '#EBEBEB',
  },
  infoTextContainer: {
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#171717',
  },
  infoTextLabel: {
    fontSize: 12,
    color: '#757575',
  },
});
