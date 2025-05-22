import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const BaseCard = ({heading,text,...props}) => {
    return (
        <Card variant="outlined" {...props} >
            <CardContent>
                <Typography className='text-lg'>{heading}</Typography>
                <Typography className='text-[10px]' variant="body2">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BaseCard