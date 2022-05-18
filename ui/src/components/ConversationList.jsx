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
import {React, useState} from 'react';
import Conversation from './Conversation';
import SingleConversationModal from './Modals/SingleConversationModal'
import { format} from 'timeago.js';

function ConversationList(props) {

  const { conversations, tabValue, tabIndex, loggedInUserID } = props;

  const findLatestMessageBody = (conversation) => {
    return conversation.messages[conversation.messages.length - 1].body
  }

  const findOtherPartyName = (conversation, loggedInUserID) => {
    return loggedInUserID === conversation.receiver.id ? conversation.creator.username : conversation.receiver.username
  }

  //MODAL STATE LOGIC
  

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [modalProps, setModalProps] = useState({
    creator:{id: null, username: ""},
    receiver: {id: null, username: ""},
    item: {name: '', image: ''},
    messages: [{id: null, createdAt: null, body: ''}],
  })

  const openModal = (props) => {
    setOpen(true)
    setModalProps(props)
  }
  

  const conversationsArray = conversations.map((conversation) =>
      <Conversation
      key={conversation.id}
      id={conversation.id}
      otherPartyName={findOtherPartyName(conversation, loggedInUserID)}
      itemName={conversation.item.name}
      messageBody={findLatestMessageBody(conversation)}
      // createdAt={conversation.createdAt}
      updatedAt={format(conversation.updatedAt)}
      onClick={() => openModal(conversation)}
      />

  );

  return (
    <div 
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
    >
      {tabValue === tabIndex && (
        <TableContainer component={Paper}>
          <Table sx={{ pt: 2, minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{width: 50}}>
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell >Other Party</TableCell>
                <TableCell >Subject/Item</TableCell>
                <TableCell sx={{
                  width: 'auto', 
                  height: 'inherit'
                }}>
                  Message
                </TableCell>
                <TableCell align="right">Latest Message Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conversationsArray}
              <SingleConversationModal 
                open={open}
                handleClose={() => setOpen(false)}
                image={modalProps.item.image}
                name={modalProps.item.name}
                messages={modalProps.messages}
              /> 
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
  
}

export default ConversationList;