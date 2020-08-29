import React, { Component } from 'react'
import Countries from './Components/Countries';
import Diseases from './Components/Diseases';
import Drugs from './Components/Drugs';
import Company from './Components/Company';

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        selectedCountry : "",
        selectedDisease : "",
        selectedDrugs : "",
        selectedCompany : ""
      }
    }

    updateSelectedCountry(selectedCountry){
      this.setState({
        selectedCountry: selectedCountry,
        selectedDisease : "",
        selectedDrugs : "",
        selectedCompany : "",
      },
      function (
      ) {
          console.log('selectedCountryParent', this.state.selectedCountry)
      });

}

    updateSelectedDisease(selectedDisease){
      this.setState({
        selectedDisease: selectedDisease,
        selectedDrugs : "",
        selectedCompany : ""
      },
      function (
      ) {
          console.log('selectedDiseaseParent', this.state.selectedDisease)
      });

}
    updateSelectedDrugs(selectedDrugs){
      this.setState({
        selectedDrugs: selectedDrugs,
        selectedCompany : ""
      },
      function (
      ) {
          console.log('selectedDrugParent', this.state.selectedDrugs)
      });

}
  

    updateSelectedCompany(selectedCompany){
      this.setState({selectedCompany: selectedCompany
    },
    function (
    ) {
        console.log('selectedCompanyParent', this.state.selectedCompany)
    });

}

    render() {
      return (
        <div>
          <Countries fUpdate={this.updateSelectedCountry.bind(this)}/>
          <Diseases selectedCountry={this.state.selectedCountry} fUpdate={this.updateSelectedDisease.bind(this)}/>
          <Drugs selectedDisease={this.state.selectedDisease} fUpdate={this.updateSelectedDrugs.bind(this)}/>
          <Company selectedDrugs={this.state.selectedDrugs} fUpdate={this.updateSelectedCompany.bind(this)}/>
        </div>
      )
    }
  }

export default App
