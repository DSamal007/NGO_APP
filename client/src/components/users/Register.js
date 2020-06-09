import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {
    Form,
    Icon,
    Input,
    Button,
    Card,
    Menu,
    Select,
    Row,
    Col, 
    Dropdown,    
} from '@greendeck/atomic';
import RegisterImage from '../common/RegisterImage'
const { Option } = Select;
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: '',            
            password: ''            
        }
    }

    handleSubmit = (e, value) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password            
        }
        axios.post('http://localhost:3025/users/register', formData)
            .then((response) => {
                if (response.data.hasOwnProperty('errors')) {
                    swal(response.data.message)
                } else {
                    swal('Successfully Registered')

                    this.props.history.push('/users/login')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }   

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }    
 
    render() {
        return (
            <>
                <Row>
                    <Col span={6} offset={3} >
                    <Card  style={{ width: '21rem', alignItems: 'center', marginTop: '2rem',boxShadow:'0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item style={{marginBottom:'-1rem'}}>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                onChange={this.handleNameChange}
                            />,
                        </Form.Item>
                        <Form.Item style={{marginBottom:'-1rem'}}>
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                onChange={this.handleEmailChange}
                            />,
                        </Form.Item>                        
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={this.handlePasswordChange}
                            />,
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                    </Col>
                    <Col offset={0} style={{marginTop:'-4rem'}}>
                    <RegisterImage
                   illustration="undraw_empty_xct9.svg"
                   illustrationHeight={300}
                   title="Register a new Admin"
                   titleStyle={{
                   color: '#777'
                  }}
                  text="You need to register as Admin first."            
               >
                 </RegisterImage>
                    </Col>
                </Row>

            </>
        )
    }
}
export default Register