import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Card, 
    Row,
    Col,
    Typography,
    Spin,
    Input,
    Select,
    Table,    
    Button
} from '@greendeck/atomic';
import axios from 'axios';
import Spinner from './Spinner';

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;
const {Title, Text} = Typography;

var tableData;
var newData;
var districtNames;
var cityNames;

class Home  extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            tableData : [],            
            searchTerm:'',
            select1:[],
            tabledata3:[],
            value:undefined,
            value2:undefined,
            value3:undefined,
            names:[]        
        }
    } 

    componentDidMount(){
        axios.get('http://localhost:3025/NGO')
        .then((response)=>{
            console.log(response.data,"response")
            newData = response.data
            if(response){
                this.setState({
                    tableData:response.data                    
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    

    handleChange = (value) => {        
        if(value === 'address' & this.state.tableData != 0) {            
            let address = this.state.tableData.map(data => data.address)            
            this.setState({
                select1:address,
                value:value,                
            })
        }
        if(value === 'claimed' & this.state.tableData != 0){            
            let claimedData = this.state.tableData.map(data => data.claimed)            
            this.setState({
                select1:claimedData,
                value:value
            }) 
        }
    }

    handleChange2 = (value) => {
        console.log(value,"handlechnage2 value")
        this.setState({
            value2 : value
        }, ()=>{            
                this.handleChange3(this.state.value2)        
        })
       
    }

    handleChange3 = (value2)=>{
        if(this.state.value == 'claimed' && value2 == 'false'){
            let newlyDisplayedData = newData.filter(data=>data.claimed == false)
            this.setState({                
                tableData: newlyDisplayedData
            }) 
        }
        if(this.state.value == 'claimed' && value2 == 'true'){
            let newlyDisplayedData = newData.filter(data=>data.claimed == true)
            this.setState({                
                tableData: newlyDisplayedData
            }) 
        }
        if(this.state.value == 'address' && value2 == 'District'){               
            this.setState({
                names:districtNames
            })    
        }
        if(this.state.value == 'address' && value2 == 'City'){             
            this.setState({
                names:cityNames
            })
        }      
    }

    handleChange4 = (value) =>{
        this.setState({
            value3 : value
        },()=>{
            this.handleChangeNew(this.state.value3)
        })
    }

    handleChangeNew = (value) =>{     
        if(this.state.value2){
            if(this.state.value && this.state.value == 'address' && this.state.value2 == 'City' && this.state.value3){             
                let DisplayedData = newData.filter(data=>data.address.city == value)
                this.setState({
                    tableData : DisplayedData
                })
            }
        }
        if(this.state.value2){
            if(this.state.value && this.state.value == 'address' && this.state.value2 == 'District' && this.state.value3){             
                let DisplayedData2 = newData.filter(data=>data.address.district == value)
                this.setState({
                    tableData : DisplayedData2
                })
            }
        }        
    }

    handleSearch = (value) => {        
        let newlyDisplayed = newData.filter(data=>data.name.includes(value))
        this.setState({
            searchTerm: value,
            tableData: newlyDisplayed
        })
    }

    handleReset = () =>{
        this.setState({
            tableData:newData,
            value2:undefined,
            value3:undefined,
            value:undefined
        })
    }
    
    render(){       
        if(this.state.tableData.length != 0){
           const tableData2 = this.state.tableData            
            tableData = tableData2.map(data => data)            
            var addressData = tableData.map(data=>data.address)          
            var array1 = addressData.map(data =>data.district)            
            var array2 = addressData.map(data =>data.city)
            districtNames = Array.from(new Set(array1));                        
            cityNames = Array.from(new Set(array2));                       
        }          
        return(
            <>
                <div className="home-page">                 
                    <Row>
                        <Col span={3} offset={0}>
                        </Col>
                        <Col span={12} offset={0}>
                             <Search
                                allowClear={true}
                                style={{width:'30rem'}}
                                placeholder="input search text"
                                enterButton="Search"
                                size="large"
                                onSearch={value => this.handleSearch(value)}
                            />
                        </Col>

                        <Col span={12} offset={3} style={{marginTop:'1rem'}}>
                         <Select
                             showSearch
                             style={{ width: 100 }}
                             placeholder="Select a Value"                                                         
                             onChange={value => this.handleChange(value)}                  
                          >
                            <Option value="address">Address</Option>
                            <Option value="claimed">Claimed</Option>                          
                            
                        </Select>                        
                            {
                                this.state.value == 'address' ? 
                                <Select
                                    showSearch
                                    style={{ width: 100 ,marginLeft:'0.5rem'}}
                                    placeholder="select"                                                         
                                    onChange={value => this.handleChange2(value)}                  
                                >             
                                    <Option value="District">District</Option>     
                                    <Option value="City">City</Option>                                
                              
                            
                                </Select> : this.state.value == 'claimed' ? 
                                <Select
                                    showSearch
                                    style={{ width: 100, marginLeft:'0.5rem' }}
                                    placeholder="select"                                                         
                                    onChange={value => this.handleChange2(value)}                  
                                >      
                                    <Option value="true">Yes</Option>     
                                    <Option value="false">No</Option>              
                       
                                </Select> : null
                            }                        

                            {
                                this.state.value2 == 'District' ? 
                                <Select
                                    showSearch
                                    style={{ width: 100, marginLeft:'0.5rem' }}
                                    placeholder="select"                                                         
                                    onChange={value => this.handleChange4(value)}                  
                                >    
                                {
                                    this.state.value2 ? this.state.names.map(data=>                                
                                    <Option value={data}>{data}</Option>                                
                                ) : null
                                }    
                                </Select> : this.state.value2 == 'City' ? 
                                <Select
                                    showSearch
                                    style={{ width: 100, marginLeft:'0.5rem' }}
                                    placeholder="select"                                                         
                                    onChange={value => this.handleChange4(value)}                  
                                >                            
                                    {
                                        this.state.value2 ? this.state.names.map(data=>                                
                                        <Option value={data}>{data}</Option>                                
                                    ) : null
                                    }                       
                                </Select> : null
                            }
                            <Button onClick={this.handleReset} style={{marginLeft:'1rem'}} >
                                Reset
                            </Button>
                        </Col>                      
                    </Row>
                    <br/>
                    <br/>
                        {
                            this.state.tableData.length == 0 ? <Spinner/> : 
                            <>
                           <Row>
                            <Col span={3}>
                            </Col>
                            <Col>
                            <Table 
                                scroll={{ x: 500 }}
                                style={{width:"60rem"}}
                                pagination={false}
                                dataSource={this.state.tableData  ? this.state.tableData : null}
                            >
                                   <Column
                                       title={<Title level={6} >NGO Logo</Title>}             
                                       width={100}
                                       render={data=>
                                          <span>                                           
                                           <img height='40rem' src={data.logoURL}/>
                                          </span>
                                        }
                                       sorter={true}
                                   />    
                                   <Column
                                       title={<Title level={6} >NGO Name</Title>} 
                                       width={100}
                                       render={data=>
                                          <span>
                                           {data.name}
                                          </span>
                                        }
                                       sorter={true}
                                   />
                                   <Column
                                       title={<Title level={6} >NGO Email_Id</Title>}                 
                                       width={100}
                                       render={data=>
                                          <span>
                                           {data.email}
                                          </span>
                                        }
                                       sorter={true}
                                   />
                                   <Column
                                       title={<Title level={6} >NGO Address</Title>}               
                                       width={100}
                                       render={data=>
                                          <span>
                                           City - <Text strong>{ data.address && data.address.city}</Text>, 
                                           District - <Text strong>{ data.address && data.address.district}</Text>,
                                           Address Line 1 - { data.address && data.address.line_1}, <br/>
                                           Address line 2 - { data.address && data.address.line_2},
                                           Pincode - { data.address && data.address.pinCode}
                                          </span>                                          
                                        }
                                       sorter={true}
                                   />
                                   <Column
                                       title={<Title level={6} >Claim Status for Foreign Funding</Title>}               
                                       width={100}
                                       render={data=>
                                          <span>
                                           {data.claimed == true ? 'Claim Successful' : 'Not Claimed'}
                                          </span>
                                        }
                                       sorter={true}
                                   />
                                   <Column
                                       title={<Title level={6} >Actions</Title>}               
                                       width={100}
                                       render={data=>
                                          <>
                                          {
                                            data.claimed == true ? 
                                              <Button type='primary'>
                                                <Link to={`details/${data._id}`}>View details</Link>
                                              </Button>
                                              : <Button type='secondary'>
                                                <Link to={`claim/${data._id}`}>Claim</Link>                                              
                                             </Button>
                                          }
                                          </>
                                        }
                                       sorter={true}
                                   />
                             </Table>
                            </Col>
                        </Row>
                            </>
                        }
                </div>            
            </>
        )
    }
}

export default Home

