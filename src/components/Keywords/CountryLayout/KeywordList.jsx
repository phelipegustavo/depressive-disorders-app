import React, { Component } from 'react';

import { api, headers } from '../../../constants';

import InfiniteScroll from '../../Common/List/InfiniteScroll';

export default class KeywordList extends Component {

  state = {
    country: {},
    keywords: [],
    loading: false,
    search: '',
    page: 1,
    perPage: 20,
    debounce: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.country && props.country._id !== state.country._id) {
      return {
        page: 1,
        keywords: [],
        country: props.country
      }
    }
    return null;
  }

  async componentDidUpdate(props, state) {
      if(state.country._id !== this.state.country._id && this.state.country._id) {
        await this.getData(false, this.state.country)
      } 
  }

  componentDidMount() {
    this.setState({ loading: 'NO_DATA' })
    this.getData(false, this.state.country);
  }

  async onScroll(e) {
    if (this.state.loading) return;
    const top = e.target.scrollTop;
    const height = e.target.scrollHeight;
    const bottom = height - top;
    if (e.target.clientHeight / bottom * 100 >= 40) {
      const page = this.state.page + 1;
      this.setState({
        page,
        loading: 'MORE'
      }, async () => await this.getData(e, this.state.country));
    }
  }

  async getData(e, country) {
    if(!country || !country.code) {
      return this.setState({ 
        loading: false,
      });
    }
    const url = api(`countries/${country.code}/keywords`, {
      page: this.state.page,
      perPage: this.state.perPage,
      search: this.state.search,
    })
    const res = await fetch(url, headers);
    let data = await res.json();
    let keywords = this.state.keywords;
    if (e) {
      keywords = keywords.concat(data.keywords)
    } else {
      keywords = data.keywords;
    }
    this.setState({
      keywords,
      loading: false
    });
  }

  onSearch(e) {
    const search = e.target.value
    clearTimeout(this.state.debounce);
    const debounce = setTimeout(() => {
      this.setState({
        search,
        page: 1,
        perPage: 20,
        keywords: []
      }, async () => await this.getData(false, this.state.country));
    }, 300);
    this.setState({ debounce })
  }

  render() {
    return (
      <InfiniteScroll
        items={this.state.keywords}
        style={{ flexGrow: 1 }}
        onSearch={this.onSearch.bind(this)}
        onScroll={this.onScroll.bind(this)}
        primary={(item, i) => `(${i + 1})ª ${item.name}`}
        secondary={(item) => `${item.total} Citações`}
        onSelect={this.props.onSelect}
        height="70vh"
        isLoading={this.state.loading}
      />
    )
  }
}
