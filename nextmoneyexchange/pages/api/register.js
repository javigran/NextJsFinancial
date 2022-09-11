import axios from 'axios';
import { setCookie } from 'nookies'

export default async (req, res) => {
  const { username, password, email,nombre,primer_apellido,type_cedula,no_cedula } = req.body;

  const strapiUrl = process.env.STRAPI_URL;

    axios.post(`${strapiUrl}/api/auth/local/register`, {
    username,
    email,
    password,
    nombre,
    primer_apellido,
    type_cedula,
    no_cedula,
    type_cedula
    
  })
  .then(response => {
    // Handle success.
    console.log('response ' + response);
      
  
    setCookie({ res }, 'jwt', response.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/protected',
    });

    res.status(200).end();
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response.data.error.message);
    res.status(400).send(error.response.data.error.message);
  });
  

    

}