'use client'
import styles from '@/app/dashboard/details/dashboard.module.css';
import { NextPage } from 'next';
import { BackgroundImage } from '@/components/background-image'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {  Table,  TableBody,  TableCaption,  TableCell,  TableHead,  TableHeader,  TableRow, } from "@/components/ui/table";
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import WorkerPage from '@/app/dashboard/details/workersLive';
import { BarChartIcon } from '@radix-ui/react-icons'
import {
    ExternalLink,
    TypographyH1 as H1,
    TypographyH2 as H2,
    TypographyH3 as H3,
    TypographyP as P
  } from '@/components/ui/typography'




const DashboardPage: NextPage = () => {
    const [workerData, setWorkerData] = useState([]);
    const [status, setStatus] = useState("Offline");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://queenbee.gputopia.ai/worker/detail?query=0c89e56b18241d5d502321f7563d1b3c');
          const data = await res.json();
          if (data && Object.keys(data).length > 0) { 
              setStatus("Online");
              if (Array.isArray(data)) {
                  setWorkerData(data);
              } else {
                  setWorkerData([data]); // wrap the object in an array
              }
          } else {
              setStatus("Offline");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
  }, []); 
  
  if (status === "Offline") {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <BackgroundImage/>
          <P>Load a model to connect your GPU</P>
        </div>
      );
  }
  
  
  
  return (
    
<div>
        
    <div className={styles.subheaderText}>
    <H1>Worker Stats</H1> 
    </div>
    <div className={styles.titleLine}></div>

    <Alert className="mx-auto max-w-4xl px-6 py-3 bg-[#131313] mt-2.5 -mb-5"> 
    <BarChartIcon className="h-8 w-8 mr-4" />
    <AlertTitle className="ml-2 text-lg mb-2">Welcome To The Worker Stats Dashboard!</AlertTitle>
    <AlertDescription className="ml-2 text-muted-foreground mt-0">
       Here you will be able to monitor your connection, availablitiy and performance live. If you have feedback or anything you'd like to see added here please 
       let us know in our {' '}
        <ExternalLink className="text-cyan-500" href="https://discord.gg/EghVD49u">
           <u> Discord!</u>
        </ExternalLink>{' '}
        (Feature still under development, "Jobs Completed" will likely show an incorrect value.)
    </AlertDescription>
    </Alert>


    <main className={styles.mainContent}>
        <BackgroundImage/>

        {workerData.map(worker => (
    <div className={styles.workercard}>
        <div className={styles.cardContent}>
            <div className={styles.cardSection}>
                <div className={styles.statsHeader}><u><p>Worker</p></u></div>
                <span className={styles.bigNumber}>{status}</span>
                <span className={styles.mutedText}>{status ? 'You are connected to the GPUtopia network' : 'Disconnected'}</span>
            </div>
            <div className={styles.centerLine}></div>
            <div className={styles.cardSection}>
                <div className={styles.statsHeader}><u><p>Status</p></u></div>
                <span className={styles.bigNumber}>{worker.busy ? 'Busy' : 'Available'}</span>
                <span className={styles.mutedText}>{worker.busy ? 'Your GPU is busy running a model!' : 'Your GPU is ready and waiting for a job to complete'}</span>
            </div>
        </div>
    </div>
))}


        <div>

        {workerData.map(worker => (
        <div key={worker.worker_version} className={styles.statscard}>
        <div className={styles.cardContent}>
            <div><H3>GPUs Connected</H3></div>
            <span className={styles.statNumber}>{worker.gpu_cnt}</span>
        </div>
        </div>))}

        {workerData.map(worker => (
        <div key={worker.worker_version} className={styles.statscard}>
        <div className={styles.cardContent}>
        <div><H3>Connection Type</H3></div>
            <span className={styles.statNumber}>{worker.worker_version === 'web' ? 'Browser' : worker.worker_version}</span>
        </div>
        </div> ))}

        </div>

        <div>

        {workerData.map(worker => (
        <div key={worker.worker_version} className={styles.statscard}>
        <div className={styles.cardContent}>
        <div><H3>Performance</H3></div>
        <div><P>(Tokens Per Second)</P></div>
            <span className={styles.statNumber}>{(1 / worker.perf).toFixed(2)}</span>
        </div>
        </div> ))}
        
        {workerData.map(worker => (
        <div key={worker.worker_version} className={styles.statscard}>
        <div className={styles.cardContent}>
        <div><H3>Jobs Completed</H3></div>
            <span className={styles.statNumber}>{worker.cnt}</span>
        </div>
        </div> ))}
        
        </div>


       <WorkerPage/>


    </main>

    </div>
  );
}



export default DashboardPage;