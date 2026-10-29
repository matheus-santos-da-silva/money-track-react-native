import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { useRefetchOnReturn } from "../src/hooks/useRefetchOnReturn";

type Listener = () => void;

const mockListeners: Record<string, Set<Listener>> = {
  focus: new Set(),
  blur: new Set(),
};

const emit = (event: "focus" | "blur") =>
  ReactTestRenderer.act(() => {
    mockListeners[event].forEach((listener) => listener());
  });

const mockNavigation = {
  addListener: (event: string, listener: Listener) => {
    mockListeners[event].add(listener);
    return () => mockListeners[event].delete(listener);
  },
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation,
}));

const Screen = ({ refetch }: { refetch: () => void }) => {
  useRefetchOnReturn(refetch);
  return null;
};

const mount = async (refetch: () => void) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<Screen refetch={refetch} />);
  });
  return renderer;
};

describe("useRefetchOnReturn", () => {
  afterEach(() => {
    mockListeners.focus.clear();
    mockListeners.blur.clear();
  });

  it("ignora o primeiro foco, que é a abertura da tela", async () => {
    const refetch = jest.fn();
    await mount(refetch);

    emit("focus");

    expect(refetch).not.toHaveBeenCalled();
  });

  it("recarrega a cada volta para a tela", async () => {
    const refetch = jest.fn();
    await mount(refetch);

    emit("focus");
    emit("blur");
    emit("focus");
    emit("blur");
    emit("focus");

    expect(refetch).toHaveBeenCalledTimes(2);
  });

  it("chama sempre o refetch mais recente", async () => {
    const first = jest.fn();
    const latest = jest.fn();
    const renderer = await mount(first);

    await ReactTestRenderer.act(() => {
      renderer.update(<Screen refetch={latest} />);
    });
    emit("blur");
    emit("focus");

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("remove os listeners ao desmontar", async () => {
    const renderer = await mount(jest.fn());

    await ReactTestRenderer.act(() => {
      renderer.unmount();
    });

    expect(mockListeners.focus.size).toBe(0);
    expect(mockListeners.blur.size).toBe(0);
  });
});
