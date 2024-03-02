import { Tabs } from "expo-router";

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home" options={{ title: 'Home'}}/>  
            <Tabs.Screen name="exercises" options={{ title: 'Exercises'}}/>
        </Tabs>
    )
}