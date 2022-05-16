import {
  TableRow,
  TableCell,
  Checkbox
} from '@mui/material';

function Conversation(props) {
  const {
     id, 
     otherPartyName,
     itemName,
     messageBody,
     updatedAt
   } = props;
  return (
    
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Checkbox color="primary" />
      </TableCell>
      <TableCell component="th" scope="row">
        {otherPartyName}
      </TableCell>
      <TableCell align="right">{itemName}</TableCell>
      <TableCell align="right">{messageBody}</TableCell>
      <TableCell align="right">{updatedAt}</TableCell>
    </TableRow>
  );
}

export default Conversation;