import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native-gesture-handler';

export default HomeScreen = ({navigation}) => {
  const [isfName, isSetFName] = useState('');
  const [isLName, isSetLName] = useState('');
  const [isEmail, isSetEmail] = useState('');
  const [isAge, isSetAge] = useState('');
  const [isSet, setIsSet] = useState([
    {id: 1, value: true, name: 'Male', selected: false},
    {id: 2, value: false, name: 'Female', selected: false},
  ]);
  const onRadioBtnClick = item => {
    let updatedState = isSet.map(isSetItem =>
      isSetItem.id === item.id
        ? {...isSetItem, selected: true}
        : {...isSetItem, selected: false},
    );
    setIsSet(updatedState);
  };
  const checkTextInput = () => {
    if (!isfName.trim()) {
      Alert.alert('First Name Is Missing!');
      return false;
    } else if (!isLName.trim()) {
      Alert.alert('Last Name Is Missing!');
      return false;
    } else if (!isEmail.trim()) {
      Alert.alert('Email Is Missing!');
      return false;
    } else if (isEmail.trim()) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          isEmail,
        )
      ) {
        return true;
      } else {
        Alert.alert('Enter valid Email');
        return false;
      }
    } else if (!isAge) {
      Alert.alert('Age Is Missing!');
      return false;
    }
    // else if(radioVal) {
    //   Alert.alert('Gender Is Undefined!');
    //   return false;
    // }
    else {
      Alert.alert('Your records have been saved successfully!');
      return true;
    }
  };
  const validateAndMove = () => {
    checkTextInput();
    if (checkTextInput()) {
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
      <Text
        style={{
          fontSize: 35,
          paddingBottom: 9,
          color: 'black',
          textDecorationLine: 'underline',
          fontWeight: 'bold',
        }}>
        Please fill below details!
      </Text>
      <View style={{flex: 0, flexDirection: 'row'}}>
        <TextInput
          style={styles.userInputName}
          placeholder="Enter your first name!"
          onChangeText={val => isSetFName(val)}
        />
        <TextInput
          style={styles.userInputName}
          placeholder="Enter your last name!"
          onChangeText={val => isSetLName(val)}
        />
      </View>
      <TextInput
        style={styles.userInput}
        placeholder="Enter your Email id!"
        keyboardType="email-address"
        onChangeText={val => isSetEmail(val)}
      />
      <TextInput
        style={styles.userInput}
        placeholder="Enter your age!"
        keyboardType="number-pad"
        onChangeText={val => isSetAge(val)}
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
          style={styles.submitBtn}
          onPress={() => {
            validateAndMove();
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#ac00ff',
  },
  userInputName: {
    backgroundColor: '#acc0ff80',
    borderBottomColor: 'black',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 12,
    margin: 14,
    width: 167,
    fontSize: 16,
    color: 'black',
  },
  userInput: {
    backgroundColor: '#acc0ff80',
    borderBottomColor: 'darkgreen',
    borderRightColor: 'darkgreen',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 12,
    margin: 14,
    width: 360,
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
  },
  radioButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'blue',
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  submitBtn: {
    marginLeft: 150,
    backgroundColor: 'blue',
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    padding: 3,
    fontSize: 23,
  },
});
