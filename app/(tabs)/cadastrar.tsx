import { useState } from 'react';
import { View, TextInput, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../supabase'; // Importar o cliente Supabase

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const isLargeScreen = width >= 800;
  const inputWidth = isLargeScreen ? '30%' : '90%';

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) alert(error.message)
    if (!session) {
      await supabase
      .from('alunos')
      .insert({ email: email, nome: name.toLowerCase() })
      alert('Por favor, verifique seu email!')
    }
    setLoading(false)
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Cadastro
      </ThemedText>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        style={[styles.input, { width: inputWidth }]}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { width: inputWidth }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { width: inputWidth }]}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.signUpButton, { width: inputWidth }]}
        onPress={signUpWithEmail}
      >
        <ThemedText style={styles.buttonText}>Cadastrar</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.secondaryButton, { width: inputWidth }]}
        onPress={() => { /* Lógica de login aqui */ }}
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
  signUpButton: {
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
