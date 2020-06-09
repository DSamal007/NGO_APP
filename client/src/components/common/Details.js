import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Row, Col, Card  } from '@greendeck/atomic';
import axios from 'axios';

const { Meta } = Card;
const {Title, Text} = Typography;

class Details extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    

    componentDidMount(){
        let id = this.props.match.params.id
        console.log(id,"id")
        axios.get(`http://localhost:3025/NGO/${id}`)
        .then((response)=>{
            console.log(response.data,"response")            
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


  render() {
    return (
      <>
        <div className="ant-text-center ant-py-3 ant-w-100">
        <Row>
            <Col span={6} offset={2}>
            
            </Col>
            <Col>
            <Card
                style={{ width: 500, boxShadow:'0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}
                cover={<img alt="example" src={!this.state.data ? null : this.state.data.logoURL} />}
            >
                <Meta title={this.state.data ? this.state.data.name : null} description={this.state.data ? this.state.data.email : null} /><br/>
                <Meta title='Address'description={<span>
                                           City - <Text strong>{ this.state.data.address && this.state.data.address.city}</Text>, 
                                           District - <Text strong>{ this.state.data.address && this.state.data.address.district}</Text>,
                                           Address Line 1 - { this.state.data.address && this.state.data.address.line_1}, <br/>
                                           Address line 2 - { this.state.data.address && this.state.data.address.line_2},
                                           Pincode - { this.state.data.address && this.state.data.address.pinCode}
                                          </span>                                          } /><br/>
                <Meta title='Claimed' description={this.state.data  && this.state.data.claimed == true ? 'YES' : null} />
            </Card>
            </Col>
        </Row>
        </div>
      </>
    );
  }
}

export default Details;