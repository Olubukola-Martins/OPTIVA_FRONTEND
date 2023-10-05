import { SimpleCard } from "./components/cards/SimpleCard";

function App() {
  return (
    <div className="Container">
      <h2 className="text-center text-red-400">Hello Daniel</h2>
      <div className="grid grid-cols-4">
      <SimpleCard />
      </div>
    </div>
  );
}

export default App;
