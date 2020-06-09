import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {
  Layout,
  Menu,
  Typography,
} from '@greendeck/atomic';
import Home from './components/common/Home';
import Footer from './components/common/Footer';
import Register from './components/users/Register';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import Details from './components/common/Details';
import Claim from './components/common/Claim';

import './App.css';
import './index.css';



const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography
class App extends React.Component {
    render(){
      return (
       <BrowserRouter>
         <div className="App">
          <Layout className="layout">
              {/* <Header> */}
                <div className="logo" />                
                      {
                        localStorage.getItem('authToken') ?
                        (
                          <Menu
                        theme="light"
                        mode="horizontal"                        
                        // style={{ marginLeft:'3rem' }}
                      >
                          <Menu.Item ><Link to='/'>Home</Link></Menu.Item>                          
                          <Menu.Item ><Link to='/users/logout'>Log out</Link></Menu.Item>
                        </Menu>
                        ) : (
                          <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        // style={{ marginLeft:'3rem' }}
                      >
                          <Menu.Item ><Link to='/users/register'>Register</Link></Menu.Item> 
                          <Menu.Item ><Link to='/users/login'>Login</Link></Menu.Item>                         
                        </Menu>
                        )
                      }
              {/* </Header> */}
              <Content>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                  {/* <Home/> */}
                  <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/claim/:id" component={Claim} />                      
                    <Route path="/users/register" component={Register} />
                    <Route path="/users/login" component={Login} />                    
                    <Route path="/users/logout" component={Logout} />                  
                  </Switch>
                  <Footer/> 
                </div>
              </Content>                    
                  
            </Layout> 
                 
      
         </div> 
        </BrowserRouter>
      )
    }
}

export default App;
