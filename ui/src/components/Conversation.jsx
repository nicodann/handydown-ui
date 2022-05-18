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
     updatedAt,
     onClick
   } = props;

  return (
    
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      onClick={onClick}
    >
      <TableCell>
        <Checkbox color="primary" />
      </TableCell>
      <TableCell component="th" scope="row" >
        {otherPartyName}
      </TableCell>
      <TableCell>{itemName}</TableCell>
      <TableCell sx={{
        // display: 'table-cell',
        width: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
       
          {messageBody}
             
      </TableCell>
      <TableCell align="right">{updatedAt}</TableCell>
    </TableRow>
  );
}

export default Conversation;