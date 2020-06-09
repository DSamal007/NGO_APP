import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Row, Col } from '@greendeck/atomic';
import image from '../../assets/images/undraw_empty_xct9.svg'
const { Text, Title } = Typography;

class LoginImage extends React.Component {
  render() {
    return (
      <>
        <div className="ant-text-center ant-py-3 ant-w-100">
          <Row className="ant-my-4">
            <Col span={8} offset={3}>
              <img
                src={image}
                height={this.props.illustrationHeight || '100'}
                alt="No Results Found"                
              ></img>
            </Col>
          </Row>

          <Row className="ant-my-4">
            <Col span={8} offset={8}>
              <Title
                strong
                level={2}
                className=""
                style={this.props.titleStyle}
              >
                {this.props.title}
              </Title>
              <Text  className="ant-w-25">{this.props.text}</Text>
            </Col>
          </Row>
          <Row className="ant-my-4">
            <Col>
              {this.props.secondaryAction ? (
                <Button
                  type="link"
                  href={this.props.secondaryAction.link}
                  target="_blank"
                >
                  {this.props.secondaryAction.text}
                </Button>
              ) : null}
              {this.props.primaryAction ? (
                <Link to={this.props.primaryAction.link || ''}>
                  <Button type="primary">
                    {this.props.primaryAction.text}
                  </Button>
                </Link>
              ) : null}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default LoginImage;