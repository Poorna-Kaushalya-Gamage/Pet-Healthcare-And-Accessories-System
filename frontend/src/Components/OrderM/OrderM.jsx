import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Transactions() {
  const [transactions, setTransactions] = useState([]); // State to store fetched transactions
  const navigate = useNavigate();

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transaction');
        setTransactions(response.data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty array ensures the effect runs only once when the component mounts

 

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Card ID</th>
          <th>Amount</th>
          <th>Quantity</th>
          <th>Ship Address</th>
          <th>Product ID</th>
          <th>User ID</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <OrderM
            key={transaction.cardId}
            transaction={transaction}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Transactions;
