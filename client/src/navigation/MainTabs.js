import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import MapScreen from '../screens/Map/MapScreen';
import VehicleListScreen from '../screens/Vehicles/VehicleListScreen';
import EVListScreen from '../screens/EV/EVListScreen';
import RentalPlansScreen from '../screens/Plans/RentalPlansScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProfileMain" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Vehicles') {
            iconName = focused ? 'bicycle' : 'bicycle-outline';
          } else if (route.name === 'EV') {
            iconName = focused ? 'flash' : 'flash-outline';
          } else if (route.name === 'Plans') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        headerShown: true,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Vehicles" component={VehicleListScreen} />
      <Tab.Screen name="EV" component={EVListScreen} />
      <Tab.Screen name="Plans" component={RentalPlansScreen} />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
