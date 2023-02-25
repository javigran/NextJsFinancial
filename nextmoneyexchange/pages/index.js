
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'
import RegisterComponent from '../components/register';
import { signOut, useSession } from 'next-auth/react'
import { Grid } from '@mui/material';

export default function Home() {
  const {data:session} = useSession();
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>
        Bienvenido a <a href="https://www.fi-fintech.com/">FI Inteligencia Fianciera</a>
      </h1>
        {/* <Button style={{backgroundColor:'#0070f3',color:'white'}} href="#user_register_section" variant="contained">Comenzar</Button> */}
      
    
        <Grid container spacing={1}>
         <Grid item xs={12} sm={12} md={6} lg={6} className={styles.card}>
         <a href="https://" >
          <h2>Invierte  &rarr;</h2>
            <p>Encuentre información detallada sobre la forma de Invertir con Nosotrso</p>
          </a>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6} className={styles.card}>
         <a href="https://www.fi-fintech.com/index.php/invertir/" >
            <h2>Invierte en préstamos de persona a persona &rarr;</h2>
            <p>Gana buenos rendimientos prestándole a personas con buen historial crediticio y capacidad de pago comprobada.</p>
          </a>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6}  className={styles.card}>
         <a
            href="https://www.fi-fintech.com/index.php/solicita-credito/"
           
          >
            <h2>Simula tu préstamo &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6} className={styles.card}>
         <a
            href="https://"
            
          >
            <h2>¿CÓMO FUNCIONA? &rarr;</h2>
            <p>
            Conectamos directamente a personas que necesitan un préstamo con personas que quieren invertir su dinero.
            </p>
          </a>
         </Grid>
        </Grid>
  

     

      

      
         
      </main>
      <div id="user_register_section">


      {/* {
        !session && <RegisterComponent/>
      } */}
      </div>
       <footer className={styles.footer}>
        <a
          // href="https://eco2.com.co"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          {/* Powered by{'   '} ECO² */}
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer> 

      </div>
     
  )
}
  