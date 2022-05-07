import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);

    if (foundTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const taskAdd = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(allTasks => [...allTasks, taskAdd]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskUpdate = updatedTasks.find(task => task.id === id);
    if (!taskUpdate)
      return;

    taskUpdate.done = !taskUpdate.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          setTasks(allTasks => allTasks.filter(
            task => task.id !== id
          ));
        }
      }]);
  }

  function handleEditTask(id: number, newTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskUpdate = updatedTasks.find(task => task.id === id);
    if (!taskUpdate)
      return;

    taskUpdate.title = newTitle;
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})