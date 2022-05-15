import {
  TableRow,
  TableCell,
  Checkbox
} from '@mui/material';

function Conversation(props) {
  const { id, creatorId, receiverId, itemId, createdAt, updatedAt } = props;
  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Checkbox color="primary" />
      </TableCell>
      <TableCell component="th" scope="row">
        {creatorId}
      </TableCell>
      <TableCell align="right">{itemId}</TableCell>
      <TableCell align="right">{id}</TableCell>
      <TableCell align="right">{updatedAt}</TableCell>
    </TableRow>
  );
}

export default Conversation;