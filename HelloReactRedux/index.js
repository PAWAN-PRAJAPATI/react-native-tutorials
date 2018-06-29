
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './app/screens';

registerScreens(); 

Navigation.startSingleScreenApp({
    screen: {
        screen: 'home.screen1', // unique ID registered with Navigation.registerScreen
        title: 'Screen1', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
});

/*const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('HelloReactRedux', () => App);*/
