import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: "" };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error caught by ErrorBoundary:', error);
        console.log('Error caught by ErrorBoundary:', errorInfo);
        this.setState({ hasError: true });
    }


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
