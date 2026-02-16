import { View, Text, StyleSheet } from 'react-native';
import { TicketNumber } from '../models/TicketNumber';
import { ActiveRaffle } from '../models/ActiveRaffle';

interface Props {
  raffle: ActiveRaffle;
  numbers: TicketNumber[];
  total: number;
}

export default function TicketPreview({ raffle, numbers, total }: Props) {
  return (
    <View style={styles.ticket}>
      <Text style={styles.header}>TIEMPOS</Text>
      <Text>
        {raffle.country} - {raffle.label}
      </Text>
      <Text>{raffle.date}</Text>

      <View style={styles.separator} />

      {numbers.map(n => (
        <View key={n.number} style={styles.row}>
          <Text style={styles.number}>{n.number}</Text>
          <Text>₡{n.amount}</Text>
        </View>
      ))}

      <View style={styles.separator} />

      <Text style={styles.total}>TOTAL ₡{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: 300,
    alignSelf: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    fontWeight: 'bold',
  },
  total: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
