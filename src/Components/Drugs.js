import React, { Component } from 'react'
import axios from 'axios'

class Drugs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DrugName : [],
      selectedDrugs:''
    }
  }

  handleClick(o){
    let selected_disease = o.target.value;
    console.log("selected_disease="+o.target.value);
    if(selected_disease === "Select a Disease"){
      selected_disease = ""
    }
    this.setState({selectedDrugs: selected_disease},
        function (
        ) {
            this.props.fUpdate(this.state.selectedDrugs);
        });
}
componentDidUpdate(prevProps) {
  if (prevProps.selectedDisease !== this.props.selectedDisease) {
      axios.post('/get_drug', {selected_disease: this.props.selectedDisease}, {headers: {'content-type': 'application/json'}}).then((res) => {
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
