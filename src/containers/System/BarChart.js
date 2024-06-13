import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BarChart = () => {
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy(); // Hủy bỏ biểu đồ trước đó nếu tồn tại
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        setChartInstance(newChartInstance);

        // Phần cleanup
        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Hủy bỏ biểu đồ khi component unmount
            }
        };
    }, []); // useEffect chạy chỉ một lần sau khi component được render

    return (
        <div>
            <h2>Sales By Month</h2>
            <canvas id="myChart"></canvas>
        </div>
    );
}

export default BarChart;
