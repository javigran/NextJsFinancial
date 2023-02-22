
import { getSession } from 'next-auth/react';
import axios from 'axios';
import styles from '../styles/Credito.module.css';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { fontFamily } from '@mui/system';
import TableInversion from '../components/tableInversion';
import { Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button';
/**
 * Inversion Page 
 * @param {props  from server side } props 
 */
export default function Inversion(props) {
    const { data: session } = useSession();
    const inversion = props.inversion;
    const user = props.user;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }
    console.log(inversion);
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
           
    return (

        <div className={styles.container}>


            {inversion ? (
                <Container>
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch', textAlign: 'center', alignItems: 'center' },
                        }}
                        noValidate
                        autoComplete="off">

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1}}>
                            <Grid item >
                                {/* <TextField
                            id="username"
                            label="Socio Accionista :"
                            placeholder="Soccio Accionista"
                            name='username'
                            value={user.attributes.username}
                            onChange={e => handleChange(e)}
                          
                            disabled={true}
                        /> */}
                                <TextField
                                    id="nombre"
                                    label="Socio Accionista :"
                                    placeholder="Soccio Accionista"
                                    name='nombre'
                                    value={user.attributes.nombre + user.attributes.primer_apellido}
                                    onChange={e => handleChange(e)}

                                    disabled={true}
                                />
                                <TextField
                                    id="no_cedula"
                                    label="Nº Cedula Accionista :"
                                    placeholder="Nº Cedula Accionista"
                                    name='no_cedula'
                                    value={user.attributes.no_cedula}
                                    onChange={e => handleChange(e)}

                                    disabled={true}
                                />
                            </Grid>
                       


                        </Grid>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>

                            <h2 style={{color:'#1976d2'}}>Lista de Inversiones </h2>
                            <Grid container spacing={2} style={{ marginTop: 1 }}>
                                <TableInversion data={inversion} />
                            </Grid>
           
                           
                           
                           
                      </Grid>
                      
                    </Box>
                </Container>) : (<Box>

                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>

                        <Container style={{ marginTop: "20%" }}>
                            <h1 className={styles.title}>
                                ¡TE CUENTO, {session.user.name}
                            </h1>
                            <h2 className={styles.grid}>
                                No tienes Inversiones.
                            </h2>
                        </Container>
                    </Grid>




                </Box>)}




            <footer className={styles.footer}>
            <Link href="/protected">
                <Button variant="contained">Regresar al Inicio </Button>
            </Link>
                <a

                >
                    {/* Powered by{'   '} ECO² */}
                    {/* <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span> */}
                </a>
            </footer>

       

        </div>

    );

}
export const getServerSideProps = async (ctx) => {
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const session = await getSession(ctx);
    //  console.log("Retorne session"+ JSON.stringify(session));
    let inversion = null;
    let user = null;

    // Check if session exists or not, if not, redirect
    if (session?.jwt) {
        try {
            // let urlws = `${strapiUrl}/api/inversions?filters[users_permissions_user][id][$eq]=` + session.id + `&populate[0]=users_permissions_user&populate[1]=credito`;
            //console.log("Entre aqui " + urlws);

            const { data } = await axios.get(`${strapiUrl}/api/inversions?filters[users_permissions_user][id][$eq]=` + session.id + `&populate[0]=users_permissions_user&populate[1]=credito`, {
                headers: {
                    Authorization:
                        `Bearer ${strapiToken}`,
                },
            });
            console.log(data);
            //console.log(data.data);

            if (data.data.length > 0) {
                inversion = data.data;
                user = data.data[0].attributes.users_permissions_user.data;

            }

        } catch (e) {
            console.log(e);
        }
    }

    // if (!user) {
    //     return {

    //         redirect: {
    //             permanent: false,
    //             destination: '/'
    //         }
    //     }
    // }

    return {
        props: {
            inversion,
            user
        }
    }
};