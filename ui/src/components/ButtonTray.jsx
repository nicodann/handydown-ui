import Button from '@mui/material/Button';

function ButtonTray() {
  return (
    <div>
        <Button variant="text">register</Button>
       <Button variant="text">login</Button>
        <Button variant="disabled">userName</Button>
        <Button variant="text">logout</Button>
        <Button variant="contained">Post Ad</Button>
    </div>
  )
}

export default ButtonTray