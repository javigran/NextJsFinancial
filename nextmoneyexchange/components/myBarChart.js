import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'
  import { Bar, Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
 

const MyBarChart  = ({ data,labels}) => {
    const chartData = {
        labels: labels,
     
        datasets: [
          {
            label: "ID Credito",
            data: data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
          }
        ]
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: ''
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    
    
      return <Bar data={chartData} options={chartOptions} />;
    };

export default MyBarChart;