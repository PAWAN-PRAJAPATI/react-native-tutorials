import { AppRegistry } from 'react-native';
//import Application from './src/Application.container';
//import App from './App';
import Finger from './Finger';
import ViewPasswords from './ViewPasswords';
import {StackNavigator} from 'react-navigation'
import AddPassword from './AddPassword'
const App = StackNavigator({
    Finger: {screen: Finger},
    ViewPasswords: {screen: ViewPasswords},
    AddPassword: {screen: AddPassword},

}
)




AppRegistry.registerComponent('Demo_images', () => App);
