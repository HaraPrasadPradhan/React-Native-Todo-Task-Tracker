import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todo.addTodo);
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding a todo task", error);
        Alert.alert(
          "Error",
          "Something went missing and todo task not created",
        );
      }
    }
  };
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="Write your tasks"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
          //   multiline is a property to change the submit to enter where you can write multiple lines
          //   multiline
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
