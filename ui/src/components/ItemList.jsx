import React from 'react';
// import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
// import { Box, Grid, Paper } from '@mui/material';
import Item from './Item';

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

  const itemListArray = filteredItemsArray.map((item) => 
    (
      <React.Fragment key={item.id}>
        <Grid item xs={4}>
          <Item
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            offered={item.offered}
            createdAt={item.createdAt}
            userName={item.user.username}
            location={item.user.location}
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
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default ItemList;