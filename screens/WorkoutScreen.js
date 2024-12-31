import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkoutScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workoutInstructions, setWorkoutInstructions] = useState('');
  
  // Mock workout instructions. This should be replaced with actual instructions data
  const workoutTypes = {
    'Push-up': '1. Keep your body straight. 2. Lower your chest until your elbows are at a 90-degree angle.',
    'Squat': '1. Stand with feet shoulder-width apart. 2. Lower your body as if sitting in a chair.',
    'Lunge': '1. Step forward with one leg. 2. Lower your back knee towards the ground while keeping your torso upright.'
  };

  // Set workout type, it can be dynamic based on navigation or passed props
  const workoutType = 'Push-up'; // Example static type, you can change it dynamically

  useEffect(() => {
    // Set instructions for the selected workout type
    setWorkoutInstructions(workoutTypes[workoutType]);
  }, [workoutType]); // If workoutType changes, update instructions

  useEffect(() => {
    const loadTimer = async () => {
      try {
        const savedTime = await AsyncStorage.getItem('workoutTimer');
        if (savedTime) {
          setSeconds(parseInt(savedTime, 10)); // Load saved time
        }
      } catch (error) {
        console.error('Error loading timer:', error);
      }
    };
    loadTimer();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isRunning]);

  useEffect(() => {
    const saveTimer = async () => {
      try {
        await AsyncStorage.setItem('workoutTimer', seconds.toString());
      } catch (error) {
        console.error('Error saving timer:', error);
      }
    };
    saveTimer();
  }, [seconds]);

  const resetTimer = async () => {
    setIsRunning(false);
    setSeconds(0);
    try {
      await AsyncStorage.removeItem('workoutTimer');
    } catch (error) {
      console.error('Error resetting timer:', error);
    }
  };

  const caloriesBurned = Math.floor((seconds / 60) * 5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Timer</Text>
      <Text style={styles.timer}>
        {new Date(seconds * 1000).toISOString().substr(11, 8)}
      </Text>
      <Text style={styles.calories}>Calories Burned: {caloriesBurned} kcal</Text>

      {/* Workout Instructions Section */}
      <ScrollView style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to Perform {workoutType}</Text>
        <Text style={styles.instructions}>{workoutInstructions}</Text>
      </ScrollView>

      <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
      <Button title="Reset Timer" onPress={resetTimer} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6f5d6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  calories: {
    fontSize: 20,
    marginBottom: 20,
    color: '#555',
  },
  instructionsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 200, // Limit max height to prevent overflow
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});
