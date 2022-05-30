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
import CircularProgress from '@mui/material/CircularProgress';

export default function AddItemForm(props) {
  const { loggedInUser, formOpen, addItem, handleFormClose } = props;
  
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    offered: true,
  });
  const [myImage, setMyImage] = useState(null);
  const [transition, setTransition] = useState(false);
  const [transitionPhrase, setTransitionPhrase] = useState('')

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
    setFormValue({
      name: "",
      description: "",
      offered: true,
    });
    setMyImage(null);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newItemFormData = new FormData();
    newItemFormData.append("userId", loggedInUser.id);
    newItemFormData.append("name", formValue.name);
    newItemFormData.append("description", formValue.description);
    newItemFormData.append("offered", formValue.offered);
    const imagefile = document.querySelector("#file");
    newItemFormData.append("imageFile", imagefile.files[0]);
    setTransition(true);
    setTransitionPhrase('Posting Item...');
    setTimeout(() => {
      setTransition(false);
      addItem(newItemFormData);
      newHandleFormClose();
    }, 1000);
  };

  const handleImageAddition = (event) => {
    setMyImage(URL.createObjectURL(event.target.files[0]))
  }
  
  if (transition) {
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
          width: 600,
          height: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column'
        }}>
          <CircularProgress size={80} />
          <Typography sx={{mt: 2}}>{transitionPhrase}</Typography>
        </Box>
      </Modal>
    )
  } else {
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
          width: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4, 
        }}>
          <Typography variant="h4">Post a New Item</Typography>
            <Box component="form" onSubmit={handleFormSubmit} sx={{ display: "flex", flexDirection: "column"}}>
              <FormControl>
                <RadioGroup row name="offered" defaultValue="true" onChange={handleFormChange}>
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
                onChange={handleFormChange}
              />
              <TextField
                type="text"
                name="description"
                label="Description"
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
                Add an Image
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
  }
};
