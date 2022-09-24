import axios from 'axios';


export default async (req, res) => {
  const { id,username, password, email,nombre,primer_apellido,seg_apellido,fecha_expedition,type_cedula,no_cedula,genero,fecha_nacimiento,lugar_nascimiento,lugar_expedition,telefono, celular, tipo_vivienda } = req.body;
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;
  const header =  {
   headers: {
    Authorization:
      `Bearer ${strapiToken}`,
    }
}

    axios.put('http://localhost:1337/api/users/'+id, {
        
    username,
    email,
    password,
    nombre,
    primer_apellido,
    seg_apellido,
    fecha_expedition,
    type_cedula,
    no_cedula,
    genero,
    fecha_nacimiento,
    lugar_nascimiento,
    lugar_expedition,
    telefono,
    celular,
    tipo_vivienda
    
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