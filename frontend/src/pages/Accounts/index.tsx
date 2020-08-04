import React, { useState, useEffect, FormEvent } from 'react';

import { useLocation } from 'react-router-dom';
import api from '../../services/api';

import { Container, Title, Form, AccountItem } from './styles';

interface Account {
  type: string;
  description: string;
  value: number;
  field: string;
  nature: string;
  id: number;
}

interface LocationProps extends Location {
  id: string;
}

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newField, setNewField] = useState('');
  const [entryId, setEntryId] = useState('');
  const location = useLocation<LocationProps>();

  useEffect(() => {
    const loadAccounts = async () => {
      let id = '';
      try {
        id = location.state.id;
        setEntryId(id);
      } catch (err) {
        console.error(err);
      }
      const response = await api.get(`/entries/${id}`);

      if (response.data) {
        setAccounts(response.data);
      }
    };

    loadAccounts();
  }, [location.state.id]);

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
      entry_id: location.state.id //tinha faltado colocar isso.
    };

    try {
      const response = await api.post('/accounts', [newAccount]); //problema é que vc n tava passando como array como eu ja havia mencionado.
      const account = response.data; // isso retorna um array de objetos, necessário fazer um map pra adicionar

      account.map((ac: Account) => {
        setAccounts([...accounts, ac]);
      }); //feito o map pra adicionar as contas no array local


      setNewDescription('');
      setNewField('');
      setNewType('');
      setNewValue('');

      console.log(accounts);
    } catch (err) {
      console.error(err);
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
        {accounts.map((account,i) => (
          <div key={i}>
            <strong>{account.field}</strong>
            <p>{account.description}</p>
          </div>
        ))}
      </AccountItem>
    </Container>
  );
};

export default Accounts;
