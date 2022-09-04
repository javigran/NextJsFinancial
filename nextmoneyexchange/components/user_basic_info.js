import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
const User_Basic_Info = (props) => {
    console.log(props);
    const {  email, username,nombre, primer_apellido,seg_apellido  } = props;
    const options = [
        { value: '', text: '--Choose an option--' },
        { value: 'CC', text: 'CC' },
        { value: 'CE', text: 'CE' },
        { value: 'TI', text: 'TI' },
      ];
  
      const [userData, setUserData] = useState({
        username: username,
        email: email,
        //password: password,
        nombre:nombre,
      })

     // console.log("Username" + .username);
      const [selected, setSelected] = useState(options[0].value);
      const [showPassword,setshowPassword]=useState(false);
      const handleClickShowPassword = () => {
        setshowPassword(!showPassword);
      };
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      }
      const handleChangeSelect = (e) => {
        //console.log("cambie"+ e.target.name + "value"+ e.target.value);
        const { name, value } = e.target;
        setSelected(value);
        setUserData({ ...userData, [name]: selected });
      }

    return(

        <Box
        component="div"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
       <div>
       <TextField
          id="username"
          label="Username:"
          placeholder="username"
          name='username'
          defaultValue={username+'"'}
          onChange={e => handleChange(e)}
          variant="filled"
        />
        <TextField
          id="email"
          label="Email:"
          placeholder="Tu email"
          name='email'
          onChange={e => handleChange(e)}
          multiline
        />
          <TextField
          id="type_cedula"
          name="type_cedula"
          label="Tipo de Documento:"
          value={selected}
          onChange={e => handleChangeSelect(e)}
          helperText="Cual es el Tuyo"
          select
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="no_cedula"
          label="No. Cedula:"
          placeholder="Tu No. de Cedula"
          name='no_cedula'
          onChange={e => handleChange(e)}
          multiline
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
       </div>
      </Box>
   
    );
}

export default User_Basic_Info;
