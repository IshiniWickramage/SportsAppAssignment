import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalsScreen() {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoal = () => {
    if (goal.trim()) {
      setGoals([...goals, { id: Math.random().toString(), value: goal }]);
      setGoal('');
    }
  };

  return (
    <LinearGradient
      colors={['#ff9a9e', '#fad0c4']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Set Your Fitness Goals</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your goal"
          placeholderTextColor="#888"
          value={goal}
          onChangeText={setGoal}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Goal" onPress={addGoal} color="#ff6f61" />
        </View>
        <FlatList
          data={goals}
          renderItem={({ item }) => <Text style={styles.goalItem}>{item.value}</Text>}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'sans-serif-light',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  goalItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffedec',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
