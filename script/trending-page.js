const ctx = document.getElementById('learningChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
            label: 'Learning Activity',
            data: [20, 35, 30, 50, 65, 70, 95],
            borderColor: '#7C6CFF',
            backgroundColor: 'rgba(124,108,255,0.2)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#7C6CFF',
            pointRadius: 4
        }]
    },
    options: {
        plugins:{
            legend:{
                display:false
            }
        },
        scales:{
            x:{
                ticks:{
                    color:'#aaa'
                },
                grid:{
                    display:false
                }
            },
            y:{
                ticks:{
                    color:'#aaa'
                },
                grid:{
                    color:'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    }
});