import Head from 'next/head';
import styles from '../../styles/SignIn.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Grid } from '@mui/material';
import logo from "../../public/login.png";
import Image from 'next/image';
import { Container } from '@mui/material';

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if(result.ok) {
      router.replace('/protected');
      return;
    }
    alert('Credential is not valid');
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
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={styles.input} />
        <label
          style={{
            marginTop: 10,
          }}
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
        />
        <Button
          className={styles.button}
          style={{
            marginTop: 15,
          }}
          type="submit"
          variant="contained"
        >
          Login
          </Button>
      </form>
      </Grid>
    
      </Grid>
      
       
    
    </div>
    </Container>
  );
}