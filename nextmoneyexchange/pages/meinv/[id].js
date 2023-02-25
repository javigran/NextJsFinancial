import { useRouter } from 'next/router'
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import TableCredito from '../../components/tableCredito';
import { Divider } from '@mui/material';
import styles from '../../styles/Credito.module.css';
import PMT from '../../utils/pmt';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button } from '@material-ui/core';


function MeInvest({ credito }) {
  const router = useRouter()
  //const { id } = router.query
 console.log("Credito is " + credito);
 //const username = credito.data.attributes.
 const disable = true;
 const id_credito = credito.data.id;
 const username = credito.data.attributes.user.data.attributes.username
 const nombre = credito.data.attributes.user.data.attributes.nombre
 const primer_apellido = credito.data.attributes.user.data.attributes.primer_apellido
 const tipo_garantia = credito.data.attributes.tipo_garantia
 const valor_prestamo = credito.data.attributes.valor_prestamo
 const fecha_desembolso = credito.data.attributes.fecha_desembolso
 const ciudad_credito = credito.data.attributes.ciudad_credito
  return (
    <div className={styles.container}>
    <Container>
    <Box>
       {/* <Divider variant="middle" className={styles.main} />  */}
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>
                        <Grid item xs={6} sm={4} md={4}  >
                            <TextField
                                id="id_credito"
                                label="ID Credito :"
                                placeholder="Tipo de Garantia"
                                name='id_credito'
                                value={id_credito}
                                onChange={e => handleChange(e)}
                                disabled={disable}
                            />

                        </Grid>
                        <Grid item xs={6} sm={4} md={4} >
                            <TextField
                                id="nombre"
                                label="Nombre del Acreedor :"
                                placeholder="Nombre del Cliente"
                                name='nombre'
                                value={nombre + " " + primer_apellido}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}  >
                            <TextField
                                id="tipo_garantia"
                                label="Tipo de Garantia :"
                                placeholder="Tipo de Garantia"
                                name='tipo_garantia'
                                value={tipo_garantia}
                                onChange={e => handleChange(e)}
                                disabled={disable}
                            />

                        </Grid>
                        <Grid item xs={6} sm={4} md={4} >
                            <TextField
                                id="valor_prestamo"
                                label="Valor del Préstamo :"
                                placeholder="Valor del Préstamo"
                                name='valor_prestamo'
                                value={ parseFloat(valor_prestamo).toLocaleString("es-CO") + 'COP'}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} >
                            <TextField
                                id="fecha_desembolso"
                                label="Fecha Desembolso :"
                                placeholder="Fecha Desembolso"
                                name='fecha_desembolso '
                                value={ fecha_desembolso}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>

                        <Grid item xs={6} sm={4} md={4} >
                            <TextField
                                id="ciudad_credito"
                                label="Ciudad Credito :"
                                placeholder="Ciudad Credito"
                                name='ciudad_credito '
                                value={ ciudad_credito}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>

                    </Grid>
      <h2 style={{color:'#1976d2' , textAlign:'left'}}>Detalles del Credito </h2>             
      <TableCredito vp={credito.data.attributes.valor_prestamo} cp={credito.data.attributes.cuotas_pagar} ir={credito.data.attributes.tasa_mes_vcdo / 100} cf={PMT(credito.data.attributes.tasa_mes_vcdo / 100, credito.data.attributes.cuotas_pagar, credito.data.attributes.valor_prestamo).toFixed(1)} />
     
    </Box>
    </Container>
       {/* <Divider variant="middle" className={styles.main} /> */}
        <footer className={styles.footer}>
            {/* <a
                href="https://eco2.com.co"
                target="_blank"
                rel="noopener noreferrer"
            > */}
                {/* Powered by{'   '} ECO² */}
                {/* <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span> */}
            {/* </a> */}
            <Link href="/inversion">
        <Button style={{backgroundColor:'#1976d2', color:'white'}} variant="contained">Regresar a Inversiones </Button>
        </Link> 
        </footer>

       
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  //const cookies = nookies.get(ctx)
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;
  const session = await getSession(ctx);
  const { id } = ctx.query;
  let credito = null;
  // console.log(session);
  if (session?.jwt) {
    try {
      // console.log("Entre aqui " + strapiToken);
      const { data } = await axios.get(`${strapiUrl}/api/creditos/` + id +`?populate[0]=user`, {
        headers: {
          Authorization:
            `Bearer ${strapiToken}`,
        },
      });
      credito = data;
      console.log("Credito is : " + JSON.stringify(credito));
    } catch (e) {
      console.log(e);
    }
  }

  if (!credito) {
    return {

      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      credito
    }
  }
}


export default MeInvest