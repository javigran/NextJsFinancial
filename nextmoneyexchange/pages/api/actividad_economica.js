import axios from 'axios';

export default async (req, res) => {

  const { user,actividad_principal, nombre_empresa, actividad_empresa,direccion_empresa,nit,telefono_empresa,ciudad_empresa,cargo_empresa,fecha_ingreso_emp,tipo_contrato,participacion_emp,porcentaje_participacion } = req.body;

    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const header =  {
     headers: {
      Authorization:
        `Bearer ${strapiToken}`,
      }
  }

  axios.post('http://localhost:1337/api/actividad-economicas/', {
    
       "data":{
        actividad_principal,
        nombre_empresa,
        actividad_empresa,
        direccion_empresa,
        nit,
        telefono_empresa,
        ciudad_empresa,
        cargo_empresa,
        fecha_ingreso_emp,
        tipo_contrato,
        participacion_emp,
        porcentaje_participacion,
        user

       } 
   
    
  },header)
  .then(response => {
    // Handle success.
    console.log('response ' + response);
      
    res.status(200).end();
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error);
    res.status(400).send(error.response.data.error.message);
  });
}

