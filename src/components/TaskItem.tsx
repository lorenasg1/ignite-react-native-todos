import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import closeIcon from '../assets/icons/close/X.png';
import { Task } from './TasksList';

type TaskItem = {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
};

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItem) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, task.title);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {task.done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        {isEditing ? (
          <TextInput
            ref={textInputRef}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={[
              task.done ? styles.taskTextDone : styles.taskText,
              { padding: 0, margin: 0, height: 20 },
            ]}
          />
        ) : (
          <Text style={task.done ? styles.taskTextDone : styles.taskText}>
            {taskTitle}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.icons}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 16 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View
          style={[
            styles.divider,
            {
              opacity: isEditing ? 0.2 : 1,
              backgroundColor: isEditing ? '#c4c4c4' : '#b2b2b2',
            },
          ]}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
});
