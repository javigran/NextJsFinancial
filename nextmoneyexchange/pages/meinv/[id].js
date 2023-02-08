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


function MeInvest({ credito }) {
  const router = useRouter()
  //const { id } = router.query
 console.log("Credito is " + credito);
 //const username = credito.data.attributes.
 const disable = true;
 const username = credito.data.attributes.user.data.attributes.username
  return (
    <div className={styles.container}>
    <Box>
       <Divider variant="middle" className={styles.main} />
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: 1 }}>
                        <Grid item xs={3} sm={4} md={4} >
                            <TextField
                                id="username"
                                label="Nombre del Cliente :"
                                placeholder="Nombre del Cliente"
                                name='username'
                                value={username}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>
                        <Grid item xs={3} sm={4} md={4}  >
                            <TextField
                                id="tipo_garantia"
                                label="Tipo de Garantia :"
                                placeholder="Tipo de Garantia"
                                name='tipo_garantia'
                            
                            />

                        </Grid>
                        <Grid item xs={3} sm={4} md={4} >
                            <TextField
                                id="username"
                                label="Valor del Préstamo :"
                                placeholder="Valor del Préstamo"
                                name='username'
                                value={'xx'}
                                onChange={e => handleChange(e)}

                                disabled={disable}
                            />
                        </Grid>

                    </Grid>
                    
      <TableCredito vp={credito.data.attributes.valor_prestamo} cp={credito.data.attributes.cuotas_pagar} ir={credito.data.attributes.tasa_mes_vcdo / 100} cf={PMT(credito.data.attributes.tasa_mes_vcdo / 100, credito.data.attributes.cuotas_pagar, credito.data.attributes.valor_prestamo).toFixed(1)} />
     
    </Box>
    <Divider variant="middle" className={styles.main} />
        <footer className={styles.footer}>
            <a
                href="https://eco2.com.co"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{'   '} ECO²
                {/* <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span> */}
            </a>
        </footer>

        <Link href="/inversion">
            <button>Volver a Mis Inversiones</button>
        </Link> 
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
      console.log(credito);
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