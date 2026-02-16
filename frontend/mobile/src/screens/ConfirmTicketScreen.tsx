import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import TicketPreview from '../components/TicketPreview';

type ConfirmRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmTicket'
>;

export default function ConfirmTicketScreen() {
  const route = useRoute<ConfirmRouteProp>();
  const { raffle, numbers, total } = route.params;

  return (
    <View style={styles.container}>
      <TicketPreview
        raffle={raffle}
        numbers={numbers}
        total={total}
      />

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>
          Compartir por WhatsApp
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: '#25D366',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  shareButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
