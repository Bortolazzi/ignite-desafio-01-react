import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

interface TasksItemProps {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTitle(task.title);
        setIsEditing(false);
    }

    function handlSubmitEditing() {
        editTask(task.id, newTitle);
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
    }, [isEditing])

    return (
        <View>
            <ItemWrapper index={index}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.taskButton}
                        onPress={() => toggleTaskDone(task.id)}
                    >
                        <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
                            {task.done && (
                                <Icon
                                    name="check"
                                    size={12}
                                    color="#FFF"
                                />
                            )}
                        </View>

                        <TextInput
                            value={newTitle}
                            onChangeText={setNewTitle}
                            editable={isEditing}
                            onSubmitEditing={handlSubmitEditing}
                            style={task.done ? styles.taskTextDone : styles.taskText}
                            ref={textInputRef}
                        />

                    </TouchableOpacity>
                </View>

                <View style={styles.iconsContainer}>
                    {
                        isEditing ? (
                            <TouchableOpacity onPress={handleCancelEditing}>
                                <Icon name="x" size={24} color='#B2B2B2' />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleStartEditing}>
                                <Image source={penIcon} />
                            </TouchableOpacity>
                        )
                    }

                    <View style={styles.iconsDivider} />

                    <TouchableOpacity
                        onPress={() => removeTask(task.id)}
                        disabled={isEditing}
                    >
                        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                    </TouchableOpacity>
                </View>


            </ItemWrapper>
        </View>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    infoContainer: {
        flex: 1
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196,196, 196, 0.24)',
        marginHorizontal: 12
    }
})