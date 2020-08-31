import React, { Component } from 'react'
import axios from 'axios'

class Countries extends Component {

    constructor(props) {
      super(props);
      this.state = {
        countryName : [],
        selectedCountry: ''
      }
    }

    handleClick(o){
      
      let selected_country = o.target.value;
      if(selected_country === "Select a Country"){
        selected_country = ""
      }
        this.setState({selectedCountry: selected_country},
            function (
            ) {
                this.props.fUpdate(this.state.selectedCountry);
            });
    }

    componentDidMount(){
        axios.get('/country').then((res) => {
          const countryName = res.data;
          this.setState({ countryName});
        })
    }
  

    render() {
      return (
        <div>
          <select name="Countries" id="Countries"  onChange={this.handleClick.bind(this)}>
          <option>Select a Country</option>
          {this.state.countryName.map(countryName => <option>{countryName}</option> )}       
          </select>
        </div> 
      )
    }
}

export default Countries



