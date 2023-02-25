import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Credito.module.css';
import { signOut, useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TableCredito from '../components/tableCredito';
import PMT from '../utils/pmt';
import { textAlign } from '@mui/system';
import { Container } from '@mui/material';


export default function Credito(props) {

    const { data: session } = useSession();
    const nombre = props.user ? props.user.attributes.nombre : "" ;
    const primer_apellido = props.user ? props.user.attributes.primer_apellido : ' ';
    const seg_apellido = props.user ? props.user.attributes.seg_apellido : ' ';
    const username = nombre + ' ' + primer_apellido + ' ' + seg_apellido;
    const credito = props.credito;
    const tipo_garantia = props.credito.data[0] ? credito.data[0].attributes.tipo_garantia : '';
    const valor_credito = props.credito.data[0] ? credito.data[0].attributes.valor_prestamo : '';
    const cuotas_pagar = props.credito.data[0] ? credito.data[0].attributes.cuotas_pagar: '';
    const tasa_mes_vcdo = props.credito.data[0]? credito.data[0].attributes.tasa_mes_vcdo : '';
    const tasa_fi = props.credito.data[0] ? (credito.data[0].attributes.tasa_mes_vcdo + credito.data[0].attributes.tasa_fi) : '';
    const [disable, setDisable] = useState(true);
    
  //console.log("Tasa FI is " + tasa_fi);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }


    //const { credito: { id, email, username, nombre, primer_apellido, seg_apellido, no_cedula, type_cedula, fecha_expedition, lugar_expedition, genero, fecha_nacimiento, lugar_nascimiento, telefono, celular, tipo_vivienda, actividad_economica, referencias } } = props.credito;
    return (


        <div className={styles.container}>
       
            {credito.data[0] ?

                (  
                 <Container>
                    <Box
          component="div"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch', textAlign:'center', alignItems:'center' },
          }}
          noValidate
          autoComplete="off">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>
                       
                            <TextField
                                id="username"
                                label="Nombre del Cliente :"
                                placeholder="Nombre del Cliente"
                                name='username'
                                value={username}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                     
                    
                            <TextField
                                id="tipo_garantia"
                                label="Tipo de Garantia :"
                                placeholder="Tipo de Garantia"
                                name='tipo_garantia'
                                
                            />

                     
                            <TextField
                                id="username"
                                label="Valor del Préstamo :"
                                placeholder="Valor del Préstamo"
                                name='username'
                                value={ parseFloat(valor_credito).toLocaleString('es-CO')}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                            
                   

                    </Grid>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>
                       
                            <TextField
                                id="cuotas_pagar"
                                label="Cuotas a pagar :"
                                placeholder="Cuotas a pagar"
                                name='cuotas_pagar'
                                value={cuotas_pagar}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                    
                            <TextField
                                id="tasa_mes_vcdo:"
                                label="Tasa Mes Vencido :"
                                placeholder="Tasa Mes Vencido"
                                name='tasa_mes_vcdo'
                                value={tasa_fi + '%'}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />

                  
              
                            <TextField
                                id="tasa_efectivo_anual"
                                label="Tasa Efectivo Anual :"
                                placeholder="Tasa efectiva anual"
                                name='tasa_efectivo_anual'
                                value={(tasa_mes_vcdo * 12).toFixed(1) + "%"}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
              

                    </Grid>

                    <Grid container spacing={2} style={{ marginTop: 1 }}>

                            <TextField
                                id="cuota_fija"
                                label="Cuota Fija :"
                                placeholder="Cuiota Fija"
                                name='cuota_fija'
                                value={parseFloat(PMT(tasa_fi / 100, cuotas_pagar, valor_credito).toFixed(0)).toLocaleString('es-CO')}
                                style={{fontWeight:'bold' }}
                                onChange={e => handleChange(e)}
                                variant="filled"
                                disabled={disable}
                            />
                 
                    </Grid>
                        <Grid container spacing={2} style={{ marginTop: 1 }}>

                        <TableCredito vp={valor_credito} cp={cuotas_pagar} ir={tasa_fi / 100} cf={PMT(tasa_fi / 100, cuotas_pagar, valor_credito).toFixed(1)} />


                        </Grid>
                    
                  
                </Box>
                </Container>
              ) : (
                    <Box>
                    
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>
                    <Container style={{marginTop:"20%"}}>
                    <h1 className={styles.title}>
                     ¡TE CUENTO, {session.user.name} 
                     </h1>
                     <h2 className={styles.grid}>
                      No tienes Creditos. 
                     </h2>
                    </Container>
                    </Grid>
                    </Box>
               )
              

            }

            

            <footer className={styles.footer}>
                <a>
                    {/* Powered by{'   '} ECO² */}
                    {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
                </a>
            </footer>

            <Link href="/protected">
            <Button variant="contained">Regresar al Inicio </Button>
            </Link>
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const session = await getSession(ctx);
    // console.log("Retorne session"+ JSON.stringify(session));
    let credito = null;
    let user = null;
    // Check if session exists or not, if not, redirect
    if (session?.jwt) {
        try {
            // console.log("Entre aqui " + strapiToken);
            const { data } = await axios.get(`${strapiUrl}/api/creditos?filters[user][id][$eq]=` + session.id + `&populate[0]=user&populate[1]=soporte_garantia`, {
                headers: {
                    Authorization:
                        `Bearer ${strapiToken}`,
                },
            });
            credito = data;
            user = credito.data[0].attributes.user.data;
          //  console.log(credito);
            //  console.log(user.data);
        } catch (e) {
            console.log(e);
        }
    }

 

    return {
        props: {
            credito,
            user
        }
    }
};