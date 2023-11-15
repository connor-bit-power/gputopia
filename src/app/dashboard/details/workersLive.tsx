// import styles from '@/components/dashboard/dashboard.module.css';
import { NextPage } from 'next';
import { BackgroundImage } from '@/components/background-image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import {
  ExternalLink,
  TypographyH1 as H1,
  TypographyH2 as H2,
  TypographyH3 as H3,
  TypographyP as P
} from '@/components/ui/typography';

function getGPUInfo(): string | null {
  if (typeof window === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return null;

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}

function extractGPUName(gpuString: string): string {
  const parts = gpuString.split(',');

  for (let part of parts) {
    part = part.trim();

    // This regex matches 'Apple M1' pattern, but can be extended to match others
    const match = part.match(/Apple M1|NVIDIA [\w\d]+|AMD [\w\d]+/);

    if (match) {
      return match[0];  // Return the matched GPU name
    }
  }

  // If no GPU name found, return the original string
  return gpuString;
}

const WorkerPage: NextPage = () => {
  const [workerData, setWorkerData] = useState<any[]>([]);
  const [gpuInfo, setGpuInfo] = useState<string | null>(null);

  useEffect(() => {
    const cleanGpuInfo = getGPUInfo();
    setGpuInfo(cleanGpuInfo ? extractGPUName(cleanGpuInfo) : null);
    const fetchData = async () => {
      try {
        const res = await fetch('https://queenbee.gputopia.ai/worker/detail?query=bf659aad5f70a157dac179c724b51b51');
        const data = await res.json();
        if (Array.isArray(data)) {
          setWorkerData(data);
        } else {
          setWorkerData([data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.tablecard}>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-4 py-2 text-left font-bold">GPU</th>
              <th className="px-4 py-2 text-left font-bold">Availablity</th>
              <th className="px-4 py-2 text-left font-bold">Performance (Tokens/s)</th>
              <th className="px-4 py-2 text-left font-bold">Jobs Completed</th>
            </tr>
          </thead>
          <tbody>
            {workerData.map(worker => (
              <tr key={worker.worker_version}>
                <td className="px-4 py-2 text-left">{gpuInfo}</td>
                <td className="px-4 py-2 text-left">{worker.busy ? "Busy" : "Available"}</td>
                <td className="px-4 py-2 text-left">{(1 / worker.perf).toFixed(2)}</td>
                <td className="px-4 py-2 text-left">{worker.cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default WorkerPage;
