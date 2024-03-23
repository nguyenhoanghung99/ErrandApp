import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {S3Image} from 'aws-amplify-react-native';
import MyIcon from '../@shared/MyIcons';
import {useTranslation} from 'react-i18next';
import translate from 'translate-google-api';

interface OtherPersonChatContentProps {
  profileImageUrl?: string;
  content: string;
}

const OtherPersonChatContent = (props: OtherPersonChatContentProps) => {
  const {profileImageUrl, content} = props;
  const {t, i18n} = useTranslation();
  const [requestTranslate, setRequestTranslate] = React.useState(false);
  const [translatedContent, setTranslatedContent] = React.useState('');

  useEffect(() => {
    if (requestTranslate) {
      translate(content, {to: i18n.language}).then(res => {
        setTranslatedContent(res);
      });
    }
  }, [i18n.language, requestTranslate]);

  if (content.includes(':@#$%IMAGE@#$%:')) {
    const imageUrl = content.replace(':@#$%IMAGE@#$%:', '');
    return (
      <View style={styles.container}>
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
      {profileImageUrl ? (
        <S3Image style={styles.image} imgKey={profileImageUrl} />
      ) : (
        <View style={styles.image} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          {requestTranslate ? translatedContent : content}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setRequestTranslate(!requestTranslate);
        }}
        style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
        <MyIcon name="translateIcon" />
        <Text style={{fontSize: 10, color: '#757575'}}>{t('translate')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtherPersonChatContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
    paddingVertical: 8,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#ebebeb',
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 34,
    paddingHorizontal: 20,
    paddingVertical: 7,
    maxWidth: '55%',
  },
  content: {
    fontSize: 14,
    color: '#000',
  },
});
