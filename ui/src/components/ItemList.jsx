import React from 'react';
import { useState } from 'react';
import { 
  Box,
  Grid,
  Typography,
} from '@mui/material';
import Item from './Item';
import SingleItemModal from './Modals/SingleItemModal';

function ItemList(props) {
  const { tabValue, tabIndex, items, loggedInUserID, deleteItem } = props;
// console.log('tab value:', props);
  //MODAL STATE LOGIC

  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState(
    { 
      id: null,
      name: '', 
      description: '', 
      image: '', 
      offered: true,
      user: { username: '', location: ''}, 
      createdAt: ''
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
            {tabValue === 2 && items.length === 0 ? 
            <Box><Typography>You haven't posted anything yet!</Typography></Box> :
            <>
            
            { items.map((item) => ( 
              <Item
                key={item.id}
                id={item.id}
                offered={item.offered}
                name={item.name}
                createdAt={item.createdAt}
                image={item.image}
                description={item.description}
                location={item.user.location}
                username={item.user.username}
                onClick={() => openModal(item)}
              />
            ))}
            <SingleItemModal
              key={modalProps.id}
              name={modalProps.name}
              description={modalProps.description}
              image={modalProps.image}
              offered={modalProps.offered}
              createdAt={modalProps.createdAt}
              userName={modalProps.user.username}
              location={modalProps.user.location}
              creatorId={modalProps.user.id}
              itemId={modalProps.id}
              open={open}
              handleClose={() => setOpen(false)}
              loggedInUserID={loggedInUserID}
              tabIndex={tabIndex}
              deleteItem={deleteItem}

            /> 
            </>}
          </Grid>
        </Box>
      ) : (
        <Box display='flex' justifyContent='center'>
        <Typography variant="body2">No results found!</Typography>
        </Box>
      )
      )}
    </div>
  );
}

export default ItemList;