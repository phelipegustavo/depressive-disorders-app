import React, { Component } from "react";

import { api, headers } from '../../../constants';

import {
  ListItemAvatar,
} from '@material-ui/core';

import FlagIcon from '../../Common/Flag/FlagIcon';

import InfiniteScroll from "../../Common/List/InfiniteScroll";

export default class CountryList extends Component {

  state = {
    countries: [],
    loading: false,
    search: '',
    debounce: null,
    keyword: {},
  }

  componentDidMount() {
    this.getData();
  }

  async getData(e) {

    this.setState({ loading: true })
    const url = api(`countries`)
    const res = await fetch(url, headers);
    const { countries } = await res.json();

    this.setState({
      countries,
      loading: false
    });
  }

  onSearch(e) {
    const search = e.target.value;
    this.setState({ search });
  }

  render() {
    return (
      <InfiniteScroll
        items={this.state.countries.filter(({ name }) => (
          new RegExp(`.*${this.state.search}.*`, 'gi')).test(name)
        )}
        onSearch={this.onSearch.bind(this)}
        isLoading={this.state.loading}
        style={{ minWidth: '350px' }}
        height="70vh"
        primary={({ name }) => name}
        selected={(item) => this.props.selected && item._id === this.props.selected._id}
        onSelect={this.props.onSelect}
        secondary={({ keywords }) => keywords}
        avatar={({ code }) => (
          <ListItemAvatar>
            <FlagIcon code={code.toLowerCase()} size="2x" />
          </ListItemAvatar>
        )}
      />
    )
  }
}