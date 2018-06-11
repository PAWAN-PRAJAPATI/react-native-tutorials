import React from 'react';

import { StackNavigator } from 'react-navigation';
import Bar from './Bar';
import Location from './Location';
import DrivingEvents from './DrivingEvents';
import Settings from './Settings';
const App = StackNavigator({
    Bar: { screen:Bar },
    Location: { screen:Location},
    DrivingEvents: { screen: DrivingEvents},
    Settings: {screen: Settings}
})

export default App;
