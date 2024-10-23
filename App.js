import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Decimal from 'decimal.js'; // Import Decimal.js

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('meters');
  const [outputUnit, setOutputUnit] = useState('kilometers');
  const [result, setResult] = useState(null);
  const [isInputUnitModalVisible, setInputUnitModalVisible] = useState(false);
  const [isOutputUnitModalVisible, setOutputUnitModalVisible] = useState(false);

  const units = {
    meters: 'meters',
    kilometers: 'kilometers',
    centimeters: 'centimeters',
    millimeters: 'millimeters',
    feet: 'feet',
    miles: 'miles',
  };

  const convert = () => {
    if (!inputValue || isNaN(inputValue)) {
      alert('Please enter a valid number');
      return;
    }

    let valueInMeters;

    // Chuyển đổi đầu vào sang mét
    switch (inputUnit) {
      case 'meters':
        valueInMeters = parseFloat(inputValue); // Sử dụng parseFloat để chuyển đổi đầu vào sang float
        break;
      case 'kilometers':
        valueInMeters = parseFloat(inputValue) * 1000;
        break;
      case 'centimeters':
        valueInMeters = parseFloat(inputValue) / 100;
        break;
      case 'millimeters':
        valueInMeters = parseFloat(inputValue) / 1000;
        break;
      case 'feet':
        valueInMeters = parseFloat(inputValue) / 3.28084;
        break;
      case 'miles':
        valueInMeters = parseFloat(inputValue) / 0.000621371;
        break;
      default:
        alert('Unsupported unit');
        return;
    }

    let convertedValue;

    // Chuyển đổi từ mét sang đầu ra
    switch (outputUnit) {
      case 'meters':
        convertedValue = valueInMeters;
        break;
      case 'kilometers':
        convertedValue = valueInMeters / 1000;
        break;
      case 'centimeters':
        convertedValue = valueInMeters * 100;
        break;
      case 'millimeters':
        convertedValue = valueInMeters * 1000;
        break;
      case 'feet':
        convertedValue = valueInMeters * 3.28084;
        break;
      case 'miles':
        convertedValue = valueInMeters * 0.000621371;
        break;
      default:
        alert('Unsupported unit');
        return;
    }

    // Định dạng kết quả
    setResult(convertedValue.toFixed(3)); // Sử dụng 3 chữ số thập phân
  };

  const UnitModal = ({ visible, onClose, onSelect }) => (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={Object.keys(units)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { onSelect(item); onClose(); }}>
                <Text style={styles.unitItem}>{units[item]}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Length Converter</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={() => setInputUnitModalVisible(true)} style={styles.unitButton}>
          <Text style={styles.unitButtonText}>{inputUnit}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>to</Text>
        <TouchableOpacity onPress={() => setOutputUnitModalVisible(true)} style={styles.unitButton}>
          <Text style={styles.unitButtonText}>{outputUnit}</Text>
        </TouchableOpacity>
        <Button title="Convert" onPress={convert} />
        {result !== null && (
          <Text style={styles.result}>
            Result: {result} {outputUnit}
          </Text>
        )}
        <UnitModal
          visible={isInputUnitModalVisible}
          onClose={() => setInputUnitModalVisible(false)}
          onSelect={setInputUnit}
        />
        <UnitModal
          visible={isOutputUnitModalVisible}
          onClose={() => setOutputUnitModalVisible(false)}
          onSelect={setOutputUnit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  unitButton: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    borderRadius: 5,
  },
  unitButtonText: {
    fontSize: 18,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  unitItem: {
    padding: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
