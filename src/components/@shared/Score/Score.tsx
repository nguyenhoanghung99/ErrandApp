import {StyleSheet, View} from 'react-native';
import React from 'react';
import ScoreIcon from './ScoreIcon';

interface ScoreProps {
  score: number;
  setScore?: (score: number) => void;
}

const Score = ({score, setScore}: ScoreProps) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        if (item <= score) {
          return (
            <ScoreIcon
              key={index}
              fill
              onPress={() => {
                setScore && setScore(item);
              }}
            />
          );
        }
        return (
          <ScoreIcon
            key={index}
            onPress={() => {
              setScore && setScore(item);
            }}
          />
        );
      })}
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
