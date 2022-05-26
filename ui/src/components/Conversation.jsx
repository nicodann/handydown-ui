import {
  TableRow,
  TableCell,
  Checkbox
} from '@mui/material';
import { useState } from 'react';

export default function Conversation(props) {
  const {
     id, 
     otherPartyName,
     itemName,
     messageBody,
     updatedAt,
     onClick,
     read
    } = props;

  const [isRead, setIsRead] = useState(read)
    
  // const style = {
  //   background: isRead ? "lightgrey" : "white"
  // }

  const rowStyle = isRead ? {
    background: "#F2F5F5CC"
  } : {
    background: 'white',
    // fontWeight: 'bold',
    
  };

  const cellStyle = isRead ? {

  } : {
    fontWeight: 'bold'
  }
  

  const handleClick = () => {
    onClick();
    setIsRead(true);
  }

  return (
    
    <TableRow
      key={id}
      // sx={{background: ConvBackCol, '&:last-child td, &:last-child th': { border: 0 } }}
      sx={{...rowStyle,'&:last-child td, &:last-child th': { border: 0 } }}
      onClick={handleClick}
    >
      <TableCell sx={{width: 70}}>
        <Checkbox color="primary" />
      </TableCell>
      <TableCell component="th" scope="row" sx={{...cellStyle}}>
        {otherPartyName}
      </TableCell>
      <TableCell sx={{...cellStyle}}>{itemName}</TableCell>
      <TableCell sx={{
        ...cellStyle,
        width: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
       
          {messageBody}
             
      </TableCell>
      <TableCell align="right" sx={{...cellStyle}}>{updatedAt}</TableCell>
    </TableRow>
  );
};
