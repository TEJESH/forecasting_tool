import React, { Component } from 'react'
import axios from 'axios'

class Diseases extends Component 
{
    constructor(props) 
    {
      super(props);
      this.state = {
        DiseaseName : [],
        selectedCountry: '',
        selectedDisease:''
      }
    }
    
    handleClick(o)
    {
      console.log("###this.state.selectedCountry###---"+this.state.selectedCountry);
      let selected_disease = o.target.value;
      if(selected_disease === "Select a Disease")
      {
        selected_disease = ""
      }
        this.setState({selectedDisease: selected_disease},
            function (
            ) {
                this.props.fUpdate(this.state.selectedDisease);
            });
    }
    

    componentDidUpdate(prevProps) 
    {
      // console.log("this.props.selectedCountry??==="+this.props.selectedCountry);

      if (prevProps.selectedCountry !== this.props.selectedCountry) 
      {
          this.setState({selectedCountry: this.props.selectedCountry})
          axios.post('/get_disease', {selected_country: this.props.selectedCountry}, {headers: {'content-type': 'application/json'}}).then((res) => {
          const DiseaseName = Array.from(res.data);
          console.log(res.data);
          this.setState({DiseaseName});
      })
  }
}

    
    render() {
        let isDisabled = !this.props.selectedCountry;
        return (
          <div>
          <select disabled={isDisabled} name="Diseases" id="Diseases" onChange={this.handleClick.bind(this)}>   
          <option>Select a Disease</option>
          {this.state.DiseaseName.map(DiseaseName => <option>{DiseaseName}</option> )}      
            </select>
          </div> 
        )
    }
  }

export default Diseases
