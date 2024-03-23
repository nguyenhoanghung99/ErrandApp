import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {S3Image} from 'aws-amplify-react-native';
import {useTranslation} from 'react-i18next';

interface MyChatContentProps {
  isViewed?: boolean;
  content: string;
}

const MyChatContent = (props: MyChatContentProps) => {
  const {t} = useTranslation();
  const {content, isViewed} = props;

  if (content.includes(':@#$%IMAGE@#$%:')) {
    const imageUrl = content.replace(':@#$%IMAGE@#$%:', '');

    return (
      <View style={styles.container}>
        {isViewed && <Text style={styles.viewed}>{t('read')}</Text>}
        <View style={styles.contentContainer}>
          <S3Image
            imgKey={imageUrl}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isViewed && <Text style={styles.viewed}>{t('read')}</Text>}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

export default MyChatContent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewed: {
    fontSize: 10,
    color: '#757575',
  },
  contentContainer: {
    marginLeft: 8,
    marginRight: 16,
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: '#ebebeb',
    borderRadius: 34,
    maxWidth: '65%',
  },
  content: {
    fontSize: 14,
    color: '#000',
  },
});
