import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorMessage: '' 
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      errorMessage: error.message 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to your preferred error tracking service
    this.logError(error, errorInfo);
  }

  logError = (error, errorInfo) => {
    console.error('Error details:', {
      error: error,
      errorInfo: errorInfo,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px 20px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Oops! Something went wrong</h2>
          {this.state.errorMessage && (
            <p style={{ color: '#666', marginBottom: '20px' }}>
              {this.state.errorMessage}
            </p>
          )}
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#0d6efd',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#0b5ed7'}
            onMouseOut={e => e.target.style.backgroundColor = '#0d6efd'}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;