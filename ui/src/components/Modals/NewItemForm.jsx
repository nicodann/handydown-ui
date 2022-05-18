    import {
      Box,
      Typography,
      Grid,
      Switch,
      TextField,
      Button
    } from '@mui/material';

    function NewItemForm(props) {
      return (
        <Box
          component="form"
          style={{display: "flex", flexDirection: "column"}} 
          sx={{ px: 2}}
        >
          <Typography variant="h4">Post a New Item</Typography>
          <Grid component="label" container alignItems="center" sx={{ width: 400, mt: 0.5 }}> 
            <Grid item>Wanted</Grid>
            <Grid item>
              <Switch
                defaultChecked
              />
            </Grid>
            <Grid item>Offering</Grid>
          </Grid>
          <br />
          <TextField
            sx={{ width: 400}}
            type="text"
            label="Item Name"
            variant="outlined"
          />
          <br />
          <TextField
            sx={{ width: 400, mt: 1 }}
            type="text"
            label="Description"
            variant="outlined"
            multiline
            rows={5}
          />
          <br />
          <Button
            variant="outlined"
            component="label"
            sx={{ width: 150, mt: 1 }}
          >Add an Image
            <input
              type="file"
              hidden
            />
          </Button>
          <Button
            variant="contained" 
            sx={{width: 150, mt: 3.5}}
          >
            Post Item
          </Button>
        </Box>
      )
    };

    export default NewItemForm;