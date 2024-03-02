import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="list" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
