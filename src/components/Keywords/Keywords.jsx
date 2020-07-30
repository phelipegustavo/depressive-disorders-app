import React, { Component } from "react";

import {
    Box,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core'

import { Trans } from 'react-i18next';

import KeywordLayout from './KeywordLayout/Layout';
import CountryLayout from './CountryLayout/Layout';

export default class Keywords extends Component {

    state = {
        layout: 1,
    }

    handleLayout = (e) => {
        const layout = e.target.value;
        this.setState({ layout });
    }

    render() {
        return (
            <Box
                display="flex"
                alignItems="start"
                justifyContent="space-around" 
                height="100%"
                width="100%"
                flexDirection="column"
            >
                <Box
                    display="flex"
                    alignItems="start"
                    justifyContent="space-around" 
                    height="100%"
                    width="100%"
                    flexShrink="10"
                    p={1}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h5"
                        style={{ padding: '30px', flexGrow: 1 }}
                    >
                        <Trans i18nKey="Keywords"/> 
                    </Typography>
                    <FormControl variant="outlined" style={{ minWidth: '320px', margin: '5px', padding: '10px' }}>
                        <InputLabel id="demo-simple-select-outlined-label">Modo de visualização</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={this.state.layout}
                            onChange={this.handleLayout}
                            label="Visualização"
                        >
                            <MenuItem value={1}>Por país</MenuItem>
                            <MenuItem value={2}>Por palavra chave</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                { this.state.layout === 1 && <CountryLayout /> }
                { this.state.layout === 2 && <KeywordLayout /> }
            </Box>
        )
    }
}