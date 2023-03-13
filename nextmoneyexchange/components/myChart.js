import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  import { Doughnut } from 'react-chartjs-2';

const MyChart = ({ data,labels,height, width}) => {
    const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Valor credito',
            data: data,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)'
            ]
          }
        ]
      };
      // provando jh
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: ''
          },
          height: height,
          width: width
        }
      };
    
      return <Doughnut data={chartData} options={chartOptions}  />;
    };

export default MyChart;