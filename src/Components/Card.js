import PropTypes from 'prop-types';
import {Avatar, Card, CardContent, Stack, SvgIcon, Typography, Skeleton} from '@mui/material';

const CardComponent = (props) => {
  const {title, unit, color, value, icon} = props;

  return (
    <Card sx={{height: '100%'}}>
      <CardContent>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={3}>
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              {title}
            </Typography>
            {value ? (
              <Typography fontSize='30pt' color='text.secondary' sx={{textAlign: 'center'}}>
                {value}
                {unit}
              </Typography>
            ) : (
              <Skeleton variant='text' width={100} height={80} animation='wave' />
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
      </CardContent>
    </Card>
  );
};

CardComponent.prototypes = {
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CardComponent;