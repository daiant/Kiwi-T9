import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { ContactCard } from "../components/ContactCard";

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

it("Renders with props", () => {
    const user = {
        name: {
            first: "Fake",
            last: "Name"
        },
        picture: {
            large: "fake",
            medium: "fake-m", 
            thumbnail: "fake-t",
        },
        phone: "555-FAKE"
    }
    act(() => {
        render(<ContactCard user={user}/>, container);
    });
    const fullName = document.querySelector("[data-testid=full-name]");
    expect(fullName.innerHTML).toBe(`${user.name.first} ${user.name.last}`);

    const phone = document.querySelector("[data-testid=phone]");
    expect(phone.innerHTML).toBe(`${user.phone}`);

    const avatar = document.querySelector("[data-testid=img]").getElementsByTagName("img")[0];
    const src = avatar.src.split("/").at(-1)
    expect(src).toBe(user.picture.medium);
})