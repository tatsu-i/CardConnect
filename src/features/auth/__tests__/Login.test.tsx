import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Login from "../Login";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test("必須フィールドが空の場合にエラーメッセージを表示する", async () => {
    renderLogin();

    const submitButton = screen.getByRole("button", { name: "サインイン" });
    fireEvent.click(submitButton);

    expect(await screen.findAllByText("入力が必須の項目です。")).toHaveLength(
      2
    );
  });

  test("パスワードが8文字未満の場合にエラーメッセージを表示する", async () => {
    renderLogin();

    const passwordInput = screen.getByLabelText("パスワード");
    await userEvent.type(passwordInput, "short");

    expect(
      await screen.findByText("8文字以上入力してください。")
    ).toBeInTheDocument();
  });
});
