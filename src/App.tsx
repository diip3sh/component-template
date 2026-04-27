import Intersection2 from "./components/pixel-perfect/intersection2";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Intersection2>
        <div className="p-4 bg-gray-200 dark:bg-gray-800">
          <span>Component goes here</span>
        </div>
      </Intersection2>
    </div>
  );
}

export default App;
