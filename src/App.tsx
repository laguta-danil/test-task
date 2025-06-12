import React, { useState } from 'react';
import TransactionsList from './components/TransactionsList';
import TransactionDetail from './components/TransactionDetail';
import { Transaction } from './types';
import './styles/App.css';

const App: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackToList = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="App">
      {selectedTransaction ? (
        <TransactionDetail
          transaction={selectedTransaction}
          onBack={handleBackToList}
        />
      ) : (
        <TransactionsList onTransactionClick={handleTransactionClick} />
      )}
    </div>
  );
};

export default App;
