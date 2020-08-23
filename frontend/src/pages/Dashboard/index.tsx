import React, { useState, useEffect, FormEvent, useCallback } from 'react';

import api from '../../services/api';

import formatValue from '../../utils/formatValue';

import {
  Container,
  SearchField,
  Body,
  Title,
  Subtitle,
  EntryForm,
  Entries,
  NoData,
  AccountsForm,
  AccountsCreated,
} from './styles';
import Select from '../../components/Select';
import AccountItems from '../../components/AccountItem';

interface Entry {
  id: string;
  data: string;
  historic: string;
  accounts: Array<Account>;
}

interface EntryCreated {
  id: string;
  data: string;
  historic: string;
}

interface AccountCreated {
  description: string;
  type: string;
  nature: string;
  field: string;
  value: number;
}

interface Account {
  id: string;
  description: string;
  type: string;
  nature: string;
  field: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newHistoric, setNewHistoric] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [noData, setNoData] = useState(false);

  const [accountsCreated, setAccountsCreated] = useState<AccountCreated[]>([]);
  const [newField, setNewField] = useState('');
  const [newType, setNewType] = useState('');
  const [newNature, setNewNature] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      const response = await api.get('/entries');
      if (response.data) {
        const entriesReceived: Entry[] = response.data;
        setEntries(entriesReceived);
      }
      setNoData(false);
    };

    loadEntries();
  }, []);

  const handleAddAccount = useCallback(() => {
    if (
      newType === '' ||
      newNature === '' ||
      newDescription === '' ||
      newValue === '' ||
      newField === ''
    ) {
      window.alert('Digite todos os campos para adicionar uma nova conta');
      return;
    }

    const account = {
      type: newType,
      nature: newNature,
      description: newDescription,
      value: Number(newValue),
      field: newField,
    };

    const newAccounts = [...accountsCreated, account];

    setAccountsCreated(newAccounts);
    setNewType('');
    setNewNature('');
    setNewField('');
    setNewValue('');
    setNewDescription('');
  }, [accountsCreated, newDescription, newField, newNature, newType, newValue]);

  async function handleAddEntry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (newDate === '' || newHistoric === '') {
      window.alert('Digite todos os campos para adicionar um novo lançamento');
      return;
    }
    if (accountsCreated.length === 0) {
      window.alert('Adicione uma conta para criar um lançamento');
      return;
    }

    const newEntry = {
      data: newDate,
      historic: newHistoric,
    };

    try {
      const response = await api.post('/entries', newEntry);
      const entryCreated: EntryCreated = response.data;
      const accountResponse = await api.post('/accounts', accountsCreated);
      const accountCreated: Account[] = accountResponse.data;
      const entryWithAccount = {
        ...entryCreated,
        accounts: accountCreated,
      };

      setEntries([...entries, entryWithAccount]);
      setAccountsCreated([]);
      setNewDate('');
      setNewHistoric('');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSearchAccountsPerEntry(): Promise<void> {
    try {
      const response = await api.get(`/entries?description=${newSearch}`);
      if (response.data.length) {
        setEntries(response.data);
        setNoData(false);
      } else {
        setNoData(true);
        setEntries([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Title>Sistema de lançamentos</Title>
      <Body>
        <SearchField>
          <input
            value={newSearch}
            type="text"
            onChange={e => setNewSearch(e.target.value)}
            placeholder="Faça uma busca por descrição"
          />
          <button onClick={handleSearchAccountsPerEntry} type="button">
            Buscar
          </button>
        </SearchField>
        {noData && <NoData>Nenhum resultado econtrado</NoData>}
        {entries.length ? (
          <Entries>
            <Subtitle>Lançamentos criados: </Subtitle>
            {entries.map(({ id, historic, data, accounts }) => (
              <div key={id} className="entry">
                <span className="historic">
                  Histórico do lançamento: <span>{historic}</span>
                </span>
                <span className="date">
                  Data: <span>{data}</span>
                </span>
                <span>Contas do lançamento:</span>
                {accounts && <AccountItems accounts={accounts} />}
              </div>
            ))}
          </Entries>
        ) : (
          <NoData>Adicione um lançamento para visualizá-lo.</NoData>
        )}

        <EntryForm onSubmit={handleAddEntry}>
          <textarea
            value={newHistoric}
            onChange={e => setNewHistoric(e.target.value)}
            placeholder="Histórico"
          />
          <div>
            <input
              value={newDate}
              type="date"
              onChange={e => setNewDate(e.target.value)}
              placeholder="Data"
            />
            <button type="submit">Criar novo lançamento</button>
          </div>
        </EntryForm>

        <Subtitle>Adicione contas para criar um lançamento:</Subtitle>

        <AccountsForm>
          <div className="text-inputs">
            <textarea
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="Descrição"
            />
            <input
              value={newValue}
              type="number"
              step="0.1"
              onChange={e => setNewValue(e.target.value)}
              placeholder="Valor"
            />
          </div>
          <div>
            <Select
              name="field"
              label="Campo"
              value={newField}
              onChange={e => {
                setNewField(e.target.value);
              }}
              options={[
                { value: 'ATIVO', label: 'Ativo' },
                { value: 'PASSIVO', label: 'Passivo' },
                { value: 'RECEITAS', label: 'Receitas' },
                { value: 'DESPESAS', label: 'Despesas' },
              ]}
            />
            <Select
              name="type"
              label="Tipo"
              value={newType}
              onChange={e => {
                setNewType(e.target.value);
              }}
              options={[
                { value: 'C', label: 'Crédito' },
                { value: 'D', label: 'Débito' },
              ]}
            />
            <Select
              name="nature"
              label="Natureza"
              value={newNature}
              onChange={e => {
                setNewNature(e.target.value);
              }}
              options={[
                { value: 'Credora', label: 'Credora' },
                { value: 'Devedora', label: 'Devedora' },
              ]}
            />
            <button onClick={handleAddAccount} type="button">
              Adicionar conta
            </button>
          </div>
        </AccountsForm>
        {accountsCreated.length ? (
          <AccountsCreated>
            <Subtitle>Contas a serem adicionadas ao lançamento atual:</Subtitle>

            {accountsCreated.map((account, index) => (
              <div key={index} className="account">
                <span className="description">
                  Descrição: <span>{account.description}</span>
                </span>
                <div>
                  <span className="field">
                    Campo: <span>{account.field}</span>
                  </span>
                  <span className="type">
                    Tipo: <span>{account.type}</span>
                  </span>
                  <span className="nature">
                    Natureza: <span>{account.nature}</span>
                  </span>
                  <span className="value">
                    Valor: <span>{formatValue(account.value)}</span>
                  </span>
                </div>
              </div>
            ))}
          </AccountsCreated>
        ) : (
          ''
        )}
      </Body>
    </Container>
  );
};

export default Dashboard;
