import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import { Container, Title, Form, AccountItem } from './styles';

interface Account {
  id: number;
  type: string;
  description: string;
  value: number;
  field: string;
  nature: string;
}

interface Entry {
  id: number;
  data: string;
  historic: string;
  accounts: Account[];
}

interface LocationProps extends Location {
  id: string;
}

const Accounts: React.FC = () => {
  const [entry, setEntry] = useState<Entry>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newField, setNewField] = useState('');

  const { id } = useParams();
  useEffect(() => {
    const loadEntry = async () => {
      try {
        const response = await api.get(`/entries/${id}`);

        if (response.data) {
          setEntry(response.data);
          setAccounts(response.data.accounts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadEntry();
  }, [id]);

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
      type: newType,
      value: Number(newValue),
      entry_id: id,
    };

    try {
      const response = await api.post('/accounts', newAccount);
      const account = response.data;

      setAccounts([...accounts, account]);

      setNewDescription('');
      setNewField('');
      setNewType('');
      setNewValue('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Title>
        {entry?.data} - {entry?.historic}
      </Title>
      <Form onSubmit={handleAddAccount}>
        <input
          value={newField}
          onChange={e => setNewField(e.target.value)}
          placeholder="Campo"
        />
        <input
          value={newType}
          onChange={e => setNewType(e.target.value)}
          placeholder="Tipo"
        />
        <input
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          placeholder="Valor"
        />
        <textarea
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Descrição"
        />

        <button type="submit">Cadastrar</button>
      </Form>

      <AccountItem>
        {accounts.map(account => (
          <div key={account.id}>
            <strong>{account.field}</strong>
            <p>{account.description}</p>
            <p>Natureza {account.nature}</p>
            <p>Valor: {account.value}</p>
          </div>
        ))}
      </AccountItem>
    </Container>
  );
};

export default Accounts;
