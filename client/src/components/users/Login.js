import React from 'react'
import {
  Form,
  Icon,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col
} from '@greendeck/atomic';
import axios from 'axios';
import swal from 'sweetalert';
import LoginImage from '../common/LoginImage';

const { Text, Title } = Typography;

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:3025/users/login', formData)
      .then((response) => {
        if (response.data.error) {
          swal(response.data.error)
        } else {
          const token = response.data.token
          if (token) {
            localStorage.setItem('authToken', token)
            swal('successfully logged in')
            this.props.history.push('/')
            window.location.reload()
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

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
          <Col span={8} offset={2}>
          <LoginImage
                   illustration="undraw_empty_xct9.svg"
                   illustrationHeight={270}
                   title="Login"                   
                   titleStyle={{
                   color: '#777'
                  }}
                  text="You need to login as admin first."            
               >
                 </LoginImage>
          </Col>
          <Col span={8} offset={3}>
          <Card  style={{ width: '21rem', alignItems: 'center', marginTop: '3rem',boxShadow:'0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
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
              <Button type="link" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            Or <a href="/users/register">register now!</a>
            </Form.Item>
          </Form>
        </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default Login