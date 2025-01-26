
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  resetCounter: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, resetCounter: 0 };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('Error Boundary caught:', error, errorInfo);
  }

  handleReset = () => {
    // Reset all state and increment counter to force remount
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      resetCounter: this.state.resetCounter + 1
    });
  };

  componentWillUnmount() {
    // Clear any pending state updates
    this.setState = () => {};
  }

  render() {
    if (this.state.hasError) {
      return (
        <div key={this.state.resetCounter} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" paragraph>
            We're sorry for the inconvenience. Please try refreshing the page.
          </Typography>
          {process.env.NODE_ENV === 'development' && (
            <Typography variant="caption" component="div" paragraph>
              Error details: {this.state.error?.toString()}
              <pre style={{ textAlign: 'left', marginTop: '1rem' }}>
                {this.state.errorInfo?.componentStack}
              </pre>
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return (
      <div key={this.getResetKey()}>
        {this.props.children}
      </div>
    );
  }
  getResetKey(): string {
    return `error-boundary-${this.state.resetCounter}`;
  }
}

export default ErrorBoundary;
