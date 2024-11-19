import { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, useWindowDimensions, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        alert("ERRO: Usuário não cadastrado. Por favor, verifique as credenciais ou cadastre-se.");
      } else {
        alert(error.message);
      }
    } else {
      alert("Login realizado com sucesso!");
      // Redirecionamento para outra tela, se necessário
      router.replace('./grupos');
    }
    setLoading(false);
  }

  const isLargeScreen = width >= 800;
  const inputWidth = isLargeScreen ? '30%' : '90%';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.welcomeText}>
        Bem-vindo ao InovaWeek!
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
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { width: inputWidth }]}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.loginButton, { width: inputWidth }]}
        onPress={signInWithEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        )}
      </TouchableOpacity>
      <View style={[styles.buttonContainer, { width: inputWidth }]}>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/recuperar')}>
          <ThemedText style={styles.buttonText}>Esqueci a senha</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => alert("A função de cadastro ainda não foi implementada.")}>
          <ThemedText style={styles.buttonText}>Cadastrar</ThemedText>
        </TouchableOpacity>
      </View>
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
  welcomeText: {
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
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  secondaryButton: {
    backgroundColor: 'rgb(21, 23, 24)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
