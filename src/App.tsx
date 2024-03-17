import "@vkontakte/vkui/dist/vkui.css";
import CatFacts from "./components/CatFacts";
import AgeDefiner from "./components/AgeDefiner";

const App = () => {
  return (
    <section>
      <div className="cat">
        <CatFacts />
      </div>
      <div className="human">
        <AgeDefiner />
      </div>
    </section>
  );
};

export default App;
