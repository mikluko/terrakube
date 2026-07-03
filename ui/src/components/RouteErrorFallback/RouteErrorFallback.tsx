import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";

export const RouteErrorFallback = () => {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : String(error);

  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle={message}
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Reload
        </Button>
      }
    />
  );
};

export default RouteErrorFallback;
