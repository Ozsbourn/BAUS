import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <div className="loader-holder">
      <Loader className="loader" color="yellow" />
    </div>
  );
}
