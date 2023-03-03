import Head from 'next/head';
import styles from '../../styles/SignIn.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import logo from "../../public/login.png";
import Image from 'next/image';
import { Container } from '@mui/material';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)
    //console.log(result); 
    router.replace('/protected'); 
    if (result?.error) {
      setError(result.error)
    }

  };


  return (
    <Container>

    
    <div className={styles.container}>
      <Head>
        <title>FI</title>
      </Head>
      <Grid container spacing={2} style={{ marginTop: '2%' }}>
      <Grid item xs={12} sm={12} md={6} lg={6} >
      <Image src={logo}   alt="Fi Tech!" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} spacing={0}>
      <h1 style={{color:'#1976d2'}}>Inicio de Sesion</h1>
      <form className={styles.form} onSubmit={onSubmit}>
      {error && <p>{error}</p>}
        <label htmlFor="email">Email</label>
        <input 
         type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)} 
        className={styles.input} />
        <label
          style={{
            marginTop: 10,
          }}
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.input}
        />
          <a
            href="https://www.fi-fintech.com/index.php/registrate-2/"
            
          >
            <h4>¿Aún no estas registrado? &rarr;</h4>
          </a>
        <Button
          className={styles.button}
          style={{
            marginTop: 15,
          }}
          type="submit"
          disabled={isLoading}
          variant="contained"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
          </Button>


      </form>

    
      </Grid>
    
      </Grid>
      
       
    
    </div>
    </Container>
  );
}