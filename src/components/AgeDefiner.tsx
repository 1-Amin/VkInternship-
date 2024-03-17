import { Button, Input } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useState } from "react";
import React from "react";

interface DataType {
  count: number;
  name: string;
  age: number;
}

function AgeDefiner() {
  const [name, setName] = useState<string>();
  const [data, setData] = useState<DataType>();
  const pendingForms = new WeakMap();

  async function serverFetech(form: EventTarget & HTMLFormElement) {
    if (pendingForms.get(form)) {
      pendingForms.get(form).abort();
    }

    const controller = new AbortController();
    pendingForms.set(form, controller);
    if (name !== data) {
      try {
        const response = await fetch(`https://api.agify.io/?name=${name}`, {
          signal: controller.signal,
        });
        pendingForms.delete(form);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    let form = e.currentTarget;
    e.preventDefault();
    serverFetech(form);
  }

  let typingTimer: number;
  var doneTypingInterval = 3000;
  function keyUp() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(serverFetech, doneTypingInterval);
  }
  function keyDown() {
    clearTimeout(typingTimer);
  }

  return (
    <div id="AgeDefinerBlock">
      <form action="" onSubmit={handleSubmit}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          onKeyUp={keyUp}
          onKeyDown={keyDown}
          className="AgeDefinerInput"
          type="text"
          placeholder="Name"
          pattern="[a-zA-Z]+"
          title="Please input only alphabetic letters"
        />
        <Button type="submit" size={"l"}>
          Send
        </Button>
        <p>Your age is: {data?.age}</p>
      </form>
    </div>
  );
}

export default AgeDefiner;
