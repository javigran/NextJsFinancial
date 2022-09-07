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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
  const { data: session } = useSession();
  const { user: { id, email, username, nombre, primer_apellido, seg_apellido, no_cedula, type_cedula, fecha_expedition, lugar_expedition, genero, fecha_nacimiento, lugar_nascimiento, telefono, celular, tipo_vivienda } } = props;
  const [value, setValue] = useState(0);
  const options = [
    { value: '', text: '--Choose an option--' },
    { value: 'CC', text: 'CC' },
    { value: 'CE', text: 'CE' },
    { value: 'TI', text: 'TI' },
  ];
  const optionsG = [
    { value: '', text: '--Escoge una opción--' },
    { value: 'M', text: 'M' },
    { value: 'F', text: 'F' },
  ];
  const optionsV = [
    { value: '', text: '--Escoge una opción--' },
    { value: 'Arrendada', text: 'Arrendada' },
    { value: 'Familiar', text: 'Familiar' },
    { value: 'Propia sin Hipoteca', text: 'Propia sin Hipoteca' },
    { value: 'Propia con Hipoteca', text: 'Propia con Hipoteca' },
  ];
  var selecG = optionsG.find(opt => opt.value === genero);
  const [selectedG, setSelectedG] = useState(selecG.value);
  const [userData, setUserData] = useState({
    id: id,
    username: username,
    email: email,
    //password: password,
    type_cedula: type_cedula,
    no_cedula: no_cedula,
    nombre: nombre,
    primer_apellido: primer_apellido,
    seg_apellido: seg_apellido,
    fecha_expedition: fecha_expedition,
    lugar_expedition: lugar_expedition,
    genero: genero,
    fecha_nacimiento: fecha_nacimiento,
    lugar_nascimiento: lugar_nascimiento,
    telefono: telefono,
    celular: celular,
    tipo_vivienda: tipo_vivienda,

  })

const [ActividadEconomica, setActividadEconomica] = useState({
  user:id,
  actividad_principal:'',
  nombre_empresa:'',
  participacion_emp:false,
})
  



  // console.log("Username" + .username);
  //  try {
  //  var selec= options.find(opt => opt.value===type_cedula);
  //  console.log(selec);
  //  } catch (ex) {
  //   console.log("Aui");
  //    selec = options[0];
  //  }
  // console.log(selec);
  const [selected, setSelected] = useState(options[0].value);
  const [showPassword, setshowPassword] = useState(false);
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
  const handleData = (e) => {

    var dataok = e.toISOString().split('T')[0];
    console.log(dataok);
    setUserData({ ...userData, fecha_expedition: dataok, });
  }
  const handleDataNacimento = (e) => {

    var dataok = e.toISOString().split('T')[0];
    console.log(dataok);
    setUserData({ ...userData, fecha_nacimiento: dataok, });
  }
  const handleChangeSelectG = (e) => {
    //console.log("cambie"+ e.target.name + "value"+ e.target.value);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }
  const handleChangeSelectV = (e) => {
    //console.log("cambie"+ e.target.name + "value"+ e.target.value);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }
  const handleChangeSelect = (e) => {
    console.log("cambie" + e.target.name + "value" + e.target.value);
    const { name, value } = e.target;
    //setSelected(value);
    setUserData({ ...userData, [name]: value });
  }
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    await axios.post('/api/updateuser', userData).then(response => {
      if (response.status == 200) {
        alert(response.statusText + "- Usuario Actualizado Satisfactoriamente.");

      }

    }).catch(e => {
      alert("Exception 2" + e);
    });
    console.log(userData);
  }


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
              value={userData.type_cedula}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="fecha_expedition"
                name='fecha_expedition'
                label="Fecha Expedición"
                placeholder="fecha expedición"
                value={userData.fecha_expedition}
                onChange={(newValue) => {
                  handleData(newValue);
                }}

                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

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
              name="genero"
              label="Genero:"
              value={userData.genero}
              onChange={e => handleChangeSelectG(e)}
              helperText="Tu Genero"
              variant="filled"
              select
            >
              {optionsG.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>

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
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="fecha_nacimiento"
                name='fecha_nacimiento'
                label="Fecha Nascimiento"
                placeholder="fecha nascimiento"
                value={userData.fecha_nacimiento}
                onChange={(newValue) => {
                  handleDataNacimento(newValue);
                }}

                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              id="lugar_nascimento"
              label="Lugar de Nascimento  :"
              placeholder="Luga de Nascimento"
              name='lugar_nascimento'
              onChange={e => handleChange(e)}
              value={userData.lugar_nascimento}
              variant="filled"
            />
            <TextField
              id="telefono"
              label="Telefono :"
              placeholder="Telefono"
              name='telefono'
              onChange={e => handleChange(e)}
              value={userData.telefono}
              variant="filled"
            />
            <TextField
              id="celular"
              label="Celular :"
              placeholder="Celular"
              name='celular'
              onChange={e => handleChange(e)}
              value={userData.celular}
              variant="filled"
            />
            <TextField
              id="tipo_vivienda"
              name="tipo_vivienda"
              label="Tipo Vivienda:"
              value={userData.tipo_vivienda}
              onChange={e => handleChangeSelectV(e)}
              helperText="Tu tipo vivienda"
              variant="filled"
              select
            >
              {optionsV.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off">
      <div>

            <TextField
              id="actividad_principal"
              label="Actividad Principal :"
              placeholder="actividad principal"
              name='actividad_principal'
              value={ActividadEconomica.actividad_principal}
              onChange={e => handleChange(e)}
              variant="filled"

            />
              <TextField
              id="nombre_empresa"
              label="Nombre Empresa :"
              placeholder="nombre empresa"
              name='nombre_empresa'
              value={ActividadEconomica.nombre_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />
                  <TextField
              id="actividad_empresa"
              label="Actividad Empresa :"
              placeholder="actividad empresa"
              name='actividad_empresa'
              value={ActividadEconomica.actividad_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />
             <TextField
              id="direccion_empresa"
              label="Dirección Empresa :"
              placeholder="dirección empresa"
              name='direccion_empresa'
              value={ActividadEconomica.direccion_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />
             <TextField
              id="nit"
              label="Nit :"
              placeholder="nit"
              name='nit'
              value={ActividadEconomica.nit}
              onChange={e => handleChange(e)}
              variant="filled"

            />
            
      </div>
<div>
<TextField
              id="telefono_empresa"
              label="Telefono Empresa :"
              placeholder="telefono empresa"
              name='telefono_empresa'
              value={ActividadEconomica.telefono_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />

<TextField
              id="ciudad_empresa"
              label="Ciudad Empresa :"
              placeholder="ciudad empresa"
              name='ciudad_empresa'
              value={ActividadEconomica.ciudad_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />
            <TextField
              id="cargo_empresa"
              label="Cargo Empresa :"
              placeholder="cargo empresa"
              name='cargo_empresa'
              value={ActividadEconomica.cargo_empresa}
              onChange={e => handleChange(e)}
              variant="filled"

            />

<LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="fecha_ingreso_emp"
                name='fecha_ingreso_emp'
                label="Fecha Ingreso"
                placeholder="fecha ingreso"
                value={userData.fecha_ingreso_emp}
                onChange={(newValue) => {
                  handleData(newValue);
                }}

                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              id="tipo_contrato"
              label="Top Contrato :"
              placeholder="tipo contrato"
              name='tipo_contrato'
              value={ActividadEconomica.tipo_contrato}
              onChange={e => handleChange(e)}
              variant="filled"

            />
            
</div>
<div>

<FormControlLabel control={<Checkbox checked={ActividadEconomica.participacion_emp} />} label="Participación Empresa" />

<TextField
              id="porcentaje_participacion"
              label="% Participación :"
              placeholder="% participación"
              name='porcentaje_participacion'
              value={ActividadEconomica.porcentaje_particsipacion}
              onChange={e => handleChange(e)}
              variant="filled"

            />
</div>


      </Box>
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

      <div style={{ textAlign: 'center' }}>
        <Button variant="outlined" onClick={handleSubmitUpdate}>Guardar Cambios</Button>
      </div>
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
      const { data } = await axios.get(`${strapiUrl}/api/users/` + session.id, {
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