import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import App from "../components/App";
import { PostService } from "../API/PostService";

jest.mock("../API/PostService");

const TEST_DATA = {
  items: [
    {
      id: 1,
      login: "John",
      avatar: "https://pngicon.ru/file/uploads/vinni-pukh-v-png-256x256.png",
      url: "urlJohn",
    },
    {
      id: 2,
      login: "Jane",
      avatar: "https://pngicon.ru/file/uploads/vinni-pukh-v-png-256x256.png",
      url: "urlJane",
    },
  ],
};

test("renders Searcher.jsx", () => {
  render(<App />);
  const linkElement = screen.getByRole("button", { name: /Поиск/i });
  expect(linkElement).toBeInTheDocument();
});

test("loads data on initial search", async () => {
  PostService.getData.mockResolvedValueOnce(TEST_DATA);

  render(<App />);

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "J" } });

  act(() => {
    fireEvent.click(screen.getByRole("button", { name: /Поиск/i }));
  });

  await waitFor(() => {
    expect(screen.getByText(/John/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane/i)).toBeInTheDocument();
  });
});

test("opens popup on user click", async () => {
  PostService.getData.mockResolvedValueOnce(TEST_DATA);
  render(<App />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "J" } });

  act(() => {
    fireEvent.click(screen.getByRole("button", { name: /Поиск/i }));
  });

  await waitFor(() => {
    expect(screen.getByText(/John/i)).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(screen.getByText(/John/i));
  });

  expect(screen.getByText(/urlJohn/)).toBeInTheDocument();
});
