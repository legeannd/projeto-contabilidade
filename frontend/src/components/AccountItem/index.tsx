import React from 'react';

import { Container } from './styles';
import formatValue from '../../utils/formatValue';

interface Account {
  id: string;
  description: string;
  type: string;
  nature: string;
  field: string;
  value: number;
}
interface AccountItemsProps {
  accounts: Account[];
}

const AccountItems: React.FC<AccountItemsProps> = ({ accounts }) => {
  return (
    <Container>
      {accounts.map(account => (
        <div key={account.id} className="account">
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
    </Container>
  );
};

export default AccountItems;
