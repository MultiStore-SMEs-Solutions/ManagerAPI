/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import MainCard from './MainCard'
import MonthlyBarChart from './MonthlyBarChart'

// material-ui
import {
    Box,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors'

import styles from "./Graphic.module.css"


const Graphic = ({ total, values, dates }) => {

    const [_, setState] = useState()
    
    useEffect(() => {
        setState({});
    }, [total, values, dates]);

    return (
        <div className={styles.container}>

        <Grid>
                <Grid item xs={12} md={5} lg={4}>
                {/* <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Income Overview</Typography>
                    </Grid>
                    <Grid item />
                </Grid> */}
                <MainCard sx={{ mt: 2 }} content={false} >
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" sx={{ color: grey[700]}}>

                                Grafico de ventas

                            </Typography>
                            <Typography variant="h3"  sx={{ color: grey[700]}}>{`$${total}`}</Typography>
                        </Stack>
                    </Box>
                        <MonthlyBarChart values={values} dates={dates} />
                </MainCard>
            </Grid>
        </Grid>
        </div>
    )
}

export default Graphic 