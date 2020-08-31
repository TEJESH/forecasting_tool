import React, {Component} from 'react'
import axios from 'axios'

class Company extends Component {

    constructor(props) {
        super(props);
        this.state = {
          CompanyName : [],
          selectedCountry: '',
          selectedDisease:'',
          selectedDrugs:'',
          selectedCompany:''

        }
      }

      handleClick(o)
      {
        let selected_company = o.target.value;
        if(selected_company === "Select a Company")
        {
          selected_company = ""
        }
        this.setState({selectedCompany: selected_company},
            function (
            ) {
                this.props.fUpdate(this.state.selectedCompany);
            });
    }
    componentDidUpdate(prevProps) 
    {
      console.log("selectedCountry====>>>>---"+this.props.selectedCountry);
      console.log("selectedDisease====>>>>---"+this.props.selectedDisease);
      console.log("selectedDrugs====>>>>---"+this.props.selectedDrugs);
      console.log("selectedCompany====>>>>---"+this.props.selectedCompany);
      if (prevProps.selectedDrugs !== this.props.selectedDrugs) {
          axios.post('/get_company', {selected_country:this.props.selectedCountry,selected_disease: this.props.selectedDisease,selected_drug: this.props.selectedDrugs}, {headers: {'content-type': 'application/json'}}).then((res) => {
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
            {/* {console.log("----1111")} */}
            <option>Select a Company</option>
            {this.state.CompanyName.map(CompanyName => <option>{CompanyName}</option> )}      
            </select>
          </div> 
        )
    }
}
export default Company
