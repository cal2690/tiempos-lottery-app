import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { TicketNumber } from '../models/TicketNumber';

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

export default function RegisterNumbersScreen() {
  const [numberInput, setNumberInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [numbers, setNumbers] = useState<TicketNumber[]>([]);

  const formatNumber = (value: string) => {
    if (value.length === 1) return `0${value}`;
    return value;
  };

  const addNumber = () => {
    const formattedNumber = formatNumber(numberInput);
    const amount = parseInt(amountInput);

    if (
      formattedNumber.length !== 2 ||
      isNaN(amount) ||
      amount < 100
    ) {
      return;
    }

    setNumbers(prev => {
      const existing = prev.find(n => n.number === formattedNumber);

      if (existing) {
        return prev.map(n =>
          n.number === formattedNumber
            ? { ...n, amount: n.amount + amount }
            : n
        );
      }

      return [...prev, { number: formattedNumber, amount }];
    });

    setNumberInput('');
    setAmountInput('');
  };

  const updateAmount = (number: string, delta: number) => {
    setNumbers(prev =>
      prev.map(n =>
        n.number === number
          ? { ...n, amount: Math.max(100, n.amount + delta) }
          : n
      )
    );
  };

  const removeNumber = (number: string) => {
    setNumbers(prev => prev.filter(n => n.number !== number));
  };

  const total = numbers.reduce((sum, n) => sum + n.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Apuestas</Text>

      {/* INPUTS */}
      <TextInput
        style={styles.input}
        placeholder="Número (00-99)"
        keyboardType="numeric"
        maxLength={2}
        value={numberInput}
        onChangeText={setNumberInput}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amountInput}
        onChangeText={setAmountInput}
      />

      {/* QUICK AMOUNTS */}
      <View style={styles.quickContainer}>
        {QUICK_AMOUNTS.map(value => (
          <TouchableOpacity
            key={value}
            style={styles.quickButton}
            onPress={() => setAmountInput(value.toString())}
          >
            <Text>₡{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addNumber}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>

      {/* LISTA */}
      <FlatList
        data={numbers}
        keyExtractor={item => item.number}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.numberText}>{item.number}</Text>
            <Text>₡{item.amount}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => updateAmount(item.number, 100)}>
                <Text style={styles.action}>+100</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => updateAmount(item.number, -100)}>
                <Text style={styles.action}>-100</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeNumber(item.number)}>
                <Text style={[styles.action, { color: 'red' }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>TOTAL: ₡{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  quickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  quickButton: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  action: {
    fontSize: 14,
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
