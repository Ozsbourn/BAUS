import { Button } from '@mantine/core';
import { memo } from 'react';
import { Handle, NodeProps, NodeResizer, NodeToolbar, Position } from 'reactflow';
import { handleType } from '../../utils/handlePropsVals';

const SimpleConditionalNode = (props: NodeProps) => {
  return (
    <div style={{ minHeight: 100, minWidth: 100, background: 'teal' }}>
      <NodeResizer color="#FAB005" isVisible={props.selected} minWidth={100} minHeight={30} />
      <NodeToolbar isVisible={props.data.toolbarVisible} position={props.data.toolbarPosition}>
        <Button>Here should be toolbar later</Button>
      </NodeToolbar>

      <Handle
        type={handleType.source}
        position={Position.Left}
        id="leftTopHandle"
        style={{ left: '33%' }}
      />
      <Handle
        type={handleType.source}
        position={Position.Left}
        id="leftBottomHandle"
        style={{ right: '33%' }}
      />
      <Handle
        type={handleType.target}
        position={Position.Right}
        id="rightMidHandle" /*style={{ right: '33%' }}*/
      />
    </div>
  );
};

export default memo(SimpleConditionalNode);
