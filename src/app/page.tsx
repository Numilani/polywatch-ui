import Graph from "@/components/graph";

export default function Home() {
  return (
    <div className="w-full h-full"> 
        <div className="flex w-full h-9/12 border border-dashed rounded-md text-sm">
          <p> graph panel </p>
          <Graph/>
        </div>
        <div className="flex w-full h-3/12 border border-dashed rounded-md text-sm">
          <p> info panel </p>
        </div>
    </div>
  );
}
