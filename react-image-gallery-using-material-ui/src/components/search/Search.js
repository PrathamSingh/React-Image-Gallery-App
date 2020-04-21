import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageCard from '../image-card/ImageCard';
import axios from 'axios';
import ImageResults from '../image-result/ImageResults';
import noimage from '../search/noimage.gif';

class Search extends Component {
  state = {
    searchText: '',
    amount: 30,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '15975865-631de0dba19e16af7a5e55010',
    images: [],
    isLoading: false,
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&pretty=true&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => {
            this.setState({ images: res.data.hits });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  componentDidMount() {
    axios
      .get(
        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=some&image_type=photo&pretty=true&per_page=${this.state.amount}&safesearch=true`
      )
      .then((res) => {
        this.setState({ images: res.data.hits });
      })
      .catch((err) => console.log(err));
  }

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    //console.log(this.state.images);

    //if you don't want to have ImageCard file then add this code here and it'll run exactly same
    // const ImageCard = ({ image }) => {
    //   return <></>;
    // };

    const images = this.state.images;
    const isLoading = this.state.isLoading;
    return (
      <div className='container mt-50'>
        <div  mt={4}>
          <TextField
            name='searchText'
            mt={4}
            style={{marginTop: "51px"}}
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatingLabelText='Search for Images...'
            fullWidth={true}
          />
          <br />
          <SelectField
            name='amount'
            floatingLabelText='Amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
          >
            <MenuItem value={5} primaryText='5' />
            <MenuItem value={10} primaryText='10' />
            <MenuItem value={15} primaryText='15' />
            <MenuItem value={30} primaryText='30' />
            <MenuItem value={50} primaryText='50' />
          </SelectField>
          <br />
          {this.state.images.length > 0 ? (
            <ImageResults images={this.state.images} />
          ) : null}
        </div>
        {!isLoading && images.length === 0 && (
          <center>
            <img
              vspace='30'
              src={noimage}
              width='650px'
              height='451px'
              alt='noimage'
              align='middle'
            />
          </center>
        )}

        {isLoading ? (
          <h1 className='text-6xl text-center mx-auto mt-36'>Loading...</h1>
        ) : (
          // <div className='container mx-auto'>
          <div className='grid grid-cols-3 gap-4'>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
