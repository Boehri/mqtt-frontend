import PropTypes from 'prop-types';
import {Avatar, Card, CardContent, Stack, SvgIcon, Typography, Skeleton} from '@mui/material';

const ValueCard = (props) => {
  const {title, unit, color, value, icon, avgValue} = props;

  return (
    <Card sx={{ height: '150px' }}>
      <CardContent>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={3}>
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              {title}
            </Typography>
            {value ? (
              <Typography fontSize='30pt' color='text.secondary' sx={{textAlign: 'center', paddingTop: value ? '0' : '40px'}}>
                {value}
                {unit}
              </Typography>
            ) : (
              <Skeleton variant='text' width={100} height={70} animation='wave' />
            )}
          </Stack>

          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56,
            }}>
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
        {avgValue && (
          <Stack alignItems='center' direction='row' spacing={1}>
            <Stack alignItems='center' direction='row' spacing={0.5}>
              <Typography color='text.secondary' variant='body1'>
                {avgValue} {unit}
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='caption'>
              average last 7 days
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

ValueCard.prototypes = {
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ValueCard;