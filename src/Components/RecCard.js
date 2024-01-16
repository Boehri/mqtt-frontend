import { CardContent, Card, Stack } from '@mui/material';

const RecCard = ({rec}) => {
    return (
        <Card>
            <CardContent>
                <Stack>
                    {rec}
                </Stack>
            </CardContent>
        </Card>
    );
    };


export default RecCard;