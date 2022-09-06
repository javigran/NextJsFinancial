import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const RegisterComponent = () => {
  const options = [
    { value: '', text: '--Choose an option--' },
    { value: 'CC', text: 'CC' },
    { value: 'CE', text: 'CE' },
    { value: 'TI', text: 'TI' },
  ];
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    nombre:'',
  })
  const [selected, setSelected] = useState(options[0].value);
  const [showPassword,setshowPassword]=useState(false);
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', userData).then(response => {
      if (response.status == 200) {
        alert(response.statusText + "- Usuario Creado Exitosamente.");
        signIn('credentials', {
          redirect: false,
          email: userData.email,
          password: userData.password,
        }).then(response2 => {
         // console.log("Resultado" + response2);
          if (response2.ok) {
           // console.log("Logged-in successfully going to protected");
            router.replace('/protected');
            return;
          }
          else {
            //console.log("Else going to sigin");
            router.replace('/auth/sign-in');
          }

        }).catch(err => {alert("Exeception" +err.response)});

      }

    }).catch(e => {
      alert("Exception 2" + e);
    });
  }

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

  return (
    <Box
      component="form"
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
          placeholder="Un nombre"
          name='username'
          onChange={e => handleChange(e)}
          multiline
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
      <div>
        <TextField
          id="nombre"
          label="Nombre:"
          placeholder="Tu nombre"
          name='nombre'
          onChange={e => handleChange(e)}
          
        />
         <TextField
          id="primer_apellido"
          label="Apellido:"
          placeholder="Tu apellido"
          name='primer_apellido'
          onChange={e => handleChange(e)}
          
        />
      
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name='password'
            type={showPassword ? 'text' : 'password'}

            onChange={e => handleChange(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

      </div>
    <div style={{textAlign:'center'}}> 
      <Button variant="outlined" onClick={handleSubmit}>Registrarse</Button>
      </div>
    </Box>
  )
}

export default RegisterComponent;