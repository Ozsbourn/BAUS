import { makeAutoObservable } from 'mobx';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

export class FlowGraphStore {
  // private
  nodes: Node[];
  // private
  edges: Edge[];

  constructor() {
    makeAutoObservable(this);

    this.nodes = [
      {
        id: 'provider-1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
      },
      {
        id: '123-1',
        type: 'simpleConditionalNode',
        data: { label: 'Node 12' },
        position: { x: 450, y: 15 },
      },
    ];
    this.edges = [];
  }

  onNodesChange = (changes: NodeChange[]) => {
    console.log(changes);
    this.nodes = applyNodeChanges(changes, this.nodes);
  };
  onEdgesChange = (changes: EdgeChange[]) => {
    this.edges = applyEdgeChanges(changes, this.edges);
  };
  onConnect = (connection: Connection) => {
    // const newEdge: Edge = { ...connection }
    // this.edges = addEdge(newEdge, this.edges);
    this.edges = addEdge(connection, this.edges);
  };
}

export const flowgraphStore = new FlowGraphStore();
