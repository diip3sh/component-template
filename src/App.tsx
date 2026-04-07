import { Agentation } from "agentation";
import Intersection2 from "./components/pixel-perfect/intersection2";
import Pressable3DButton from "./components/pressable-3d-button";
import { AppleSpotlight } from "./components/apple-spotlight";

function App() {
  return (
    <div className="flex items-center justify-center h-dvh">
      {/*<Intersection2>
				<div className="size-[20dvh] flex items-center justify-center">
					<Pressable3DButton />
				</div>
			</Intersection2>*/}
      {/*<FilterInteraction />*/}
      <AppleSpotlight />
      <Agentation />
    </div>
  );
}

export default App;
