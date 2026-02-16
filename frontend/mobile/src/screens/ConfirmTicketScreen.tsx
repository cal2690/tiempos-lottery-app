import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
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

  // Ref correcto del componente ViewShot
  const viewRef = useRef<ViewShot | null>(null);

  const shareTicket = async () => {
    try {
      if (!viewRef.current) return;

      // Cast necesario porque la librería no tipa bien capture()
      const uri = await (viewRef.current as any).capture();

      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert(
          'Error',
          'Compartir no está disponible en este dispositivo'
        );
        return;
      }

      await Sharing.shareAsync(uri);

    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el ticket');
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewRef}
        options={{ format: 'png', quality: 1 }}
      >
        <TicketPreview
          raffle={raffle}
          numbers={numbers}
          total={total}
        />
      </ViewShot>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={shareTicket}
      >
        <Text style={styles.shareButtonText}>
          Compartir Ticket
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
