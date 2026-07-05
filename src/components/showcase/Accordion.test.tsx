import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./Accordion";

function panelFor(button: HTMLElement) {
  // The collapsible wrapper is the grid sibling of the trigger button
  return button.parentElement!.querySelector("div.grid") as HTMLElement;
}

describe("Accordion", () => {
  it("renders all items collapsed", () => {
    render(<Accordion />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(4);
    for (const button of buttons) {
      expect(panelFor(button).style.gridTemplateRows).toBe("0fr");
    }
  });

  it("expands an item on click and collapses it again", async () => {
    const user = userEvent.setup();
    render(<Accordion />);
    const button = screen.getByRole("button", { name: /backdrop-filter/i });

    await user.click(button);
    expect(panelFor(button).style.gridTemplateRows).toBe("1fr");

    await user.click(button);
    expect(panelFor(button).style.gridTemplateRows).toBe("0fr");
  });

  it("keeps items independent", async () => {
    const user = userEvent.setup();
    render(<Accordion />);
    const first = screen.getByRole("button", { name: /backdrop-filter/i });
    const second = screen.getByRole("button", {
      name: /requestAnimationFrame/i,
    });

    await user.click(first);
    await user.click(second);

    expect(panelFor(first).style.gridTemplateRows).toBe("1fr");
    expect(panelFor(second).style.gridTemplateRows).toBe("1fr");
  });
});
