import React, { Component } from 'react'
import axios from 'axios'

class Countries extends Component 
{

    constructor(props) {
      super(props);
      this.state = {
        countryName : [],
        selectedCountry: ''
        
      }
      // console.log("111111");
    }

    handleClick(o){
      // console.log("222222");
      let selected_country = o.target.value;
      if(selected_country == "Select a Country"){
        selected_country = ""
      }
        this.setState({selectedCountry: selected_country},
            function (
            ) {
                this.props.fUpdate(this.state.selectedCountry);
            });
    }

    componentDidMount(){
        // console.log("333333");
        axios.get('/country').then((res) => {
          const countryName = res.data;
          this.setState({ countryName});
        })
    }
  

    render() {
      console.log("444444");
      return (
        <div>
          <select name="Countries" id="Countries"  onChange={this.handleClick.bind(this)}>
          <option>Select a Country</option>
          {/* {console.log(this.state.countryName)} */}
          {this.state.countryName.map(countryName => <option>{countryName}</option> )}       
          </select>
        </div> 
      )
    }
}

export default Countries



