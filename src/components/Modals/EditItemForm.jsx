import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

export default function EditItemForm(props) {
  const { 
    loggedInUser, 
    formOpen,
    handleFormClose,
    item,
    editItem
  } = props;
  const [formValue, setFormValue] = useState({
    name: item.name,
    description: item.description,
    offered: true,
  });

  const [myImage, setMyImage] = useState(null);

  const str2bool = (value) => {
    if (value && typeof value === "string") {
          if (value.toLowerCase() === "true") return true;
          if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const handleFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: str2bool(event.target.value)
    });
  };

  const newHandleFormClose = () => {
    handleFormClose();
    setMyImage(null);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const editItemFormData = new FormData();
    editItemFormData.append("id", item.id);
    editItemFormData.append("userId", loggedInUser.id);
    editItemFormData.append("name", formValue.name);
    editItemFormData.append("description", formValue.description);
    editItemFormData.append("offered", formValue.offered);
    const imagefile = document.querySelector("#file");
    editItemFormData.append("imageFile", imagefile.files[0]);
    editItem(editItemFormData, item.id);
    newHandleFormClose();
  };

  const handleImageAddition = (event) => {
    setMyImage(URL.createObjectURL(event.target.files[0]))
  }
  return (
    <Modal
      open={formOpen}
      onClose={handleFormClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4, 
      }}>
        <Typography variant="h4">Edit</Typography>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ display: "flex", flexDirection: "column"}}>
            <FormControl>
              <RadioGroup row name="offered" defaultValue={item.offered ? "true" : "false"} onChange={handleFormChange}>
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
              label="Name"
              defaultValue={item.name}
              sx={{ mt: 1}}
              onChange={handleFormChange}
            />
            <TextField
              type="text"
              name="description"
              label="description"
              defaultValue={item.description}
              multiline
              rows={5}
              sx={{mt:2}}
              onChange={handleFormChange}
            />
            <Button
              component="label"
              variant="outlined"
              sx={{mt: 2}}
            >
              Replace Image
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                hidden
                id="file"
                onChange={handleImageAddition}
              />
            </Button>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 2}}>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  display: myImage === null ? 'none' : 'block'
                }}
                alt="Image to Upload"
                src={myImage}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                variant="outlined" 
                sx={{ml:1}}
                onClick={newHandleFormClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
      </Box>
    </Modal>
  )
};
