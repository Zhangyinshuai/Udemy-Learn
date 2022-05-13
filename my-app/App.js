import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  console.log("App Start!");
  const addGoalHandler = (goalTitle) => {
    if (goalTitle.length === 0) {
      return;
    }
    setCourseGoals(
      currentGoals => [...currentGoals, { id: Math.random().toString(), value: goalTitle }]
    );
    setIsAddMode(false);
  };

  const removeGoalHandle = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }

  const cancelGoalAdditionHandle = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} handlePress={addGoalHandler} handleCancel={cancelGoalAdditionHandle} />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={itemData => (
        <GoalItem 
          title={itemData.item.value} 
          onDelete={() => removeGoalHandle(itemData.item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
