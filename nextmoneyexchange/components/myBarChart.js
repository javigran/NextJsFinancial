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
   //console.log(JSON.stringify(data));
   const datasets= [];

 
    const chartData = {
        labels: labels,
        
        datasets: [
          {
            label: '',
            data: data,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
              ],
          },
          
        ]
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false, // hide legend
          },
          title: {
            display: true,
            text: 'ID Credito'
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
              },
            },
          ],
          
          y: {
            beginAtZero: true
          }
        }
      };
    
    
      return <Bar data={chartData} options={chartOptions} />;
    };

export default MyBarChart;