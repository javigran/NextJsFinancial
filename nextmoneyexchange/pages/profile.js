import { useRouter } from 'next/router';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import User_Basic_Info from '../components/user_basic_info';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const Profile = (props) => {
  const router = useRouter();
  const {data:session} = useSession();
  const { user: { email, username,nombre, primer_apellido,seg_apellido,no_cedula,type_cedula,fecha_expedition,lugar_expedition,genero,fecha_nacimiento, lugar_nascimiento,telefono,celular,tipo_vivienda} } = props;
  const [value, setValue] = useState(0);
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
        type_cedula:type_cedula,
        no_cedula:no_cedula,
        nombre:nombre,
        primer_apellido:primer_apellido,
        seg_apellido:seg_apellido,
        fecha_expedition:fecha_expedition,
        lugar_expedition:lugar_expedition,
        genero:genero,
        fecha_nacimiento:fecha_nacimiento,
        lugar_nascimiento:lugar_nascimiento,
        telefono:telefono,
        celular:celular,
        tipo_vivienda:tipo_vivienda,
      })

     // console.log("Username" + .username);
     var selec= options.find(opt => opt.value===type_cedula);
    // console.log(selec);
      const [selected, setSelected] = useState(selec.value);
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
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (


    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
          <Tab label="Información Basica del Cliente" {...a11yProps(0)} />
          <Tab label="Actividad Económica" {...a11yProps(1)} />
          <Tab label="Información Financiera" {...a11yProps(2)} />
          <Tab label="Inmueble & Vehiculo" {...a11yProps(3)} />
          <Tab label="Conyugue & Referencias" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
          value={userData.username}
          onChange={e => handleChange(e)}
          variant="filled"
          
        />
        <TextField
          id="email"
          label="Email:"
          placeholder="Tu email"
          name='email'
          value={userData.email}
          onChange={e => handleChange(e)}
          variant="filled"
          
        />
          <TextField
          id="type_cedula"
          name="type_cedula"
          label="Tipo de Documento:"
          value={selected}
          onChange={e => handleChangeSelect(e)}
          helperText="Cual es el Tuyo"
          variant="filled"
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
          value={userData.no_cedula}
          variant="filled"
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          id="fecha_expedition"
          label="Fecha Expedición:"
          placeholder="fecha expedición"
          name='fecha_expedition'
          value={userData.fecha_expedition}
          onChange={e => handleChange(e)}
          variant="filled"
          
        />
       
       </div>
       <div>

       <TextField
          id="nombre"
          label="Nombre:"
          placeholder="Tu Nombre"
          name='nombre'
          onChange={e => handleChange(e)}
          value={userData.nombre}
          variant="filled"
        />
    
       <TextField
          id="primer_apellido"
          label="Primer Apellido:"
          placeholder="Tu 1er Apellido"
          name='primer_apellido'
          onChange={e => handleChange(e)}
          value={userData.primer_apellido}
          variant="filled"
        />
             <TextField
          id="seg_apellido"
          label="Segundo Apellido:"
          placeholder="Tu 2do Apellido"
          name='seg_apellido'
          onChange={e => handleChange(e)}
          value={userData.seg_apellido}
          variant="filled"
        />
         <TextField
          id="genero"
          label="Genero:"
          placeholder="Tu Genero"
          name='genero'
          onChange={e => handleChange(e)}
          value={userData.seg_apellido}
          variant="filled"
        />
             <TextField
          id="lugar_expedition"
          label="Lugar Expedición Documento :"
          placeholder="Luga de Expedición"
          name='lugar_expedition'
          onChange={e => handleChange(e)}
          value={userData.lugar_expedition}
          variant="filled"
        />
       </div>
      </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </Box>
  )
}

export const getServerSideProps = async (ctx) => {
  //const cookies = nookies.get(ctx)
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;
  const session = await getSession(ctx);
  let user = null;
 // console.log(session);
  if (session?.jwt) {
    try {
       // console.log("Entre aqui " + strapiToken);
      const { data } = await axios.get(`${strapiUrl}/api/users/`+session.id, {
        headers: {
          Authorization:
            `Bearer ${strapiToken}`,
          },
      });
      user = data;
     console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {

      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      user
    }
  }
}
export default Profile;