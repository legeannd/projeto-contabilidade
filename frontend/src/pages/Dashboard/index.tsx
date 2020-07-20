import React, { useState, useEffect, FormEvent } from 'react';

import api from '../../services/api';

import { Container, Title, Form, Accounts } from './styles';

interface Account {
  description: string;
  field: string;
  id: number;
}

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newField, setNewField] = useState('');

  useEffect(() => {
    const loadAccounts = async () => {
      const response = await api.get('/accounts');

      if (response.data) {
        setAccounts(response.data);
      }
    };

    loadAccounts();
  }, []);

  async function handleAddAccount(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (newDescription === '' && newField === '') {
      return;
    }

    const newAccount = {
      description: newDescription,
      field: newField,
    };

    try {
      const response = await api.post('/accounts', newAccount);

      console.log(response);

      const account = response.data;

      setAccounts([...accounts, account]);

      setNewDescription('');
      setNewField('');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Title>Cadastre uma nova conta</Title>
      <Form onSubmit={handleAddAccount}>
        <input
          value={newField}
          onChange={e => setNewField(e.target.value)}
          placeholder="Campo"
        />
        <textarea
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Descrição"
        />
        <button type="submit">Cadastrar</button>
      </Form>

      <Accounts>
        {accounts.map(account => (
          <div key={account.id}>
            <strong>{account.field}</strong>
            <p>{account.description}</p>
          </div>
        ))}
      </Accounts>
    </Container>
  );
};

export default Dashboard;
