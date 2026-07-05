import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OTPInput from "./OTPInput";

function getInputs() {
  return screen.getAllByRole("textbox") as HTMLInputElement[];
}

describe("OTPInput", () => {
  it("renders six empty inputs and a disabled verify button", () => {
    render(<OTPInput />);
    const inputs = getInputs();
    expect(inputs).toHaveLength(6);
    expect(inputs.every((i) => i.value === "")).toBe(true);
    expect(screen.getByRole("button", { name: /verify/i })).toBeDisabled();
  });

  it("auto-advances focus while typing digits", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard("123456");

    expect(inputs.map((i) => i.value)).toEqual(["1", "2", "3", "4", "5", "6"]);
  });

  it("ignores non-digit characters", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard("a!x");

    expect(inputs[0].value).toBe("");
  });

  it("moves focus back on backspace in an empty input", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard("1"); // focus is now on inputs[1], which is empty
    await user.keyboard("{Backspace}");

    expect(inputs[0]).toHaveFocus();
  });

  it("distributes a pasted code across the inputs", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.paste("98-76 54");

    expect(inputs.map((i) => i.value)).toEqual(["9", "8", "7", "6", "5", "4"]);
  });

  it("verifies the correct code", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);

    await user.click(getInputs()[0]);
    await user.keyboard("123456");
    await user.click(screen.getByRole("button", { name: /verify/i }));

    expect(screen.getByText(/identity verified/i)).toBeInTheDocument();
  });

  it("clears the inputs on a wrong code", async () => {
    const user = userEvent.setup();
    render(<OTPInput />);
    const inputs = getInputs();

    await user.click(inputs[0]);
    await user.keyboard("111111");
    await user.click(screen.getByRole("button", { name: /verify/i }));

    expect(inputs.every((i) => i.value === "")).toBe(true);
    expect(screen.queryByText(/identity verified/i)).not.toBeInTheDocument();
  });
});
