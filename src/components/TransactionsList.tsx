import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faAmazon } from '@fortawesome/free-brands-svg-icons';
import {
  faStore,
  faCreditCard,
  faUtensils,
  faGasPump,
  faMapMarkerAlt,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Transaction, CardBalance } from '../types';
import { formatTransactionDate } from '../utils/dateHelpers';
import { formatPoints } from '../utils/pointsCalculator';
import transactionsData from '../data/transactions.json';
import '../styles/TransactionsList.css';

interface TransactionsListProps {
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  onTransactionClick,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [cardBalance, setCardBalance] = useState<CardBalance>({
    limit: 1500,
    balance: 0,
    available: 0,
  });
  const [dailyPoints, setDailyPoints] = useState<number>(0);

  useEffect(() => {
    const data = transactionsData;
    setTransactions(data.transactions as Transaction[]);

    const balance = data.cardBalance.balance;
    const available = data.cardBalance.limit - balance;
    setCardBalance({
      limit: data.cardBalance.limit,
      balance: balance,
      available: available,
    });

    setDailyPoints(456000);
  }, []);

  const formatAmount = (amount: number, type: string) => {
    const sign = type === 'Payment' ? '+' : '';
    return `${sign}$${amount.toFixed(2)}`;
  };

  const getIconForBrand = (title: string) => {
    switch (title.toLowerCase()) {
      case 'apple':
        return faApple;
      case 'amazon':
        return faAmazon;
      case 'ikea':
        return faStore;
      case 'target':
        return faMapMarkerAlt;
      case 'payment':
        return faCreditCard;
      case 'starbucks':
        return faUtensils;
      case 'shell gas station':
        return faGasPump;
      default:
        return faStore;
    }
  };

  return (
    <div className="app">
      <div className="cards-container">
        <div className="cards-grid">
          <div className="card-no-debt">
            <div className="no-debt-title">No Payment Due</div>
            <div className="no-debt-subtitle">
              You've paid your
              <br />
              September balance.
            </div>
            <span className="checkmark">✓</span>
          </div>

          <div className="card-balance">
            <div className="balance-title">Card Balance</div>
            <div className="balance-amount">
              ${cardBalance.balance.toFixed(2)}
            </div>
            <div className="available-amount">
              ${cardBalance.available.toFixed(2)} Available
            </div>
          </div>

          <div className="card-points">
            <div className="points-label">Daily Points</div>
            <div className="points-value">{formatPoints(dailyPoints)}</div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="transactions-section">
        <h2 className="transactions-title">Latest Transactions</h2>
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="transaction-item"
            onClick={() => onTransactionClick(transaction)}
          >
            <div
              className="transaction-icon"
              style={{ backgroundColor: transaction.iconColor }}
            >
              <FontAwesomeIcon icon={getIconForBrand(transaction.title)} />
            </div>
            <div className="transaction-details">
              <div className="transaction-header">
                <span className="transaction-title">{transaction.title}</span>
                <div className="transaction-right">
                  <span
                    className={`transaction-amount ${transaction.type.toLowerCase()}`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </span>
                  <div className="transaction-arrow">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </div>
              </div>
              <div className="transaction-meta">
                <div className="transaction-meta-row">
                  <span>
                    {transaction.isPending && 'Pending - '}
                    {transaction.description}
                  </span>
                  {transaction.percentage && (
                    <span className="transaction-percentage">
                      {transaction.percentage}
                    </span>
                  )}
                </div>
                <div className="transaction-meta-row">
                  {transaction.authorizedUser && (
                    <span className="transaction-authorized">
                      {transaction.authorizedUser} -{' '}
                      {formatTransactionDate(transaction.date)}
                    </span>
                  )}
                  {!transaction.authorizedUser && (
                    <span>{formatTransactionDate(transaction.date)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
