import { Textarea, Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useState } from "react";
import "../index.css";
function CatFacts() {
  interface DataType {
    fact: string;
    length: number;
  }
  const [data, setData] = useState<DataType>();

  async function handleClick() {
    const response = await fetch("https://catfact.ninja/fact");
    const json = await response.json();
    setData(json);
  }

  setTimeout(setCursor, 10);

  function setCursor() {
    const firstWordLength = data?.fact?.indexOf(" ");
    const text = document.querySelector("textarea");
    text?.setSelectionRange(firstWordLength!, firstWordLength!);
    text?.focus();
  }

  return (
    <div className="CatTextBlock">
      <Textarea rows={8} value={data?.fact} />
      <Button className="catFactsButton" onClick={handleClick} size={"l"}>
        Send
      </Button>
    </div>
  );
}

export default CatFacts;
