import Loading from "../technical/Loading";
import "./LoadingFallback.css";

export const LoadingFallback = () => {
  return (
    <div className="loading-fallback-container">
      <Loading />
    </div>
  );
};

export default LoadingFallback;
