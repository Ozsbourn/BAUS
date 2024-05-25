'use client';

import { useStores } from '@/lib/store/useStore';
import { nodeTypes } from '@/lib/types/flowgraphTypes/nodeTypes/nodeTypes';
import { observer } from 'mobx-react';
import { useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

const FlowGraphHandler = observer(() => {
  const [instance, setInstance] = useState<ReactFlowInstance | null>(null);
  const {
    flowgraphStore: {
      nodes,
      edges,

      onConnect,
      onNodesChange,
      onEdgesChange,
    },
  } = useStores();

  return (
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        flexGrow: 1,
        height: '100%',
      }}
    >
      <ReactFlow
        style={{ flexGrow: 1, height: '100%' }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        // onNodesDelete={onDeleteNodeList}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // edgeTypes={edgeTypes}
        // defaultEdgeOptions={defaultEdgeOptions}
        onInit={setInstance}
        // onDrop={onDrop}
        // onDragOver={onDragOver}
        // connectionMode={ConnectionMode.Loose}  // Allow connect between handles w/ equal type, eg. source-source and target-target
        // connectionLineComponent={CustomConnectionLine}
        // connectionLineStyle={connectionLineStyle}
        // fitView
        deleteKeyCode={'Delete'}
        selectionKeyCode={'Ctrl'}
        proOptions={{ hideAttribution: false }}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap style={{ border: '#228BE6' }} nodeColor={'#228BE6'} pannable zoomable />
      </ReactFlow>
      {/*<ReactFlow>
	        <Background />
	        <Controls />
	      </ReactFlow>*/}
    </div>
  );
});

export default FlowGraphHandler;
