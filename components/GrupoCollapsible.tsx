import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define o tipo das props do componente GroupCard
interface GroupCardProps {
  groupName: string;
  members: string[];
  theme: string;
  description: string;
  notaMedia: string;
}

export default function GroupCard({
  groupName,
  members,
  theme,
  description,
  notaMedia,
}: GroupCardProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.card}>
      {/* Header do card */}
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <Text style={styles.groupName}>{groupName}</Text>
      </TouchableOpacity>

      {/* Detalhes do card, exibidos apenas quando expandido */}
      {!collapsed && (
        <View style={styles.details}>
          <Text style={styles.text}><strong>Tema: </strong>{theme}</Text>
          <Text style={styles.text}><strong>Descrição: </strong>{description}</Text>
          <Text style={styles.text}><strong>Integrantes: </strong></Text>

          {/* Renderização da lista de integrantes */}
          {members.length > 0 ? (
            members.map((member, index) => (
              <Text key={index} style={styles.member}>
                - {member}
              </Text>
            ))
          ) : (
            <Text style={styles.member}>Nenhum integrante encontrado.</Text>
          )}

          {/* Nota média exibida na expansão */}
          <Text style={styles.notaMedia}>Nota média: {notaMedia}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  groupName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notaMedia: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold'
  },
  details: {
    marginTop: 16,
  },
  text: {
    color: '#fff',
    marginBottom: 4,
  },
  member: {
    color: '#fff',
    marginLeft: 8,
  },
});
