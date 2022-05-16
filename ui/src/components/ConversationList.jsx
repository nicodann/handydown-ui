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
import Conversation from './Conversation';
import { format} from 'timeago.js';

function ConversationList(props) {

  const { conversations, tabValue, tabIndex, loggedInUserID } = props;

  const conversationsArray = conversations.map((conversation) =>
      <Conversation
        key={conversation.id}
        id={conversation.id}
        otherPartyName={
          loggedInUserID === conversation.receiver.id ? 
          conversation.creator.username : conversation.receiver.username
        }
        itemName={conversation.item.name}
        messageBody={conversation.messages[0].body}
        // createdAt={conversation.createdAt}
        updatedAt={format(conversation.updatedAt)}
      />

  );
  console.log("conversation rows:" , conversationsArray)
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
                <TableCell>Other Party</TableCell>
                <TableCell align="right">Subject/Item</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Latest Message Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conversationsArray}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
  
}

export default ConversationList;