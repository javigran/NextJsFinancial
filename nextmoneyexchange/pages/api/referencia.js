import axios from 'axios';

export default async (req, res) => {
    const { id, tipo_referencia, nombre_ref,parentesco_ref,telefono_ref,direccion_ref,ciudad_ref } = req.body;
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const header = {
      headers: {
        Authorization:
          `Bearer ${strapiToken}`,
      }
    }

    axios.post(`${strapiUrl}/api/referencias/`, {

        "data": {
          tipo_referencia,
          nombre_ref,
          parentesco_ref,
          telefono_ref,
          direccion_ref,
          ciudad_ref,
          "users_permissions_user":id,
    
        }
    
    
      }, header)
        .then(response => {
          // Handle success.
          console.log("Response Reference : ")
          console.log(response);
    
          res.status(200).end();
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          res.status(400).send(error.response.data.error.message);
        });
}