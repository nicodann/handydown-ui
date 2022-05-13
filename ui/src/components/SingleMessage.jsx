import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Form from './Form';
import Box from "@mui/material/Box";
export default function SingleMessage() {
  return (
<>
  <Box display="flexbox" justifyContent="space-between" alignItems="center">
    <Typography variant="body1">From User</Typography>
    <Typography variant="body1">Four Days Ago</Typography>
  </Box>
  <Typography variant="body2" gutterBottom>
    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
    quasi quidem quibusdam.
  </Typography>
  <Divider />
  <Typography variant="body2" gutterBottom>
    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
    quasi quidem quibusdam.
  </Typography>
  <Divider />
  <Form />
</>
  )
} 