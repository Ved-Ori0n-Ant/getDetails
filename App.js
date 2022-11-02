import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { myStore } from './src/redux/store/store';
import { addItemToCart, removeItemFromCart } from './src/redux/action/Actions'

const HOME_ICON = require('./src/assets/activeHome.png');
const LIST_ICON = require('./src/assets/activeList.png');
const IMAGE_ICON = require('./src/assets/activeImage.png');
const IMAGE = require('./src/assets/fragile.jpg');

const data = [
  {
    name: 'shoe 1',
    price: 'INR 1073',
    image: 'https://thumbs.dreamstime.com/b/blue-shoes-29507491.jpg',
  },
  {
    name: 'shoe 2',
    price: 'INR 1053',
    image: 'https://thumbs.dreamstime.com/b/vintage-red-shoes-23151148.jpg',
  },
  {
    name: 'shoe 3',
    price: 'INR 2100',
    image: 'https://m.media-amazon.com/images/I/61pyzC4yjJS._UL1100_.jpg',
  },
  {
    name: 'shoe 4',
    price: 'INR 646',
    image: 'https://m.media-amazon.com/images/I/81zvQE8fMfL._UY575_.jpg',
  },
  {
    name: 'shoe 5',
    price: 'INR 2145',
    image: 'https://thumbs.dreamstime.com/b/vintage-red-shoes-23151148.jpg',
  },
  {
    name: 'shoe 6',
    price: 'INR 2500',
    image: 'https://m.media-amazon.com/images/I/61pyzC4yjJS._UL1100_.jpg',
  },
];

// const [radioVal, setRadioVal] = useState('false');
const RadioButton = ({onPress, selected, children}) => {
  // if(selected) {
  //   setRadioVal('true');
  // }
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

const ImagePicker = ({CameraOptions, launchCamera, launchImageLibrary}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const camera = () => {
    launchCamera(CameraOptions, callback => {
      if (callback.didCancel) {
        Alert.alert('Cancelled image picker');
      } else if (callback.errorCode) {
        Alert.alert(callback.errorCode);
      } else if (callback.assets) {
        console.log(callback.assets);
        setImagePath();
        setIsClicked(false);
      } else {
        console.log(callback);
      }
    });
  };
  const storage = () => {
    launchImageLibrary(CameraOptions, callback => {
      if (callback.didCancel) {
        Alert.alert('Cancelled image picker');
      } else if (callback.errorCode) {
        Alert.alert(callback.errorCode);
      } else if (callback.assets) {
        console.log(callback.assets);
        setImagePath();
        setIsClicked(false);
      } else {
        console.log(callback);
      }
    });
  };
  return (
    <View>
      {isClicked ? (
        <>
          <View>
            <Button title="Upload From Camera" onPress={() => camera()} />
            <Button title="Upload From Gallary" onPress={() => storage()} />
          </View>
        </>
      ) : (
        <View>
          <Button title="Upload Image" onPress={() => setIsClicked(true)} />
          {imagePath !== '' ? <Image source={{uri: imagePath}} /> : null}
        </View>
      )}
    </View>
  );
};

function HomeScreen({navigation}) {
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
}

function DetailScreen({route, navigation}) {
  const {FirstName} = route.params;
  const {LastName} = route.params;
  const {Email} = route.params;
  const {Age} = route.params;
  return (
    <View style={styles.detailsContainer}>
      {/* <Text style = {styles.displayText}>Your name: {JSON.stringify(FirstName + LastName)}</Text>
      <Text style = {styles.displayText}>Your Email: {JSON.stringify(Email)}</Text>
    <Text style = {styles.displayText}>Your Age: {JSON.stringify(Age)}</Text> */}
      <Text style={styles.displayText}>
        Your Name: {route.params?.FirstName + route.params?.LastName}
      </Text>
      <Text style={styles.displayText}>Your Email: {route.params?.Email}</Text>
      <Text style={styles.displayText}>Your Age: {route.params?.Age}</Text>

      {/* <Button title="Want to update?" onPress={() => navigation.navigate('Home')} /> */}
      <TouchableOpacity
        style={styles.updateBtn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          WANT TO UPDATE?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ImagePickerScreen({navigation}) {
  return (
    <View>
      <Image source={IMAGE} style={{maxHeight: 534, maxWidth: 534}} />
      <ImagePicker />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  const dispatch = useDispatch();
  const addItem = (item) => {
    dispatch(addItemToCart(item))
  }
  const itemNum = useSelector(state => state);
  let counter = [];
  counter = itemNum;

  return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 70,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Redux Example
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              backgroundColor: '#abababc0',
              borderRadius: 23,
              width: 80,
              height: 30,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={IMAGE_ICON} style={{height: 20, width: 20}} />
            <Text>{counter.length}</Text>
          </TouchableOpacity>
        </View>
          <FlatList
            data={data}
            renderItem = {({item, index}) => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 100,
                    borderRadius: 15,
                    alignSelf: 'center',
                    marginTop: 10,
                    borderWidth: 0.2,
                    justifyContent: 'space-between',
                    borderColor: '#8e8e8e',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 9,
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text>{item.name}</Text>
                    <Text style = {{fontSize: 23, fontWeight: 'bold'}}>{item.price}</Text>
                    <TouchableOpacity
                      style={{backgroundColor: 'green', borderRadius: 7, padding: 3, justifyContent: 'center', alignItems: 'center'}}
                      onPress={() => {
                        addItem(item);
                      }}>
                      <Text style={{color: '#fff'}}>Add to samples</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 100, height: 90, marginRight: 15}}
                  />
                </View>
              );
            }}
          />
      </View>
  );
}

function SampleScreen({navigation}) {
  const items = useSelector(state => state)
  const dispatch = useDispatch();
  const removeItem = (index) => {
    dispatch(removeItemFromCart(index))
  }
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style = {{
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 24
      }}>
        <TouchableOpacity
          onPress={() => {navigation.goBack()}}
        >
          <Text style = {{fontWeight: '700', fontSize: 20}}>Back</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={items}
        renderItem = {({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                height: 100,
                borderRadius: 15,
                alignSelf: 'center',
                marginTop: 10,
                borderWidth: 0.2,
                justifyContent: 'space-between',
                borderColor: '#8e8e8e',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 9,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text>{item.name}</Text>
                <Text style = {{fontSize: 23, fontWeight: 'bold'}}>{item.price}</Text>
                <TouchableOpacity
                  style={{backgroundColor: 'red', borderRadius: 7, padding: 3, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    removeItem(index);
                  }}>
                  <Text style={{color: '#fff'}}>Remove</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{uri: item.image}}
                style={{width: 100, height: 90, marginRight: 15}}
              />
            </View>
          );
        }}
      />
      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style= {{
          borderRadius: 7, 
          backgroundColor: '#12a3af', 
          marginBottom: 24, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 3,
          height: 70,
          width: 170,
        }}>
          <Text style = {{color: '#fff', fontSize: 20, fontWeight: '700'}}>Check out!!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Products">
      <Drawer.Screen name="Products" component={NotificationsScreen} />
      <Drawer.Screen name="Cart" component={SampleScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveBackgroundColor: '#c0c0ffc0',
          tabBarInactiveBackgroundColor: '#c0c0ffc0',
          tabBarActiveTintColor: 'orange',
          tabBarIcon: () => {
            let iconPath;
            if (route.name === 'Home') {
              iconPath = HOME_ICON;
            } else if (route.name === 'Details') {
              iconPath = LIST_ICON;
            } else if (route.name === 'Image') {
              iconPath = IMAGE_ICON;
            } else {
              iconPath = IMAGE;
            }
            return (
              <Image source={iconPath} style={{maxHeight: 28, maxWidth: 28}} />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailScreen} />
        <Tab.Screen name="Image" component={ImagePickerScreen} />
        <Tab.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
      {/* <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Details' component={DetailScreen} />
        <Drawer.Screen name='Image' component={ImagePickerScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App = () => {
  return(
    <Provider store = {myStore}>
      <Main />
    </Provider>
  )
}

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
  displayText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    padding: 7,
  },
  detailsContainer: {
    padding: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'grey',
  },
  updateBtn: {
    marginLeft: 100,
    marginTop: 22,
    backgroundColor: 'blue',
    borderRadius: 10,
    fontWeight: 'bold',
    padding: 7,
  },
});