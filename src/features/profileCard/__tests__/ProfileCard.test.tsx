import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ProfileCard from "../ProfileCard";

describe("ProfileCard", () => {
  const renderProfileCard = () => {
    render(
      <Provider store={store}>
        <ProfileCard />
      </Provider>
    );
  };

  test("ローディング状態が表示される", () => {
    renderProfileCard();

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });
});
