import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Protected.module.css';
import { signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';


export default function Protected() {
  const {data:session} = useSession();
    console.log("Data Use Session " + session);
  return (
    <div className={styles.container}>
     <main className={styles.main}>
     <h1 className={styles.title}>
        ¡Hola, {session.user.name} 
        </h1>
      
        <h2 className={styles.grid}>
        TU saldo : 
        </h2>
        <p>Valor disponible para solicitar o reinvertir .</p>
        <div className={styles.grid}>
         <div className={styles.card}> 
         <Link href="/credito" >
                <Typography textAlign="center" variant="h5" component="div" >Mis créditos &rarr;</Typography>
         </Link>
         </div>
         <div className={styles.card}> 
         <Link href="/inversion" >
                <Typography textAlign="center" variant="h5" component="div" >Mis Inversiones &rarr;</Typography>
         </Link>
         </div>
        
       
         

          <a href="https://" className={styles.card}>
            <h2>Invertir &rarr;</h2> </a>

          <a href="https://" className={styles.card} >
            <h2>Solicitar &rarr;</h2>  </a>
        </div>
        <p>Gana buenos rendimientos prestándole a personas con buen historial crediticio y capacidad de pago comprobada.</p>
      </main>

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
   
      <Link href="/">
        <button>Back to home page</button>
      </Link>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  //const session = await getSession(context);
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;
  const session = await getSession(context);
  console.log("Retorne session"+ JSON.stringify(session))

  let user = null;
  // Check if session exists or not, if not, redirect

  if (session?.jwt) {
    try {
      // console.log("Entre aqui " + strapiToken);
      const { data } = await axios.get(`${strapiUrl}/api/users/` + session.id + '?populate=%2A', {
        headers: {
          Authorization:
            `Bearer ${strapiToken}`,
        },
      });
      user = data;
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {

      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      user,
      session
    }
  }
};