import React from 'react';
import Head from 'next/head';
import { Button } from '@anez/core-ui';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Button onClick={() => alert('clicked')}>Click me</Button>
      </main>
    </div>
  );
}
