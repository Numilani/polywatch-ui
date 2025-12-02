import ForceGraph from "@/components/graph";

export class NodeDatapoint {
  id: number;
  value: string;

  constructor(id: number, value: string){this.id = id; this.value = value;}
}

class NodeLink {
  source: number;
  target: number;
  width!: number;

  constructor(source: number, target: number) { this.source = source; this.target = target; }
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function GenerateRandomData(): [Array<NodeDatapoint>, Array<NodeLink>] {
  let nodes: Array<NodeDatapoint> = [];
  let links: Array<NodeLink> = [];

  let randNodeCount: number = 0;
  while (randNodeCount < 100) {
    nodes.push({ id: randNodeCount, value: "Node_" + randNodeCount.toString() })
    randNodeCount++;
  }
  let randLinkCount: number = 0;
  while (randLinkCount < 75) {
    links.push({source: getRandomInt(99), target: getRandomInt(99), width: 2});
    randLinkCount++;
  }

  return [nodes, links];
}

export default function Home() {

  let [nodes, links] = GenerateRandomData();

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-9/12 border border-dashed rounded-md text-sm">
        <p> graph panel </p>
        <ForceGraph links={links} nodes={nodes} />
      </div>
      <div className="flex w-full h-3/12 border border-dashed rounded-md text-sm">
        <p> info panel </p>
      </div>
    </div>
  );
}
