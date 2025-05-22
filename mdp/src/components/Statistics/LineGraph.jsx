import { LineChart } from "@mui/x-charts"


const LineGraph = ({data,dates,...props}) =>{
    return (

        <LineChart
            series={[{
                data:data,
            }
            ]}
            xAxis={[{ 
                scaleType:'time',
                valueFormatter: (date) =>date.toLocaleDateString(),
                data: dates,
                tickLabelStyle: { display: 'none' },  // Hides the tick labels
                axisLabel: null  // Removes the axis label if present
                
            }]}
            height={200}
        />
    )
}

export default LineGraph