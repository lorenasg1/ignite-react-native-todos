import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find((task) => task.title === newTaskTitle);

    if (task) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    let updatedTasks = tasks.map((task) => ({ ...task }));
    let task = updatedTasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    task.done = !task.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    return Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    let updatedTasks = tasks.map((task) => ({ ...task }));
    let task = updatedTasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
