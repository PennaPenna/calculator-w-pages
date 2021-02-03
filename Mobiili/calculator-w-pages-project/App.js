import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function Calculator({ navigation}) {
  const [texta, setTexta] = useState('');
  const [textb, setTextb] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const calculate = (operator)=> {
    let result=0;
    const [numbera, numberb]=[Number(texta), Number(textb)];
    switch (operator) {
      case '+':
        result=numbera + numberb;
        break;
      case '-':
        result=numbera - numberb;
        break;
    }
    setResult(result);
    setTexta('');
    setTextb('');
    const count=`${numbera} ${operator }${numberb} = ${result}`;
    setHistory([...history, {key:count}]);
  };
  return (
    <View style={styles.container}>
     <Text>Result: {result}</Text>

      <TextInput id="a"
        keyboardType="number-pad"
        style ={{width:150 , borderColor:'#333', borderWidth:1, marginBottom:-1}}
        onChangeText={texta =>  setTexta(texta)}
        value={texta}
        />

  <TextInput id="b"
        keyboardType="number-pad"
        style ={{width:150 , borderColor:'#333', borderWidth:1, marginBottom:10}}
        onChangeText={textb =>  setTextb(textb)}
        value={textb}
              />

    <View style={styles.buttonContainer}>
        <Button onPress={() => calculate('+')} title="+"/>
        <Button onPress={() => calculate('-')} title="-"/>
        <Button
        title="HISTORY"
        onPress={() => navigation.navigate('History',  {paramKey: history,
        })
      } />
      </View>
    {/*  <View style={styles.historyContainer}>
    <FlatList data ={history} renderItem={({item}) =>
      <Text style={{marginBottom:5}}>{item.key}</Text >}/>
      </View>*/}
  </View>
  );
}

function History({ route }) {
  return (
    <View style={styles.container}>
  <FlatList data ={route.params.paramKey} renderItem={({item}) =>
    <Text style={{marginBottom:5}}>{item.key}</Text >}/>
  </View>
  )
}

export default function App() {
return (
  <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:140,
  },
/*  historyContainer: {
    width:150,
    marginTop:5,
    alignItems:'center',
  },*/
});
