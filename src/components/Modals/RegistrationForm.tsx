import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useAppContext } from '../../context/state';
import validateField from '../../lib/validateField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type RegistrationFormProps = {
  registrationFormOpen: boolean;
  setRegistrationFormOpen: (open: boolean) => void;
  registerUser: (
    formData: {username: string, email: string, password: string, location: string},
    setLoggedInUser: (user: any) => void
  ) => Promise<{ success: boolean, errors?: any }>;
};

type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  location?: string;
};

type FormTouched = {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  location?: boolean;
};

export default function RegistrationForm(props: RegistrationFormProps) {
  const { registrationFormOpen, setRegistrationFormOpen, registerUser } = props;
  const { setLoggedInUser } = useAppContext();

  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    password: '',
    location: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);

    setErrors({
      ...errors,
      [name]: error
    });

    setTouched({
      ...touched,
      [event.target.name]: true
    });
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await registerUser(formValue, setLoggedInUser);
    
    if (result && !result.success) {
      setErrors(result.errors);
    } else {
      setFormValue({
        username: '',
        email: '',
        password: '',
        location: ''
      });
      setTouched({});
      setRegistrationFormOpen(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("From Values:", formValue)
  }, [formValue]);

  useEffect(() => {
    console.log("errors:", errors)
  }, [errors]);

  return (
    <Modal
      open={registrationFormOpen}
      onClose={() => setRegistrationFormOpen(false)}
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
        <Typography variant="h4">Register</Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ display: "flex", flexDirection: "column"}}
          >
            <TextField
              type="text"
              name="username"
              label="Username"
              sx={{ mt: 1}}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username ? errors.username : ''}
            />
            <TextField
              type="text"
              name="email"
              label="Email"
              sx={{ mt: 1}}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email ? errors.email : ''}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              sx={{mt:1}}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password ? errors.password : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              type="text"
              name="location"
              label="Location"
              sx={{ mt: 1}}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && !!errors.location}
              helperText={touched.location && errors.location ? errors.location : ''}
            />
            <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Submit'}
              </Button>
              <Button
                variant="outlined" 
                sx={{ml:1}}
                onClick={() => setRegistrationFormOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
      </Box>
    </Modal>
  )
};
