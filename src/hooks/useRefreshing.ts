import React from 'react';

interface Props {
  onRefresh: () => void;
  delay?: number;
}

const useRefreshing = ({onRefresh, delay}: Props) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onRefresh();
    }, delay ?? 1000);
  };

  return {
    isRefreshing,
    handleRefresh,
  };
};

export default useRefreshing;
