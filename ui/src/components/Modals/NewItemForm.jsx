  import { useState } from 'react';
  import axios from 'axios';
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
    // const { userId, setITEMs } = props;
    const { handleNewItem } = props;

    const [formValue, setFormValue] = useState({
      userId: 1,
      name: "",
      description: "",
      offered: true,
    });

    const str2bool = (value) => {
      if (value && typeof value === "string") {
           if (value.toLowerCase() === "true") return true;
           if (value.toLowerCase() === "false") return false;
      }
      return value;
    };

    const handleChange = (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]: str2bool(event.target.value)
      });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const newItemFormData = new FormData();
      newItemFormData.append("userId", formValue.userId);
      newItemFormData.append("name", formValue.name);
      newItemFormData.append("description", formValue.description);
      newItemFormData.append("offered", formValue.offered);
      const imagefile = document.querySelector("#file");
      newItemFormData.append("imageFile", imagefile.files[0]);
      try {
        const response = await axios({
          method: 'post',
          url: '/api/items',
          data: newItemFormData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        handleNewItem(response.data);
      } catch(error) {
        console.log(error);
      }
    };

    return (
      <Box sx={{ width: 400, px: 2 }}>
        <Typography variant="h4">Post a New Item</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column"}}>
            <FormControl>
              <RadioGroup row name="offered" defaultValue="true" onChange={handleChange}>
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
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="description"
              label="Description"
              multiline
              rows={5}
              sx={{mt:2}}
              onChange={handleChange}
            />
             <Button
          component="label"
          variant="outlined"
          sx={{mt: 2}}
        >
          Add an Image
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            hidden
            id="file"
          />
        </Button>
            <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button variant="outlined" sx={{ml:1}}>Cancel</Button>
            </Box>
          </Box>
        
       
        
      </Box>
    )
  };

  export default NewItemForm;