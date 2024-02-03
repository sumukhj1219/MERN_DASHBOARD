import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



export default function TransactionTable({transactions, setEditTransaction}) {
  async function handleDelete(_id)
  {
	if(!window.confirm('Are you sure')) return;
	const res = await fetch(`http://localhost:4000/transaction/${_id}`,{
		method:'DELETE'
	})
	if(res.ok)
	{       
	    window.alert('Deleted succesfully')
	}
  }

  return (
	<Container fixed>
		<Typography variant='h5' sx={{ marginTop: 10, fontWeight: 'bold'}}>
		List Of Transactions#
		</Typography>
	<TableContainer component={Paper} sx={{ backgroundColor: 'white'}} >
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{fontWeight: 'bold'}}>Amount#</TableCell>
            <TableCell align="center"sx={{fontWeight: 'bold'}}>Details#</TableCell>
            <TableCell align="center"sx={{fontWeight: 'bold'}}>Date#</TableCell>
			<TableCell align="center"sx={{fontWeight: 'bold'}}>Actions#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row.title}
            >
              <TableCell align="center">{`₹${row.amount}`}</TableCell>
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">
				<IconButton color='success' onClick={()=>setEditTransaction(row)}>
				<CreateIcon/>
				</IconButton>
				<IconButton color='error' onClick={()=>handleDelete(row._id)}>
				<DeleteIcon/>
				</IconButton>
				
			  </TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Container>
 
  );
}