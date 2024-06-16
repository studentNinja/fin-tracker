import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import { rootReducer, RootState } from "../../app/store";
import { getMockInitialState } from "../../mockData/testUtils";
import { mockUser } from "../../mockData/mockUserData";

// Mocking Chart.js to avoid rendering issues in test environment
jest.mock("react-chartjs-2", () => ({
  Line: () => <div>Chart</div>,
}));

interface RenderWithProvidersOptions {
  initialState?: Partial<RootState>;
  store?: Store<RootState>;
  [key: string]: any;
}

// Helper function to render with Redux and Router context
const renderWithProviders = (
  ui: React.ReactElement,
  {
    initialState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Define a mock initial state that includes all slices

describe("HomePage", () => {
  it("renders without crashing", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getAllByText(/FinTracker/)).toHaveLength(2);
  });

  it("renders the features section", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/Що пропонує FinTracker/)).toBeTruthy();
    expect(screen.getByText(/Простий облік витрат і доходів/)).toBeTruthy();
    expect(screen.getByText(/Переваги нашого сервісу/)).toBeTruthy();
    expect(screen.getByText(/Безпека і конфіденційність/)).toBeTruthy();
  });

  it("renders the chart", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText("Chart")).toBeTruthy();
  });

  it("renders register button when not authenticated", () => {
    const initialState = getMockInitialState({
      auth: {
        isAuthenticated: false,
        user: mockUser,
        accessToken: "",
        refreshToken: "",
        loading: false,
        error: null,
      },
    });
    renderWithProviders(<HomePage />, { initialState });
    expect(screen.getByText(/Зареєструватися!/)).toBeTruthy();
  });

  it("does not render register button when authenticated", () => {
    const initialState = getMockInitialState({
      auth: {
        isAuthenticated: true,
        user: mockUser,
        accessToken: "",
        refreshToken: "",
        loading: false,
        error: null,
      },
    });
    renderWithProviders(<HomePage />, { initialState });
    expect(screen.queryByText(/Зареєструватися!/)).toBeNull();
  });
});
