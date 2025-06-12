import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faAmazon } from '@fortawesome/free-brands-svg-icons';
import {
  faStore,
  faCreditCard,
  faUtensils,
  faGasPump,
  faMapMarkerAlt,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Transaction } from '../types';
import '../styles/TransactionDetail.css';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transaction,
  onBack,
}) => {
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
    return `${dateStr}, ${timeStr}`;
  };

  return (
    <div className="app detail-app">
      <button className="back-button-edge" onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="detail-page">
        <div className="detail-main-content">
          <div className="detail-amount-section">
            <div className="detail-amount-large">
              ${transaction.amount.toFixed(2)}
            </div>
            <div className="detail-merchant-name">{transaction.title}</div>
            <div className="detail-date-time">
              {formatFullDate(transaction.date)}
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-row-status">
              <span className="detail-status-text">
                Status: {transaction.isPending ? 'Processing' : 'Approved'}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-row-label">RBC Bank Debit Card</span>
            </div>

            <div className="detail-row detail-total">
              <span className="detail-row-value">Total</span>
              <span className="detail-row-value">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-home-indicator"></div>
      </div>
    </div>
  );
};

export default TransactionDetail;
