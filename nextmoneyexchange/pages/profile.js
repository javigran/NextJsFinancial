import { useRouter } from 'next/router';
import axios from 'axios';
//import { signOut, useSession } from 'next-auth/react'
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
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
// ICONS 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';

import ViewColumn from '@material-ui/icons/ViewColumn';
import { Save } from '@material-ui/icons';

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
  const { user: { id, email, username, nombre, primer_apellido, seg_apellido, no_cedula, type_cedula, fecha_expedition, lugar_expedition, genero, fecha_nacimiento, lugar_nascimiento, telefono, celular, tipo_vivienda, actividad_economica, referencias } } = props;
  const [value, setValue] = useState(0);
  const [disable, setDisable] = useState(true);
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
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} displayName={'Add'} /> ),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} displayName={'Check'} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} displayName={'Clear'} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} displayName={'Delete'} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} displayName={'DetailPanel'} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} displayName={'Edit'} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} displayName={'Export'} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}  displayName={'Filter'}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} displayName={'FirstPage'} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} displayName={'LastPage'} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} displayName={'NextPage'} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} displayName={'PreviousPage'} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} displayName={'ResetSearch'} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} displayName={'Search'} />),
    Save: forwardRef((props,ref) => <Save {...props} ref={ref} displayName={'Save'}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} displayName={'SortArrow'} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} displayName={'ThirdStateCheck'}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} displayName={'ViewColumn'} />)
  };

  tableIcons.Add.displayName = 'Add';
  tableIcons.Check.displayName = 'Check';
  tableIcons.Clear.displayName = 'Clear';
  tableIcons.Delete.displayName = 'Delete';
  tableIcons.DetailPanel.displayName = 'DetailPanel'
  tableIcons.Edit.displayName = 'Edit'
  tableIcons.Export.displayName = 'Export'
  tableIcons.Filter.displayName = 'Filter'
  tableIcons.FirstPage.displayName = 'FirstPage'
  tableIcons.LastPage.displayName = 'LastPage'
  tableIcons.NextPage.displayName = 'NextPage'
  tableIcons.PreviousPage.displayName = 'PreviousPage'
  tableIcons.ResetSearch.displayName = 'ResetSearch'
  tableIcons.Search.displayName = 'Search'
  tableIcons.Save.displayName = 'Save'
  tableIcons.SortArrow.displayName = 'SortArrow'
  tableIcons.ThirdStateCheck.displayName = 'ThirdStateCheck'
  tableIcons.ViewColumn.displayName = 'ViewColumn'




  const [isActividadEco, setisActividadEco] = useState(false);
  // const [selectedG, setSelectedG] = useState(selecG.value);
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
    actividad_economica: actividad_economica,
    referencias: referencias
  })

  var id_actividad = null;
  var actividad_principal, nombre_empresa, actividad_empresa, direccion_empresa, nit, telefono_empresa, ciudad_empresa, cargo_empresa, fecha_ingreso_emp, tipo_contrato, porcentaje_participacion, participacion_emp = '';



  if (actividad_economica != null) {
    //console.log("asigne actividad " + JSON.stringify(actividad_economica));
    id_actividad = actividad_economica.id;
    actividad_principal = actividad_economica.actividad_principal;
    nombre_empresa = actividad_economica.nombre_empresa;
    actividad_empresa = actividad_economica.actividad_empresa;
    direccion_empresa = actividad_economica.direccion_empresa;
    nit = actividad_economica.nit;
    telefono_empresa = actividad_economica.telefono_empresa;
    ciudad_empresa = actividad_economica.ciudad_empresa;
    cargo_empresa = actividad_economica.cargo_empresa;
    fecha_ingreso_emp = actividad_economica.fecha_ingreso_emp;
    tipo_contrato = actividad_economica.tipo_contrato;
    porcentaje_participacion = actividad_economica.porcentaje_participacion;
    participacion_emp = actividad_economica.participacion_emp;
    //  console.log("Id actividad" + id_actividad);
  }
  const [errorMessages, setErrorMessages] = useState([])
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
  const handleChangeActividadEco = (e) => {

    const { name, value } = e.target;
    setisActividadEco(true);
    //console.log(e.target.value);
    // setActividatToUpdate({...ActividadToUpdate,[name]:value});4
    //setActividadEconomica({ ...ActividadEconomica,  });
    setUserData({ ...userData, ['actividad_economica']: { ...userData.actividad_economica, [name]: e.target.value } });
    console.log("Userdata : " + JSON.stringify(userData));
  }
  const handleData = (e) => {
    try {
      var dataok = e.toISOString().split('T')[0];
      //console.log(dataok);
      setUserData({ ...userData, fecha_expedition: dataok });
    }
    catch (ex) { console.log(ex); }

  }
  const handleDataActividadEco = (e) => {
    try {
      var dataok = e.toISOString().split('T')[0];
     // console.log(dataok);
      setisActividadEco(true);
      // setActividadToUpdate({...ActividadToUpdate, fecha_ingreso_emp: dataok});
      setUserData({ ...userData, ['actividad_economica']: { ...userData.actividad_economica, fecha_ingreso_emp: dataok } });

    }
    catch (e) {
      console.log(e);
    }



  }
  const handleDataNacimento = (e) => {
    try {
      var dataok = e.toISOString().split('T')[0];
      console.log(dataok);
      setUserData({ ...userData, fecha_nacimiento: dataok });
    } catch (error) {
      console.log(error);
    }

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
  const handleEnable = (e) => {
    setDisable(!disable);
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    await axios.post('/api/updateuser', userData).then(response => {
      if (response.status == 200) {
        alert(response.statusText + "- Usuario Actualizado Satisfactoriamente.");

        if (isActividadEco && userData.actividad_economica.id == null) {
          console.log(userData);
          //setUserData({...userData,['actividad_economica']:{...userData.actividad_economica,user:userData.id}});
          axios.post('/api/actividad_economica', userData).then(response2 => {
            console.log("Response2" + JSON.stringify(response2))
            if (response2.status == 200) {
              alert(response.statusText + "- Actividad Economica Creada Satisfactoriamente.");
              setisActividadEco(false);
            }
          });
        }
        else if (isActividadEco && userData.actividad_economica != null) {

          //console.log("Actividad to Update :" + userData); 
          axios.post('/api/actividad_update', userData.actividad_economica).then(response2 => {
            console.log("Response2" + JSON.stringify(response2))
            if (response2.status == 200) {

              alert(response2.statusText + "- Actividad Economica Actualizado Satisfactoriamente.");
              setisActividadEco(false);
            }
          });
        }
        setDisable(true);

      }

    })
      .catch(e => {
        alert("Exception 2" + e);
      });

    //console.log(userData);
  }
  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    newData.id =userData.id;
    if(newData.tipo_referencia === undefined){
      errorList.push("Please enter tipo reference")
    }
    if(newData.nombre_ref === undefined){
      errorList.push("Please enter  name")
    }
    if(newData.parentesco_ref === undefined){
      errorList.push("Please enter a valid parntesco")
    }
    if(errorList.length < 1){ //no error
      console.log("No error ");
      axios.post("/api/referencia", newData)
        .then(res => {
          console.log("Responmse" + res);   
          let dataToAdd = [...userData.referencias];
          dataToAdd.push(newData);
          console.log("DataToAdd" + dataToAdd);
          setUserData({...userData, ['referencias']: dataToAdd });
          console.log("UserData" + userData);
          resolve()
          setErrorMessages([])
          //setIserror(false)
       })
       .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          //setIserror(true)
          resolve()
        })
    }else{
      setErrorMessages(errorList)
     // setIserror(true)
      resolve()
    }
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
              disabled={disable}

            />
            <TextField
              id="email"
              label="Email:"
              placeholder="Tu email"
              name='email'
              value={userData.email}
              onChange={e => handleChange(e)}
              variant="filled"
              disabled={disable}

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
              disabled={disable}
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
              disabled={disable}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="fecha_expedition"
                name='fecha_expedition'
                label="Fecha Expedición"
                placeholder="fecha expedición"
                value={userData.fecha_expedition ? userData.fecha_expedition : ''}
                onChange={(newValue) => {
                  handleData(newValue);
                }}
                disabled={disable}
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
              value={userData.nombre ? userData.nombre : ''}
              variant="filled"
              disabled={disable}

            />

            <TextField
              id="primer_apellido"
              label="Primer Apellido:"
              placeholder="Tu 1er Apellido"
              name='primer_apellido'
              onChange={e => handleChange(e)}
              value={userData.primer_apellido ? userData.primer_apellido : ''}
              variant="filled"
              disabled={disable}

            />
            <TextField
              id="seg_apellido"
              label="Segundo Apellido:"
              placeholder="Tu 2do Apellido"
              name='seg_apellido'
              onChange={e => handleChange(e)}
              value={userData.seg_apellido ? userData.seg_apellido : ''}
              variant="filled"
              disabled={disable}

            />
            <TextField
              id="genero"
              name="genero"
              label="Genero:"
              value={userData.genero ? userData.genero : ''}
              onChange={e => handleChangeSelectG(e)}
              helperText="Tu Genero"
              variant="filled"
              disabled={disable}
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
              value={userData.lugar_expedition ? userData.lugar_expedition : ''}
              disabled={disable}
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
                value={userData.fecha_nacimiento ? userData.fecha_nacimiento : ''}
                onChange={(newValue) => {
                  handleDataNacimento(newValue);
                }}
                disabled={disable}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              id="lugar_nascimento"
              label="Lugar de Nascimento  :"
              placeholder="Luga de Nascimento"
              name='lugar_nascimento'
              onChange={e => handleChange(e)}
              value={userData.lugar_nascimento ? userData.lugar_nascimiento : ''}
              disabled={disable}
              variant="filled"
            />
            <TextField
              id="telefono"
              label="Telefono :"
              placeholder="Telefono"
              name='telefono'
              onChange={e => handleChange(e)}
              value={userData.telefono ? userData.telefono : ''}
              disabled={disable}
              variant="filled"
            />
            <TextField
              id="celular"
              label="Celular :"
              placeholder="Celular"
              name='celular'
              onChange={e => handleChange(e)}
              value={userData.celular ? userData.telefono : ''}
              disabled={disable}
              variant="filled"
            />
            <TextField
              id="tipo_vivienda"
              name="tipo_vivienda"
              label="Tipo Vivienda:"
              value={userData.tipo_vivienda ? userData.tipo_vivienda : ''}
              onChange={e => handleChangeSelectV(e)}
              helperText="Tu tipo vivienda"
              variant="filled"
              disabled={disable}
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
              value={userData.actividad_economica ? userData.actividad_economica.actividad_principal : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}

            />
            <TextField
              id="nombre_empresa"
              label="Nombre Empresa :"
              placeholder="nombre empresa"
              name='nombre_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.nombre_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}

            />
            <TextField
              id="actividad_empresa"
              label="Actividad Empresa :"
              placeholder="actividad empresa"
              name='actividad_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.actividad_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />
            <TextField
              id="direccion_empresa"
              label="Dirección Empresa :"
              placeholder="dirección empresa"
              name='direccion_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.direccion_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}

            />
            <TextField
              id="nit"
              label="Nit :"
              placeholder="nit"
              name='nit'
              value={userData.actividad_economica ? userData.actividad_economica.nit : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />

          </div>
          <div>
            <TextField
              id="telefono_empresa"
              label="Telefono Empresa :"
              placeholder="telefono empresa"
              name='telefono_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.telefono_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />

            <TextField
              id="ciudad_empresa"
              label="Ciudad Empresa :"
              placeholder="ciudad empresa"
              name='ciudad_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.ciudad_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />
            <TextField
              id="cargo_empresa"
              label="Cargo Empresa :"
              placeholder="cargo empresa"
              name='cargo_empresa'
              value={userData.actividad_economica ? userData.actividad_economica.cargo_empresa : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="fecha_ingreso_emp"
                name='fecha_ingreso_emp'
                label="Fecha Ingreso"
                placeholder="fecha ingreso"
                value={userData.actividad_economica ? userData.actividad_economica.fecha_ingreso_emp : ''}
                onChange={(newValue) => {
                  handleDataActividadEco(newValue);
                }}
                disabled={disable}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              id="tipo_contrato"
              label="Top Contrato :"
              placeholder="tipo contrato"
              name='tipo_contrato'
              value={userData.actividad_economica ? userData.actividad_economica.tipo_contrato : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
            />

          </div>
          <div>

            <FormControlLabel control={<Checkbox disabled={disable} checked={userData.actividad_economica ? userData.actividad_economica.participacion_emp : false}></Checkbox>} label="Participación Empresa" />

            <TextField
              id="porcentaje_participacion"
              label="% Participación :"
              placeholder="% participación"
              name='porcentaje_participacion'
              value={userData.actividad_economica ? userData.actividad_economica.porcentaje_participacion : ''}
              onChange={e => handleChangeActividadEco(e)}
              variant="filled"
              disabled={disable}
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
        <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'id', field: 'id' },
              { title: 'Tipo Referencia', field: 'tipo_referencia' },
              { title: 'Nombre', field: 'nombre_ref' },
              { title: 'Parentesco', field: 'parentesco_ref'/* lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } */ },
              { title: 'Telefono', field: 'telefono_ref', type: 'numeric' },
              { title: 'Dirección', field: 'direccion_ref' },
              { title: 'Ciudad', field: 'ciudad_ref' },
              { title: 'Fecha Creación', field: 'createdAt' },

            ]}
            data={userData.referencias}
            editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            title="Referencias"
          />
        </div>
      </TabPanel>

      <div style={{ textAlign: 'center' }}>

        <Button variant="outlined" onClick={handleEnable}>{disable ? 'Actualizar' : 'Bloquear Campos'}</Button>
        <Button variant="outlined" disabled={disable} onClick={handleSubmitUpdate}>Guardar Cambios</Button>

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
  if (session) {
    try {
      // console.log("Entre aqui " + strapiToken);
      const { data } = await axios.get(`${strapiUrl}/api/users/` + session.session.user.email + '?populate=%2A', {
        headers: {
          Authorization:
            `Bearer ${strapiToken}`,
        },
      });
      user = data;
      //console.log(user);
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


Profile.displayName = 'Profile';

export default Profile;