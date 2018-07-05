import React from 'react';

import { StackNavigator } from 'react-navigation';
import Dashboard from './Dashboard';
import DrivingMap from './DrivingMap';
import DrivingEvents from './DrivingEvents';
import Settings from './Settings';
import Start from './Start';
import Api from './Api';

const App = StackNavigator({
    Start: {screen: Start},
    Dashboard: { screen: Dashboard },
    DrivingMap: { screen:DrivingMap},
    DrivingEvents: { screen: DrivingEvents},
    Settings: {screen: Settings},
    Api: {screen: Api}
})

export default App;
