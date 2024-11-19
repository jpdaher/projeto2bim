import { useState } from 'react';
import { View, TextInput, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const { width } = useWindowDimensions();
  const router = useRouter();

  const isLargeScreen = width >= 800;
  const inputWidth = isLargeScreen ? '30%' : '90%';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Recuperação de Senha
      </ThemedText>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { width: inputWidth }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.resetButton, { width: inputWidth }]}
        onPress={() => {alert("Função não implementada ainda")}}
      >
        <ThemedText style={styles.buttonText}>Enviar Link de Recuperação</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondaryButton, { width: inputWidth }]}
        onPress={() => {router.replace('/')}}
      >
        <ThemedText style={styles.buttonText}>Voltar para o Login</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#1e1e1e',
    color: '#FFF',
  },
  resetButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  secondaryButton: {
    backgroundColor: 'rgb(21, 23, 24)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#FFF'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
