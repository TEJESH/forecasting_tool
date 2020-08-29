import React, {Component} from 'react'
import axios from 'axios'

class Company extends Component {

    constructor(props) {
        super(props);
        this.state = {
          CompanyName : [],
          selectedCompany:''

        }
      }

      handleClick(o){
        let selected_drug = o.target.value;
        console.log("selected_drug="+o.target.value)
        if(selected_drug === "Select a Drug"){
          selected_drug = ""
        }
        this.setState({selectedCompany: selected_drug},
            function (
            ) {
                this.props.fUpdate(this.state.selectedCompany);
            });
    }
    componentDidUpdate(prevProps) {
      console.log("---"+prevProps.selectedDisease);
      console.log("---"+prevProps.selectedDrugs);
      if (prevProps.selectedDrugs !== this.props.selectedDrugs) {
          axios.post('/get_company', {selected_drug: this.props.selectedDrugs}, {headers: {'content-type': 'application/json'}}).then((res) => {
          const CompanyName = Array.from(res.data);
          console.log(res.data);
          this.setState({CompanyName});
      })
    }
    }
    
   
    
    render() {
    
        let isDisabled = !this.props.selectedDrugs;
        return (
          <div>
            <select disabled={isDisabled} name="Companies" id="Companies" onChange={this.handleClick.bind(this)}>
            <option>Select a Company</option>
            {this.state.CompanyName.map(CompanyName => <option>{CompanyName}</option> )}      
            </select>
          </div> 
        )
    }
}
export default Company
