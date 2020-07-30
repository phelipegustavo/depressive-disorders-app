import React, { Component } from "react";

import { 
  Box,
} from '@material-ui/core'

import KeywordList from './KeywordList';
import CountryList from './CountryList';

export default class Layout extends Component {

  state = {
    selected: null
  }

  render() {
    return(
      <Box
        display="flex"
        alignItems="start"
        justifyContent="space-around" 
        height="100%"
        width="100%"
        flexWrap="wrap"
        flexGrow="1"
        p={1}
      >
        <CountryList selected={this.state.selected} onSelect={(e, selected) => this.setState({ selected })} />
        <KeywordList country={this.state.selected} />
      </Box>
    );
  }
}