import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {S3Image} from 'aws-amplify-react-native';
import MyIcon from '../MyIcons';
import translate from 'translate-google-api';

interface ErrandCardProps {
  imgSrc?: string;
  category?: string;
  title: string;
  distance: string;
  time: string;
  price: string;
  volunteerCount?: number;
  language?: string;
}

const ErrandCard = (props: ErrandCardProps) => {
  const {
    imgSrc,
    category,
    title,
    distance,
    time,
    price,
    volunteerCount,
    language,
  } = props;

  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (language !== 'original') {
      translate(title, {to: language})
        .then(res => {
          setNewTitle(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setNewTitle(title);
    }
  }, [language, title]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {imgSrc ? (
          <View style={styles.image}>
            <S3Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'center',
              }}
              imgKey={imgSrc}
            />
          </View>
        ) : (
          <View style={{...styles.image, backgroundColor: '#ebebeb'}} />
        )}
        <Text numberOfLines={1} style={styles.category}>
          {category}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {newTitle}
        </Text>
        <View style={styles.info}>
          <Text style={styles.infoText}>{distance}</Text>
          <Text style={styles.infoText}>{time}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
      {volunteerCount && (
        <View style={styles.volunteerCount}>
          <MyIcon name="volunteers" />
          <Text style={styles.volunteerCountText}>{volunteerCount}</Text>
        </View>
      )}
    </View>
  );
};

export default ErrandCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    height: 96,
    flexDirection: 'row',
    borderRadius: 6,
    alignItems: 'center',
  },
  categoryContainer: {
    gap: 10,
    marginLeft: 13,
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#757575',
    maxWidth: 46,
  },
  image: {
    overflow: 'hidden',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 33,
  },
  title: {
    maxWidth: '80%',
    fontSize: 15,
    fontWeight: '400',
    color: '#171717',
  },
  info: {
    marginTop: 7,
    flexDirection: 'row',
    gap: 17,
  },
  infoText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#757575',
  },
  price: {
    marginTop: 13,
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },
  volunteerCount: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  volunteerCountText: {
    fontSize: 12,
    color: '#757575',
  },
});
