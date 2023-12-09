import { Component } from 'react';
import { Alert } from 'antd';

import './ConnectionAlert.scss';
import { ConnectionCheck } from '../../hooks';

class ConnectionAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnectionLost: false,
      isConnectionRestored: false,
    };

    this.connectionCheck = new ConnectionCheck();
  }

  async componentDidMount() {
    this.connectionCheck.didMount(
      () => this.handleConnectionRestored(),
      () => this.handleConnectionLost()
    );
  }

  componentWillUnmount() {
    this.connectionCheck.willUnmount();
  }

  handleConnectionLost = () => {
    this.setState({ isConnectionLost: true });

    setTimeout(() => {
      this.setState({ isConnectionLost: false });
    }, 5000);
  };

  handleConnectionRestored = () => {
    this.setState({ isConnectionRestored: true });

    setTimeout(() => {
      this.setState({ isConnectionRestored: false });
    }, 5000);
  };

  render() {
    const { isConnectionLost, isConnectionRestored } = this.state;
    return (
      <div className="connection-alert">
        {isConnectionLost && (
          <Alert
            className="fade-out"
            message="Connection lost"
            type="error"
            showIcon
            closable
          />
        )}
        {isConnectionRestored && (
          <Alert
            className="fade-out"
            message="Connection is restored"
            type="success"
            showIcon
            closable
          />
        )}
      </div>
    );
  }
}

export default ConnectionAlert;
