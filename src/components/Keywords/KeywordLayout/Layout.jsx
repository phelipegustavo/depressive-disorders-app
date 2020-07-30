import React, { Component } from "react";

import { 
  Box,
} from '@material-ui/core'

import KeywordList from './KeywordList';
import CountryList from './CountryList';

export default class Layout extends Component {

  state = {
    selected: {}
  }

  render() {
    return(
      <Box
        display="flex"
        alignItems="start"
        justifyContent="space-around" 
        height="100%"
        flexWrap="wrap"
        width="100%"
        flexGrow="1"
        p={1}
      >
        <KeywordList selected={this.state.selected} onSelect={(e, selected) => this.setState({ selected })} />
        <CountryList keyword={this.state.selected}/>
      </Box>
    );
  }
}