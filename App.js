import * as React from 'react';
import { useState } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RadioButton = ({onPress, selected, children}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

function HomeScreen ({navigation}) {
  const [isfName, isSetFName] = useState('');
  const [isLName, isSetLName] = useState('');
  const [isEmail, isSetEmail] = useState('');
  const [isAge, isSetAge] = useState('');
  const [isSet, setIsSet] = useState([
    { id: 1, value: true, name: "Male", selected: false },
    { id: 2, value: false, name: "Female", selected: false }
  ]);
  const onRadioBtnClick = (item) => {
    let updatedState = isSet.map((isSetItem) =>
      isSetItem.id === item.id
        ? { ...isSetItem, selected: true }
        : { ...isSetItem, selected: false }
    );
    setIsSet(updatedState);
  };
  const checkTextInput = () => {
    if (!isfName.trim()) {
      Alert.alert('First Name Is Missing!');
      return false;
    }
    else if (!isLName.trim()) {
      Alert.alert('Last Name Is Missing!');
      return false;
    }
    else if (!isEmail.trim()) {
      Alert.alert('Email Is Missing!')
      return false;
    }
    else if(isEmail.trim()){
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(isEmail)) {
        return true;
      } else {
        Alert.alert('Enter valid Email');
        return false;
      }
    }
    else if (!isAge) {
      Alert.alert('Age Is Missing!');
      return false;
    }
    else{
      Alert.alert('Your recors have been saved successfully!')
      return true;
    }
  };
  const validateAndMove = () => {
    checkTextInput();
    if(checkTextInput()){
      navigation.navigate('Details', {
        FirstName: isfName,
        LastName: isLName,
        Email: isEmail,
        Age: isAge,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 35, paddingBottom: 9, color: 'black', textDecorationLine: "underline", fontWeight: "bold"}}>
        Please fill below details!
      </Text>
      <View style={{flex: 0, flexDirection: 'row'}}>
        <TextInput
          style={styles.userInputName}
          placeholder="Enter your first name!"
          onChangeText={(val) => isSetFName(val) }
        />
        <TextInput
          style={styles.userInputName}
          placeholder="Enter your last name!"
          onChangeText={(val) => isSetLName(val)}
        />
      </View>
      <TextInput
        style={styles.userInput}
        placeholder="Enter your Email id!"
        keyboardType="email-address"
        onChangeText={(val) => isSetEmail(val)}
      />
      <TextInput
        style={styles.userInput}
        placeholder="Enter your age!"
        keyboardType="number-pad"
        onChangeText={(val) => isSetAge(val)}
      />
      {isSet.map(item => (
        <RadioButton
          onPress={() => onRadioBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </RadioButton>
      ))}
      <TouchableOpacity>
        <Text 
          style = {styles.submitBtn}
          onPress={() =>
            {
              validateAndMove();
            }
          }
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailScreen ({route, navigation}){
  const {FirstName} = route.params;
  const {LastName} = route.params;
  const {Email} = route.params;
  const {Age} = route.params;
  return(
    <View style = {styles.detailsContainer}>
      {/* <Text style = {styles.displayText}>Your name: {JSON.stringify(FirstName + LastName)}</Text>
      <Text style = {styles.displayText}>Your Email: {JSON.stringify(Email)}</Text>
      <Text style = {styles.displayText}>Your Age: {JSON.stringify(Age)}</Text> */}
      <Text style = {styles.displayText}>Your Name: {route.params?.FirstName + route.params?.LastName}</Text>
      <Text style = {styles.displayText}>Your Email: {route.params?.Email}</Text>
      <Text style = {styles.displayText}>Your Age: {route.params?.Age}</Text>

      {/* <Button title="Want to update?" onPress={() => navigation.navigate('Home')} /> */}
      <TouchableOpacity
        style = {styles.updateBtn}
        onPress = {() => navigation.navigate('Home')}
      >
        <Text style = {{color: "white", fontSize: 18, fontWeight: "bold"}}>WANT TO UPDATE?</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "lightgreen",
  },
  userInputName: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderRightColor: "black",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 12, 
    margin: 14,
    width: 167,
    fontSize: 16,
    color: "black",
  },
  userInput: {
    backgroundColor: "white",
    borderBottomColor: "darkgreen",
    borderRightColor: "darkgreen",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 12, 
    margin: 14,
    width: 360,
    justifyContent: "center",
    fontSize: 18,
    color: "black",
  },
  radioButtonContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "blue"
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
  },
  submitBtn: {
    marginLeft: 150,
    backgroundColor: "blue",
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    padding: 3,
    fontSize: 23,
  },
  displayText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "black",
    padding: 7,
  },
  detailsContainer: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "grey",
  },
  updateBtn: {
    marginLeft: 100,
    marginTop: 22,
    backgroundColor: "blue",
    borderRadius: 10,
    fontWeight: "bold",
    padding: 7,
  },
});