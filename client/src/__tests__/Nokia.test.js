import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Nokia } from '../components/Nokia';

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders without props nor values", () => {
  act(() => {
    render(<Nokia />, container);
  });
  expect(container.querySelector("#text-input").value).toBe("");
});

it("Updates input with the new value", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Nokia handleQuery={() => 1} handlePrediction={() => 1} />, container);
  });
  // Encuentra el botón 2 y 3
  const button2 = document.querySelector("[data-testid=button-2]");
  expect(button2.getElementsByTagName("div")[0].innerHTML).toBe("2");

  act(() => {
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const textInput = document.querySelector("[data-testid=text-input]");
  expect(textInput.value).toBe("2");

});

it("Deletes query value", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Nokia handleQuery={() => 1} handlePrediction={() => 1}/>, container);
  });
  // Encuentra el botón 2 y 3
  const button2 = document.querySelector("[data-testid=button-2]");
  expect(button2.getElementsByTagName("div")[0].innerHTML).toBe("2");

  act(() => {
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const textInput = document.querySelector("[data-testid=text-input]");
  expect(textInput.value).toBe("2");
  // finds # button
  
  const weirdButton = document.querySelector(".special");
  expect(weirdButton.getElementsByTagName("div")[0].innerHTML).toBe("Clear");
  
  act(() => {
    weirdButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(textInput.value).toBe("");
});

it("Deletes one value", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Nokia handleQuery={() => 1} handlePrediction={() => 1}/>, container);
  });
  // Encuentra el botón 2 y 3
  const button2 = document.querySelector("[data-testid=button-2]");
  expect(button2.getElementsByTagName("div")[0].innerHTML).toBe("2");

  act(() => {
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    button2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const textInput = document.querySelector("[data-testid=text-input]");
  expect(textInput.value).toBe("22");
  // finds # button
  
  const weirdButton2 = document.querySelector("[data-testid=button-Delete]");
  expect(weirdButton2.getElementsByTagName("div")[0].innerHTML).toBe("Delete");
  
  act(() => {
    weirdButton2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(textInput.value).toBe("2");
  act(() => {
    weirdButton2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    weirdButton2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    weirdButton2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(textInput.value).toBe("");
});

it("Toggle Nokia Position", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Nokia handleQuery={() => 1} handlePrediction={() => 1}/>, container);
  });
  const nokia = document.querySelector("[data-testid=nokia]");
  expect(nokia.style.bottom).toBe("0px");

  const slider = document.querySelector("[data-testid=slider]");
  expect(slider).not.toBeNull();

  act(() => {
    slider.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(nokia.style.bottom).not.toBe("0px");
}) 