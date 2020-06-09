import React from 'react';
import { Spin, Icon } from '@greendeck/atomic';

const spinnerIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;

class Spinner extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: this.props.marginTop || '10rem',
          marginBottom: '10rem'
        }}
      >
        <Spin indicator={spinnerIcon} />
      </div>
    );
  }
}

export default Spinner;
