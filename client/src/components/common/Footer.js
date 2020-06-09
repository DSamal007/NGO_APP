import React from 'react';
import {
  Row,
  Col,
  Typography,
  Icon
} from '@greendeck/atomic';

const { Text } = Typography;

export default () => {
  return (
    <Row>
      <Col span={2}>
      </Col>
      <Col >
        <div style={{marginTop:'5rem' }}>         
         
          <Text></Text>
         
          <div style={{ width: '45%', marginTop: '0.5rem', marginLeft:'1rem',  justifyContent: 'space-evenly'}}>          
            <a target="_blank" href="mailto:dolagobindarony@gmail.com" style={{ color: '#5B6870', fontSize: '1.05rem' }}><Icon type="mail" /></a>
            <a target="_blank" href="https://www.linkedin.com/in/d-samal-9956a9127" style={{ color: '#5B6870', fontSize: '1.05rem',marginLeft:'1rem' }}><Icon type="linkedin" theme='filled' /></a>
            
          </div>
        </div>

      </Col>
    </Row>
  )
}
