import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';

import { QuizProp } from '../types/types';

const Quiz: FC<QuizProp> = ({
  questions,
  currentQuestion,
  selectedOption,
  handleAnswer,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {questions[currentQuestion].question}
      </Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option
              ? option === questions[currentQuestion].correctAnswer
                ? styles.correctOption
                : styles.incorrectOption
              : null,
          ]}
          onPress={() => handleAnswer(option)}
          disabled={selectedOption !== null}>
          <Text
            style={[
              styles.optionButtonText,
              selectedOption === option
                ? option === questions[currentQuestion].correctAnswer
                  ? styles.correctOptionText
                  : styles.incorrectOptionText
                : null,
            ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width - 30,
  },
  optionButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  correctOptionText: {
    color: 'white',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  incorrectOptionText: {
    color: 'white',
  },
});
