import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Protected.module.css';
import { signOut, useSession } from 'next-auth/react'
import Button from '@material-ui/core/Button';
export default function Protected() {
  const {data:session} = useSession();

  return (
    <div className={styles.container}>
     <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Financial Intelligence</a> 
        </h1>
        {
          session && (
            <h1>{session.user.name}</h1>
          )
        }
        
      
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
          <h2>Documentación &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
       
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
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