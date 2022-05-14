import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox 
} from '@mui/material';
import React from 'react';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function MessageList(props) {

  const { conversations, tabValue, tabIndex } = props;

  const conversationsArray = conversations.map((conversation) => 
      <TableRow
        key={conversation.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>
          <Checkbox color="primary" />
        </TableCell>
        <TableCell component="th" scope="row">
          {conversation.creatorId}
        </TableCell>
        <TableCell align="right">{conversation.itemId}</TableCell>
        <TableCell align="right">{conversation.id}</TableCell>
        <TableCell align="right">{conversation.updatedAt}</TableCell>
      </TableRow>
  );
  return (
    <div 
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
    >
      {tabValue === tabIndex && (
        <TableContainer component={Paper}>
          <Table sx={{ pt: 2, minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
            <TableCell>
              <Checkbox
                color="primary"
              />
            </TableCell>
                <TableCell>From</TableCell>
                <TableCell align="right">Subject/Item</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Four days ago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default MessageList;