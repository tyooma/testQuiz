import React, { FC, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WebViewModal from '../components/WebViewModal';
import { questions } from '../consts/quizQuestions';
import Quiz from '../components/Quiz';
import Loader from '../components/Loader';
import Button from '../components/Button';

const MainScreen: FC = () => {
  const [url, setUrl] = useState<string>('https://www.instagram.com');
  const [urlExists, setUrlExists] = useState<boolean | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showWebView, setShowWebView] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const checkUrlExists = async () => {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        setUrlExists(true);
        setShowWebView(true);
      }
    } catch (error) {
      setUrlExists(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const completeQuiz = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      AsyncStorage.setItem('quizScore', score.toString());
      setQuizCompleted(true);
    }
  };

  const closeWebView = () => {
    setShowWebView(false);
  };

  const handleAnswer = useCallback(
    (selectedOption: string) => {
      setSelectedOption(selectedOption);
      setTimeout(() => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
        completeQuiz();
      }, 1000);
    },
    [currentQuestion, score],
  );

  const retryQuiz = () => {
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
  };

  useEffect(() => {
    checkUrlExists();
  }, []);

  return (
    <View style={styles.container}>
      {urlExists === null && <Loader />}
      {urlExists === true && showWebView && (
        <WebViewModal visible={showWebView} close={closeWebView} url={url} />
      )}
      {!quizStarted && urlExists !== null && (!urlExists || !showWebView) && (
        <Button title="Start Quiz" onPress={startQuiz} />
      )}
      {quizStarted && !quizCompleted && !showWebView && (
        <Quiz
          questions={questions}
          currentQuestion={currentQuestion}
          selectedOption={selectedOption}
          handleAnswer={handleAnswer}
        />
      )}
      {quizCompleted && !showWebView && (
        <View style={styles.center}>
          <Text style={styles.resultText}>
            Your Score: {score}/{questions.length}
          </Text>
          <Button title="Retry Quiz" onPress={retryQuiz} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MainScreen;
