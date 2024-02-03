import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const initialForm={
	amount: 0,
	desc: '',
	date: new Date()
  }
function TransactionForm({fetchTransactions ,editTransaction}) {
	
	  const [form, setForm] = useState(initialForm)
	  
	  useEffect(()=>{
		if(editTransaction.amount!==undefined)
		console.log(editTransaction)
		setForm(editTransaction)
	  }, [editTransaction])
	

	function handleInput(e)
	{
	  setForm({...form, [e.target.name]: e.target.value})
	}
    
	function handleDate(newDate)
	{
		setForm({...form, date:newDate})
	}

	async function handleSubmit(e)
	{
	 e.preventDefault();
	 const res = editTransaction.amount===undefined?create():update()

	 if(res.ok)
	 {
		setForm(initialForm);
		fetchTransactions()
	 }
	}

	async function create(e)
	{
	  const res = await fetch('http://localhost:4000/transaction',{
		  method:'POST',
		  body:JSON.stringify(form),
		  headers: {
			  "content-type":"application/json",
		  },
	  })
	  return res;
	}

	async function update(e)
	{
	  const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,{
		  method:'PATCH',
		  body:JSON.stringify(form),
		  headers: {
			  "content-type":"application/json",
		  },
	  })
	  return res;
	}
  return (
	<Container fixed>
         <Card sx={{ minWidth: 275 , marginTop: 10, backgroundColor: 'white', opacity: 0.8}}>
      <CardContent >
	  <Typography variant='h5' sx={{fontWeight: 'bold'}}>Add New Transaction#</Typography>
      <form className='TransactionForm' onSubmit={handleSubmit}>
	  <TextField 
	  id="outlined-basic" 
	  label="Amount" 
	  className='child'
	  variant="outlined"
	  type='Number'  
	  name='amount' 
	  value={form.amount} 
	  onChange={handleInput}
	  />

	  <TextField 
	  id="outlined-basic" 
	  className='child'
	  label="Details" 
	  variant="outlined" 
	  name='desc' 
	  value={form.desc} 
	  onChange={handleInput}
	  />

     <div className='child'>
	 <LocalizationProvider dateAdapter={AdapterDayjs}  >
     <DemoContainer components={['DatePicker']}   >
     <DatePicker label="Basic date picker" onChange={handleDate} />
     </DemoContainer>
     </LocalizationProvider>
	 </div>
	 {
     editTransaction.amount!==undefined &&
	 (<Button variant="secondary" type='submit'>Update</Button>)
	 }
	 {
     editTransaction.amount===undefined &&
	 (<Button variant="contained" type='submit'>Submit</Button>)
	 }
	 
	  </form>
	  
      </CardContent>

    </Card>
	</Container>
    
  );
}

export default TransactionForm