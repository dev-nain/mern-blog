import { Component, type ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught in boundary:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <main className="p-8 text-center text-gray-600 flex flex-col space-y-3 justify-center h-screen items-center">
          <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
          <pre className="text-sm text-gray-700">{error?.message}</pre>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </main>
      );
    }

    return children;
  }
}
