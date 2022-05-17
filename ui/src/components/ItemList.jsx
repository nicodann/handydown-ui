import React from 'react';
// import { styled } from '@mui/material/styles';
import { 
  Box,
  Grid,
  Typography,
} from '@mui/material';
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
                  offered={item.offered}
                  name={item.name}
                  createdAt={item.createdAt}
                  image={item.image}
                  description={item.description}
                  location={item.user.location}
                  username={item.user.username}
                />
              ))}
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