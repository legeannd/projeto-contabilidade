import React, { useState, useEffect, FormEvent } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Title, Form, EntryItem } from './styles';

interface Entry {
  id: string;
  data: string;
  historic: string;
}

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newHistoric, setNewHistoric] = useState('');

  const history = useHistory();

  useEffect(() => {
    const loadEntries = async () => {
      const response = await api.get('/entries');

      if (response.data) {
        setEntries(response.data);
      }
    };

    loadEntries();
  }, []);

  async function handleAddEntry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (newDate === '' && newHistoric === '') {
      return;
    }

    const newEntry = {
      data: newDate,
      historic: newHistoric,
    };

    try {
      const response = await api.post('/entries', newEntry);

      const entry = response.data;

      setEntries([...entries, entry]);

      setNewDate('');
      setNewHistoric('');
    } catch (err) {
      console.error(err);
    }
  }

  async function goToEntryAccounts(id: string) {
    history.push(`/accounts/${id}`);
  }

  return (
    <Container>
      <Title>Crie um novo lançamento</Title>
      <Form onSubmit={handleAddEntry}>
        <input
          value={newDate}
          type="date"
          onChange={e => setNewDate(e.target.value)}
          placeholder="Data"
        />
        <textarea
          value={newHistoric}
          onChange={e => setNewHistoric(e.target.value)}
          placeholder="Histórico"
        />
        <button type="submit">Criar novo lançamento</button>
      </Form>

      <EntryItem>
        {entries.map(entry => (
          <button
            key={entry.id}
            type="button"
            onClick={() => goToEntryAccounts(entry.id)}
          >
            <strong>{entry.data}</strong>
            <p>{entry.historic}</p>
          </button>
        ))}
      </EntryItem>
    </Container>
  );
};

export default Dashboard;
