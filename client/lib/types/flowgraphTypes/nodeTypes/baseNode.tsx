import { Button } from '@mantine/core';
import { memo } from 'react';
import { NodeProps, NodeResizer, NodeToolbar } from 'reactflow';

const BaseNode = (props: NodeProps) => {
  return (
    <div>
      <NodeResizer color="#FAB005" isVisible={props.selected} minWidth={100} minHeight={30} />
      <NodeToolbar isVisible={props.data.toolbarVisible} position={props.data.toolbarPosition}>
        <Button>Here should be toolbar later</Button>
      </NodeToolbar>

      {/* JSX for node her */}
    </div>
  );
};

export default memo(BaseNode);
