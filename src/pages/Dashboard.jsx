import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Box, Button, Card, CardContent, CardActionArea } from '@mui/material';
import {
    AppOrderTimeline,
} from '../sections/@dashboard/app';

export default function Dashboard() {
    const [isInput, setInput] = useState()
    const [isValues, setValues] = useState([])
    const selectNumber = (e) => {

        e.preventDefault();
        const params = getPermutations(isInput)
        const newParams = []
        params.forEach(element => {
            const idx = newParams.findIndex((item) => item === element)
            if (idx === -1) {
                newParams.push(element)
            }
        });
        setValues(newParams)
    }

    function getPermutations(input) {
        if (input.length <= 1) {
            return [input];
        }
        let character = input[0];
        let returnArray = [];
        let subPermutes = getPermutations(input.slice(1));
        // debugOutput('Returned array: ' + subPermutes);
        for (let subPermuteIndex = 0; subPermuteIndex < subPermutes.length; subPermuteIndex++) {
            let subPermute = subPermutes[subPermuteIndex];
            for (let charIndex = 0; charIndex <= subPermute.length; charIndex++) {
                let pre = subPermute.slice(0, charIndex);
                let post = subPermute.slice(charIndex);
                returnArray.push(pre + character + post);
                // debugOutput(pre + '_' + character + '_' + post);
            }
        }
        return returnArray;
    }

    return (
        <Container maxWidth="xl">
            <Typography letiant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back
            </Typography>
            <form onSubmit={selectNumber}>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        display: 'flex',
                    }}
                >

                    <TextField fullWidth label="กรอกตัวเลขที่ต้องการ" id="username" name="username" type='number' onChange={(e) => setInput(e.target.value)} />
                    <Button letiant="outlined" type='submit'>ค้นหา</Button>
                </Box>
            </form>
            <Grid container spacing={3}>
                <Grid item xs={12} mt={2}>
                    จำนวนตัวเลขทั้งหมด {isValues.length}
                </Grid>

                {isValues.map((item, index) => (
                    <Grid item xs={6} md={6} lg={4} key={index}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

            </Grid>

        </Container>
    )
}
