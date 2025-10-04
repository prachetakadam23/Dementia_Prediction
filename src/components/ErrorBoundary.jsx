import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // You could also log the error to an external service here
    // console.error(error, info);
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#b91c1c' }}>Something went wrong</h1>
          <p style={{ whiteSpace: 'pre-wrap', background: '#fff5f5', padding: 12, borderRadius: 6 }}>
            {String(error && error.toString())}
          </p>
          {info && info.componentStack && (
            <details style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
              <summary style={{ cursor: 'pointer' }}>Component stack</summary>
              <div style={{ marginTop: 8 }}>{info.componentStack}</div>
            </details>
          )}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => window.location.reload()} style={{ padding: '8px 12px', borderRadius: 6, background: '#1f2937', color: '#fff' }}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
