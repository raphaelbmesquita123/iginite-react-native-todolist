import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

interface IData {
  id: string;
  finished: boolean;
  title: string;
}
export default function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [data, setData] = useState<IData[]>([] as IData[]);

  function finishTask(id: string) {
    setData((oldData) => {
      return oldData.map((d) =>
        d.id === id ? { ...d, finished: !d.finished } : d
      );
    });
  }

  function addNewTask(task: string) {
    if (newTask === "") {
      return Alert.alert("Adicione algum texto!");
    }
    setData((oldData) => [
      ...oldData,
      {
        id: String(oldData.length + 1),
        title: task,
        finished: false,
      },
    ]);
    setNewTask("");
  }

  function deleteTask(id: string) {
    setData((oldData) => {
      return oldData.filter((d) => d.id !== id);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <Image source={require("./assets/logo.png")} />
      </View>
      <View style={styles.body}>
        <View style={styles.inputButton}>
          <TextInput
            style={styles.input}
            placeholderTextColor='#808080'
            placeholder='Adicione uma nova tarefa!'
            onChangeText={(e) => setNewTask(e)}
            value={newTask}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => addNewTask(newTask)}
          >
            <View style={styles.buttonCircle}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bodyHeader}>
          <View style={styles.bodyHeaderWrap}>
            <Text style={styles.headerCriadas}>Criadas</Text>
            <Text style={styles.headerQuantity}>{data.length}</Text>
          </View>
          <View style={styles.bodyHeaderWrap}>
            <Text style={styles.headerConcluidas}>Concluidas</Text>
            <Text style={styles.headerQuantity}>
              {data.filter((d) => d.finished).length}
            </Text>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <View style={styles.todoList}>
              {item.finished ? (
                <TouchableOpacity
                  style={styles.finishedTaskButton}
                  onPress={() => finishTask(item.id)}
                />
              ) : (
                <TouchableOpacity
                  style={styles.finishTaskButton}
                  onPress={() => finishTask(item.id)}
                />
              )}
              <Text
                style={{
                  ...styles.todoListText,
                  textDecorationLine: item.finished ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.removeText}>-</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: 20,
    width: "100%",
    height: 200,
    backgroundColor: "#0D0D0D",
  },
  inputButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: -40,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E6F9F",
    marginLeft: 20,
    width: 52,
    height: 52,
    borderRadius: 5,
  },
  buttonCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    padding: 0,
    margin: 0,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 18,
    position: "absolute",
    top: "-30%",
    left: "20%",
    fontWeight: "bold",
    color: "white",
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 5,
    padding: 15,
    color: "white",
    fontSize: 16,
    backgroundColor: "#262626",
  },
  body: {
    flex: 1,
    width: "100%",
    padding: 10,
    zIndex: 1,
    backgroundColor: "#181818",
  },
  bodyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottom: 2,
    borderColor: "#262626",
    top: -30,
  },
  bodyHeaderWrap: {
    flexDirection: "row",
  },
  headerCriadas: {
    color: "#4EA8DE",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerConcluidas: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#8284FA",
  },
  headerQuantity: {
    width: 25,
    borderRadius: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: "#262626",
  },
  todoList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#262626",
  },
  todoListText: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    color: "white",
    textDecorationStyle: "solid",
  },
  finishTaskButton: {
    borderColor: "#1E6F9F",
    borderWidth: 3,
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  finishedTaskButton: {
    backgroundColor: "#8284FA",
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b1b1b",
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
  },
});
