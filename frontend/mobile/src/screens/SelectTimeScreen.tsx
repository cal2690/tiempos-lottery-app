import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getAvailableSchedules } from '../utils/getAvailableSchedules';
import { CountryCode } from '../constants/schedules';
import { createActiveRaffle } from '../utils/createActiveRaffle';


export default function SelectTimeScreen() {
  const [country, setCountry] = useState<CountryCode>('CR');

  const schedules = getAvailableSchedules(country);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar País</Text>

      <View style={styles.countryContainer}>
        <TouchableOpacity
          style={[
            styles.countryButton,
            country === 'CR' && styles.selected,
          ]}
          onPress={() => setCountry('CR')}
        >
          <Text>Costa Rica</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.countryButton,
            country === 'NI' && styles.selected,
          ]}
          onPress={() => setCountry('NI')}
        >
          <Text>Nicaragua</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Tiempos disponibles hoy</Text>

      {schedules.map(schedule => (
        <TouchableOpacity
          key={schedule.hour}
          style={styles.timeButton}
          onPress={() => {
            const raffle = createActiveRaffle(
              country,
              schedule.hour,
              schedule.label
            );
            console.log('Active raffle:', raffle);
          }}
        >
          <Text>{schedule.label}</Text>
        </TouchableOpacity>
      ))}


      {schedules.length === 0 && (
        <Text style={styles.noTimes}>
          No hay tiempos disponibles para hoy
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  countryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  countryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#ddd',
  },
  subtitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  timeButton: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  noTimes: {
    marginTop: 20,
    color: 'red',
  },
});
