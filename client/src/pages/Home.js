import React from 'react'
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Cookies from 'js-cookie';
function Home() {
  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState({})
 
  async function fetchTransactions()
  {
	const token = Cookies.get('token')
	const res = await fetch('http://localhost:4000/transaction',{
		method:'GET',
		headers:{
			Authorization: `Bearer${token}`
		}
	})
	const {data} = await res.json()
	setTransactions(data);
  }

  useEffect(()=>{
     fetchTransactions();
  }, [])


  return (
	<Container>
	<TransactionForm fetchTransactions={fetchTransactions} editTransaction={editTransaction}/>
    <TransactionTable transactions={transactions} setEditTransaction={setEditTransaction}/>
	</Container>
  )
}

export default Home
