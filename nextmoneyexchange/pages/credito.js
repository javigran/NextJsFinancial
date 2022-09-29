import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Protected.module.css';
import { signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button';

export default function Credito() {
  const {data:session} = useSession();

  return (
    <div className={styles.container}>
     <main className={styles.main}>
     <h1 className={styles.title}>
        ¡Hola, {session.user.name}
        </h1>
      
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
  const session = await getSession(context);
  console.log("Retorne session"+ JSON.stringify(session))
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};