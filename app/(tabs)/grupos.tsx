import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabase';
import GroupCard from '../../components/GrupoCollapsible';

// Defina os tipos para as tabelas
interface Avaliacao {
  estrelas: string;
}

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
  const [groupRatings, setGroupRatings] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        // Busca os grupos
        const { data: groupData, error: groupError } = await supabase
          .from('grupos')
          .select('id_grupo, nome, descricao, tema');

        if (groupError) throw groupError;

        // Busca os alunos
        const { data: studentData, error: studentError } = await supabase
          .from('alunos')
          .select('id_grupo, nome');

        if (studentError) throw studentError;

        // Busca as avaliações
        const { data: ratingData, error: ratingError } = await supabase
          .from('avaliacoes')
          .select('id_grupo, estrelas');

        if (ratingError) throw ratingError;

        // Calcula a média das notas por grupo
        const ratingsByGroup = ratingData?.reduce((acc, curr) => {
          const { id_grupo, estrelas } = curr;
          const rating = parseFloat(estrelas);
          if (!acc[id_grupo]) acc[id_grupo] = [];
          acc[id_grupo].push(rating);
          return acc;
        }, {} as { [key: number]: number[] });

        const ratingsAverage = Object.entries(ratingsByGroup || {}).reduce(
          (acc, [groupId, ratings]) => {
            const average =
              ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            acc[parseInt(groupId, 10)] = average.toFixed(2);
            return acc;
          },
          {} as { [key: number]: string }
        );

        setGroups(groupData || []);
        setStudents(studentData || []);
        setGroupRatings(ratingsAverage);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados dos grupos e alunos.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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

      // Obtém a média das avaliações para este grupo
      const notaMedia = groupRatings[group.id_grupo] || 'N/A';

      return (
        <GroupCard
          key={group.id_grupo}
          groupName={group.nome}
          members={groupMembers}
          theme={group.tema}
          description={group.descricao}
          notaMedia={notaMedia}
        />
      );
    });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Grupos do InovaWeek</Text>
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
