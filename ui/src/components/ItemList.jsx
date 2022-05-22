import { useState } from 'react';
import { 
  Box,
  Grid,
  Typography,
} from '@mui/material';
import Item from './Item';
import SingleItemModal from './Modals/SingleItemModal';

export default function ItemList(props) {
  const {
    items,
    loggedInUser,
    deleteItem,
    addMessage,
    setTabValue,
    tabValue,
    tabIndex
  } = props;

  //MODAL STATE LOGIC
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState(
    { 
      id: null,
      name: '', 
      description: '', 
      image: '', 
      offered: true,
      createdAt: '',
      user: { id: null, username: '', location: ''} 
    }
  )

  const openModal = (props) => {
    setModalProps(props)
    setOpen(true)
  }

  return (
    <div 
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
    >
      {tabValue === tabIndex && (
        items && items.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            { items.map((item) => ( 
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                offered={item.offered}
                image={item.image}
                createdAt={item.createdAt}
                username={item.user.username}
                location={item.user.location}
                onClick={() => openModal(item)}
              />
            ))}
            <SingleItemModal
              key={modalProps.id}
              itemId={modalProps.id} // for ReplyForm, among others
              name={modalProps.name}
              description={modalProps.description}
              image={modalProps.image}
              offered={modalProps.offered}
              createdAt={modalProps.createdAt}
              creatorId={modalProps.user.id} // for ReplyForm, among others
              location={modalProps.user.location}
              loggedInUser={loggedInUser} // for ReplyForm, among others
              open={open}
              handleClose={() => setOpen(false)}
              addMessage={addMessage} // for ReplyForm
              deleteItem={deleteItem}
              tabIndex={tabIndex}
              setTabValue={setTabValue} // for ReplyForm
            />
          </Grid>
        </Box>
      ) : (
        <Box display='flex' justifyContent='center'>
          {tabIndex === 2 ?
            <Typography variant="body2">You haven't posted anything yet!</Typography> :
            <Typography variant="body2">No results found!</Typography>
          }
        </Box>
      )
      )}
    </div>
  );
};
