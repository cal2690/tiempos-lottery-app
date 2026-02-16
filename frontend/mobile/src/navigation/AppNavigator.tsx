import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectTimeScreen from '../screens/SelectTimeScreen';
import RegisterNumbersScreen from '../screens/RegisterNumbersScreen';
import { ActiveRaffle } from '../models/ActiveRaffle';
import { TicketNumber } from '../models/TicketNumber';
import ConfirmTicketScreen from '../screens/ConfirmTicketScreen';

export type RootStackParamList = {
  SelectTime: undefined;
  RegisterNumbers: { raffle: ActiveRaffle };
  ConfirmTicket: {
    raffle: ActiveRaffle;
    numbers: TicketNumber[];
    total: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectTime"
          component={SelectTimeScreen}
        />

        <Stack.Screen
          name="RegisterNumbers"
          component={RegisterNumbersScreen}
        />

        <Stack.Screen
          name="ConfirmTicket"
          component={ConfirmTicketScreen}
          options={{ title: 'Confirmar Ticket' }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
