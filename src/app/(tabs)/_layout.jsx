import { Tabs } from "expo-router";
import HomeScreen from "./home";

export default () => {
    return(
        <Tabs>
            <Tabs.Screen name="home"/>  
            <Tabs.Screen name="exercises"/>
        </Tabs>
    )
}