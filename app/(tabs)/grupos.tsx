import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import GroupCard from '../../components/GrupoCollapsible';

// Defina os tipos para as tabelas
interface Grupo {
  id_grupo: number;
  nome: string;
  descricao: string;
  tema: string;
}

interface Aluno {
  id_grupo: number;
  nome: string;
}

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState<Grupo[]>([]);
  const [students, setStudents] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGroupsAndStudents() {
      setLoading(true);

      // Fetch grupos
      const { data: groupData, error: groupError } = await supabase
        .from('grupos')
        .select('id_grupo, nome, descricao, tema');

      // Fetch alunos
      const { data: studentData, error: studentError } = await supabase
        .from('alunos')
        .select('id_grupo, nome');

      if (groupError || studentError) {
        console.error('Erro ao buscar dados:', groupError || studentError);
        Alert.alert('Erro', 'Não foi possível carregar os dados dos grupos e alunos.');
      } else {
        setGroups(groupData || []);
        setStudents(studentData || []);
      }

      setLoading(false);
    }

    fetchGroupsAndStudents();
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('ERRO: Não foi possível encerrar a sessão.');
    } else {
      router.replace('/'); // Redireciona para a página de login
    }
  }

  function renderGroupCards() {
    if (loading) {
      return <Text style={styles.loadingText}>Carregando...</Text>;
    }

    if (groups.length === 0) {
      return <Text style={styles.loadingText}>Nenhum grupo encontrado.</Text>;
    }

    return groups.map((group) => {
      // Filtra os alunos que pertencem a este grupo
      const groupMembers = students
        .filter((student) => student.id_grupo === group.id_grupo)
        .map((student) => student.nome);

      return (
        <GroupCard
          key={group.id_grupo}
          groupName={group.nome}
          members={groupMembers}
          theme={group.tema}
          description={group.descricao}
        />
      );
    });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Grupos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Group Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {renderGroupCards()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardsContainer: {
    padding: 16,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
