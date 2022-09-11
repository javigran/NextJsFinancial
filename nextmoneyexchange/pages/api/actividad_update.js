import axios from 'axios';
export default async (req, res) => {
    const { id, user, actividad_principal, nombre_empresa, actividad_empresa, direccion_empresa, nit, telefono_empresa, ciudad_empresa, cargo_empresa, fecha_ingreso_emp, tipo_contrato, participacion_emp, porcentaje_participacion } = req.body;
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const header = {
        headers: {
            Authorization:
                `Bearer ${strapiToken}`,
        }
    }
    axios.put(`${strapiUrl}/api/actividad-economicas/${id}`, {

        "data": {
           
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
    }, header).then(response => {
       // console.log(response);

        res.status(200).end();
    }).catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
        res.status(400).send(error.response.data.error.message);
    });

}

