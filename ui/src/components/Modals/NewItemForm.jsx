    import {
      Box,
      Button,
      FormControl,
      FormControlLabel,
      Radio,
      RadioGroup,
      TextField,
      Typography,
    } from '@mui/material';

    function NewItemForm(props) {
      return (
        <Box sx={{ width: 400, px: 2 }}>
          <Typography variant="h4">Post a New Item</Typography>
          
          <form 
            action="http://localhost:8080/api/items"
            method="POST"
            encType="multipart/form-data"
          >
            <Box sx={{ display: "flex", flexDirection: "column"}}>
              <FormControl>
                <RadioGroup row name="offered" defaultValue="true">
                  <FormControlLabel 
                    value="true"
                    control={<Radio />}
                    label="Offering"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Wanted"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                type="text"
                name="name"
                label="Item Name"
                sx={{ mt: 1}}
              />
              <TextField
                type="text"
                name="description"
                label="Description"
                multiline
                rows={5}
                sx={{mt:2}}
              />
              <Button
                component="label"
                variant="outlined"
                sx={{mt: 2}}
              >
                Add an Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                />
              </Button>
              <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
                <Button type="submit" variant="contained">Submit</Button>
                <Button variant="outlined" sx={{ml:1}}>Cancel</Button>
              </Box>
            </Box>
          </form>
        </Box>
      )
    };

    export default NewItemForm;