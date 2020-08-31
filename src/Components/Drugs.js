import React, { Component } from 'react'
import axios from 'axios'

class Drugs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DrugName : [],
      selectedCountry: '',
      selectedDisease:'',
      selectedDrugs:''
    }
  }

  handleClick(o){
    let selected_drug = o.target.value;
    if(selected_drug === "Select a Drug"){
      selected_drug = ""
    }
    this.setState({selectedDrugs: selected_drug},
        function (
        ) {
            this.props.fUpdate(this.state.selectedDrugs);
        });
}
componentDidUpdate(prevProps) 
{
  // console.log("selectedCountry====>>>>---"+this.props.selectedCountry);
  if (prevProps.selectedDisease !== this.props.selectedDisease) 
  {
      axios.post('/get_drug', {selected_disease: this.props.selectedDisease,selected_country:this.props.selectedCountry}, {headers: {'content-type': 'application/json'}}).then((res) => {
      const DrugName = Array.from(res.data);
      console.log(res.data);
      this.setState({DrugName});
  })
}
}



render() {
    let isDisabled = !this.props.selectedDisease;
    return (
      <div>
        <select disabled={isDisabled} name="Drugs" id="Drugs" onChange={this.handleClick.bind(this)}>
        <option>Select a Drug</option>
        {this.state.DrugName.map(DrugName => <option>{DrugName}</option> )}      
        </select>
      </div> 
    )
  }
}

export default Drugs
