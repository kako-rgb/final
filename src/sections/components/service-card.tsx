import { SERVICE } from '@/utils/types'
import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface SERVICE_CARD_PROPS {
    service: SERVICE
}

const ServiceCard = ({ service }: SERVICE_CARD_PROPS) => {
    // Add null check for service
    if (!service) return null;

    // Add safe default values and null checking
    const serviceImage = service.media?.[0]?.link || '/images/default-service.png';
    const pricingType = service.pricing?.type || 'fixed';
    const price = service.pricing?.price || 0;
    const duration = service.pricing?.duration || null;

    const displayPrice = `Ksh ${price.toLocaleString('en-US', { 
        maximumFractionDigits: 2, 
        minimumFractionDigits: 0 
    })}${pricingType === 'hourly' ? '/hr' : ''}`;

    return (
        <Card variant='outlined'>
            <CardActionArea LinkComponent={Link} href={`/service/${service.slug}`}>
                <CardMedia
                    component='div'
                    sx={{ 
                        height: '200px',
                        backgroundImage: `url('${serviceImage}')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <CardContent>
                    <Stack gap={1}>
                        <Typography variant='h6' fontWeight={600}>{service.name || 'Unnamed Service'}</Typography>
                        <Typography variant='body2' color='textSecondary'>
                            {service.store?.name || 'Unknown Provider'}
                        </Typography>
                        <Stack direction='row' alignItems='center' gap={1}>
                            <Typography variant='subtitle1' fontWeight={600} color='primary'>
                                {displayPrice}
                            </Typography>
                            {duration && (
                                <Typography variant='body2' color='textSecondary'>
                                    ({duration} mins)
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ServiceCard