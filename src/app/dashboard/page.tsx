// /app/dashboard/page.tsx
'use client'
import styles from '@/app/dashboard/details/dashboard.module.css';
import { NextPage } from 'next';
import Dashboard, { useWorkerDetails } from '@/app/dashboard/details/networkLive';
import { BackgroundImage } from '@/components/background-image'


const DashboardPage: NextPage = () => {
  return (

    <main className={styles.mainContent}>

    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-grow justify-center">
        <BackgroundImage />
      <div className="container mx-auto p-4">
        <Dashboard />
      </div>
      </div>
      </div>

</main>
  );
}

export default DashboardPage;