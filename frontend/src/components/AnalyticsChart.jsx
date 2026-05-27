import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 11 } } },
  },
};

export const DailyClicksChart = ({ dailyTrends = [] }) => {
  const labels = dailyTrends.map((d) => {
    const dt = new Date(d.date);
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: dailyTrends.map((d) => d.clicks),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="h-[220px]">
      <Line data={data} options={defaultOptions} />
    </div>
  );
};

export const BrowserChart = ({ browsers = [] }) => {
  if (!browsers.length) {
    return <p className="text-sm text-slate-400 py-8 text-center">No browser data yet</p>;
  }

  const data = {
    labels: browsers.map((b) => b.name),
    datasets: [
      {
        data: browsers.map((b) => b.count),
        backgroundColor: ['#3b82f6', '#64748b', '#94a3b8', '#cbd5e1', '#1e293b'],
      },
    ],
  };

  return (
    <div className="h-[180px] flex justify-center">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } } },
        }}
      />
    </div>
  );
};

export const DeviceBarChart = ({ devices = [] }) => {
  const data = {
    labels: devices.map((d) => d.name),
    datasets: [
      {
        data: devices.map((d) => d.count),
        backgroundColor: '#475569',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="h-[160px]">
      <Bar
        data={data}
        options={{
          ...defaultOptions,
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true, ticks: { stepSize: 1 } },
            y: { grid: { display: false } },
          },
        }}
      />
    </div>
  );
};
