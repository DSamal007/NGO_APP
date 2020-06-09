import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert'
import { 
    Typography, 
    Button, 
    Row, 
    Col,
    Form,
    Icon,
    Input,
    Card,
    Select,    
    Checkbox } from '@greendeck/atomic';
import Empty from '../common/Empty';

class Claim extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{},            
            checked:'',           
            
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id
        console.log(id,"id")
        axios.get(`http://localhost:3025/NGO/${id}`)
        .then((response)=>{
            if(response){
                this.setState({
                    data:response.data                    
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleSubmit = (e, value) => {
        e.preventDefault()        
        const body = {  
            "name": this.state.data.name,
            "logoURL": this.state.data.logoURL,
            "email": this.state.data.email,
            "address.district":this.state.data.address.district,
            "address.pinCode":this.state.data.address.pinCode,
            "address.line_1":this.state.data.address.line_1,
            "address.line_2":this.state.data.address.line_2,
            "address.city":this.state.data.address.city,
            "claimed": this.state.checked
           }
        console.log(body,"formdata")
        let id = this.props.match.params.id
        axios.put( `http://localhost:3025/NGO/${id}`, body)
            .then((response) => {
                console.log(response,"formdata")
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    swal('Successfully Requested')
                    this.props.history.push('/')
                    // window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    } 

    onChange = (e) =>  {
        let value1 = e.target.checked
        this.setState({
            checked:value1
        })
    
    }
    
  render() {
    
    return (
      <>
        <div className="ant-text-left ant-py-3 ant-w-100">
          <Row>
          <Col span={13}>
                <Empty
                   illustration="undraw_empty_xct9.svg"
                   illustrationHeight={350}
                   title="Claim for Foreign Funding"
                   titleStyle={{
                   color: '#777'
                  }}            
               >
                 </Empty>
                </Col>

          <Col style={{marginTop:'-1rem'}}>
                <Card hoverable style={{ width: '30rem',boxShadow:'0 9px 25px 0 rgba(0, 0, 0, 0.19)' }}>
                 <Form onSubmit={this.handleSubmit} >
                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="Name"
                                value={this.state.data  && this.state.data.name? this.state.data.name : null }
                                disabled    
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="Email"
                                value={this.state.data  && this.state.data.email ? this.state.data.email : null }
                                disabled 
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="Logo_URL"
                                value={this.state.data  && this.state.data.logoURL? this.state.data.logoURL : null }
                                disabled 
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="address [city]"
                                value={this.state.data  && this.state.data.address ? this.state.data.address.city : null }
                                disabled 
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="address [district]"
                                value={this.state.data  && this.state.data.address? this.state.data.address.district : null }
                                disabled 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="address [line_1]"
                                value={this.state.data  && this.state.data.address? this.state.data.address.line_1 : null }
                                disabled 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="address [line_2]"
                                value={this.state.data  && this.state.data.address? this.state.data.address.line_2 : null }
                                disabled 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                placeholder="pinco  de"
                                value={this.state.data  && this.state.data.address? this.state.data.address.pinCode : null }
                                disabled 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox onChange={this.onChange}>If the NGO is unclaimed, Submit your request for funding.</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Request
                            </Button>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft:"1rem"}}>
                               <Link to='/'> Go back </Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Claim;