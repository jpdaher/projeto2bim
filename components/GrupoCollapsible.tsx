import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Collapsible } from '@/components/Collapsible';

interface GroupCardProps {
  groupName: string;
  members: string[];
  theme: string;
  description: string;
}

export default function GroupCard({ groupName, members, theme, description }: GroupCardProps) {

  return (
    <View style={styles.card}>
        <Collapsible title={ groupName }>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Integrantes:</Text>
                {members.slice(0, 4).map((member, index) => (
                    <Text key={index} style={styles.member}>
                        - {member}
                    </Text>
                ))}
                <Text style={styles.sectionTitle}>Tema:</Text>
                <Text style={styles.text}>{theme}</Text>
                <Text style={styles.sectionTitle}>Descrição:</Text>
                <Text style={styles.text}>{description}</Text>
            </View>
        </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    margin: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 8,
    marginBottom: 8,
  },
  groupName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  member: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
