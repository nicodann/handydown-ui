import React from 'react';
import { useState } from 'react';
// import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
// import { Box, Grid, Paper } from '@mui/material';
import Item from './Item';
import SingleItemModal from './Modals/SingleItemModal';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

function ItemList(props) {
  const { tabValue, tabIndex, items } = props;

  const userId = 1; // *** HARD CODED FOR NOW ***
  let filteredItemsArray;

  if (tabValue === 0) {
    filteredItemsArray = items.filter((item) => item.offered === true );
  } else if (tabValue === 1) {
    filteredItemsArray = items.filter((item) => item.offered === false );
  } else if (tabValue === 2) {
    filteredItemsArray = items.filter((item) => item.userId === userId);
  } else {
    filteredItemsArray = items;
  }

  //MODAL STATE LOGIC

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    handleOpen()
    setModalProps(props)
  }

  const itemListArray = filteredItemsArray.map((item) => 
    (
      <React.Fragment key={item.id}>
        <Grid item style={{display: 'flex'}} xs={4} >
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            offered={item.offered}
            createdAt={item.createdAt}
            userName={item.user.username}
            location={item.user.location}
            onClick={() => openModal(item)}
          />
        </Grid>
      </React.Fragment>
    )
  );

  return (
    <div 
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
    >
      {tabValue === tabIndex && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6}>
            {itemListArray}
            <SingleItemModal
              key={modalProps.id}
              open={open}
              handleClose={handleClose}
              name={modalProps.name}
              description={modalProps.description}
              image={modalProps.image}
              offered={modalProps.offered}
              createdAt={modalProps.createdAt}
              userName={modalProps.user.username}
              location={modalProps.user.location}
            />
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default ItemList;