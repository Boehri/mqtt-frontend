import {CardContent, Card, Stack, Typography} from '@mui/material';

const SugCard = ({sug}) => {
  return sug ? (
    <Card>
      <CardContent>
        <Stack>
          <Typography fontSize='12pt' color='text.secondary' variant='overline'>
            Suggestion
          </Typography>
          <Typography fontSize='15pt' color='text.secondary' sx={{textAlign: 'left'}}>
            {sug}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  ) : null;
};

export default SugCard;
