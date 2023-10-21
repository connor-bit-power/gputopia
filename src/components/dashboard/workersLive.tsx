// /components/dashboard/page.client.tsx
'use client'
import styles from '@/components/dashboard/dashboard.module.css';
import { useEffect, useState } from 'react';
import { BackgroundImage } from '@/components/background-image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {  Table,  TableBody,  TableCaption,  TableCell,  TableHead,  TableHeader,  TableRow, } from "@/components/ui/table";
import PuffLoader from "react-spinners/PuffLoader";


// Custom Hook for Data Fetching
function useWorkerDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workerCount, setWorkerCount] = useState(0);
  const [gpuCount, setgpuCount] = useState(0);

  useEffect(() => {
    const fetchData = () => {
    fetch('https://queenbee.gputopia.ai/worker/detail')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        console.log("Fetched Data:", data);

          if (Array.isArray(data)) {


          // Set the worker count
          setWorkerCount(data.length);

          // Calculate and set the GPU count
          const totalGpuCount = data.reduce((acc, worker) => acc + worker.gpu_cnt, 0);
          setgpuCount(totalGpuCount);
          

        }

        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    };
    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);


  }, 
  
  []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

<div>
      <header className={styles.headerText}>
        GPUtopia Network Live  
        <PuffLoader color= "#00ff44" size={30} />
      </header>


    <main className={styles.mainContent}>

    <div className={styles.card}>
      <div className={styles.cardContent}>
        <span className={styles.bigNumber}> {workerCount} </span>
        <div className={styles.percentage}>Workers Online</div>
      </div>
    </div>


    <div className={styles.card}>
      <div className={styles.cardContent}>
        <span className={styles.bigNumber}> {gpuCount} </span>
        <div className={styles.percentage}>GPUs Running</div>
      </div>
    </div>




  <div className={styles.tablecard}>
    <Table>
      <TableCaption>Worker Details</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Availablity</TableHead>
          <TableHead>Worker Version</TableHead>
          <TableHead>GPUs Connected</TableHead>
          <TableHead>Performance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((worker, index) => (
          <TableRow key={index}>
            <TableCell>{worker.busy ? 'Yes' : 'Available'}</TableCell>
            <TableCell>{worker.worker_version}</TableCell>
            <TableCell>{worker.gpu_cnt}</TableCell>
            <TableCell>{worker.perf}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    </div>
    </main>

    </div>
  );
}

export default useWorkerDetails;
