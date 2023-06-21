import { StatusBar } from 'expo-status-bar';
import { Keyboard } from 'react-native';
import { useState, useEffect } from 'react';

//importando icones
import { MaterialCommunityIcons } from '@expo/vector-icons';

//importando bibliotacas para fazer o tab navigator
import 'react-native-gesture-handler';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//páginas importadas
import MainPage from './Pages/Main';
import ItemPage from './Pages/ItemPage';

const Tab = createBottomTabNavigator()


export default function App() {

  const [Item, setItem] = useState();
  const [Files, setFiles] = useState([]);

  const sendComments = () => {
    const fileId = Date.now() + Math.random();
    setFiles([...Files, { Item, id: fileId }]);
    Keyboard.dismiss();
  };

  const deletFile = (fileId) => {
    const updatedFile = Files.filter((file) => file.id !== fileId);
    setFiles(updatedFile);
  };

  useEffect(() => {
    console.log(Files);
  }, [Files]);


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => {

            let iconName;
            const isFocused = useIsFocused();
            if (route.name === 'Adicionar um novo item') {
              if (isFocused) {
                iconName = 'comment-plus';
                color = "#6E259A"
              } else {
                iconName = 'comment-plus-outline';
              }
            } else if (route.name === 'Planner') {
              if (isFocused) {
                iconName = 'comment-text-multiple';
                color = "#6E259A"
              } else {
                iconName = 'comment-text-multiple-outline';
              }
            }
            return <MaterialCommunityIcons name={iconName} size={35} color={color} />;
          },
        })
        }>

        <Tab.Screen name='Adicionar um novo item'>
          {(props) => <MainPage Item={setItem} function={sendComments} />}
        </Tab.Screen>

        <Tab.Screen name='Planner'>
          {props => <ItemPage data={Files} function={deletFile} />}
        </Tab.Screen>

      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer >


  );
}
