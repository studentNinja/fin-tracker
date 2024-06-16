import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import { rootReducer, RootState } from "../../app/store";
import { getMockInitialState } from "../../mockData/testUtils";
import { mockUser, mockIncomes } from "../../mockData/mockUserData";

interface ConfirmDeletePopUpProps {
  cancel: () => void;
  confirmDelete: () => void;
}

interface AddIncomeOrFixedExpensesPopUpProps {
  cancel: () => void;
  confirmAdd: (title: string, number: number) => void;
  errorState: { name: string; amount: string };
}

interface ChangeNumberPopUpProps {
  title: string;
  cancel: () => void;
  confirmChange: (number: number) => void;
}

interface AddSpendingPopUpProps {
  cancel: () => void;
  confirmAdd: (categoryId: number, title: string, number: number) => void;
}

interface IncomeBlockProps {
  showConfirmDeletePopUp: (deleteFunc: () => void) => void;
  showPopUpAddIncome: (addFunc: () => void) => void;
}

interface ProgressBlockProps {
  showMoveMoneyPopUp: (
    title: string,
    moveFunc: (amount: number) => void
  ) => void;
  showCreateGoalPopUp: (createFunc: () => void) => void;
}

interface StatisticsBlockProps {
  showAddSpendingPopUp: (addFunc: () => void) => void;
}

// Mocking components used in DashboardPage to avoid rendering issues
jest.mock(
  "../../components/dashboardPageBlocks/IncomeBlock",
  () =>
    ({ showConfirmDeletePopUp, showPopUpAddIncome }: IncomeBlockProps) =>
      (
        <div>
          IncomeBlock
          <button onClick={() => showConfirmDeletePopUp(() => {})}>
            Delete
          </button>
          <button onClick={() => showPopUpAddIncome(() => {})}>
            Add Income
          </button>
        </div>
      )
);
jest.mock(
  "../../components/dashboardPageBlocks/ProgressBlock",
  () =>
    ({ showMoveMoneyPopUp, showCreateGoalPopUp }: ProgressBlockProps) =>
      (
        <div>
          ProgressBlock
          <button onClick={() => showMoveMoneyPopUp("Title", () => {})}>
            Move Money
          </button>
          <button onClick={() => showCreateGoalPopUp(() => {})}>
            Create Goal
          </button>
        </div>
      )
);
jest.mock(
  "../../components/dashboardPageBlocks/StatisticsBlock",
  () =>
    ({ showAddSpendingPopUp }: StatisticsBlockProps) =>
      (
        <div>
          StatisticsBlock
          <button onClick={() => showAddSpendingPopUp(() => {})}>
            Add Spending
          </button>
        </div>
      )
);
jest.mock(
  "../../components/pop-ups/ConfirmDeletePopUp",
  () =>
    ({ cancel, confirmDelete }: ConfirmDeletePopUpProps) =>
      (
        <div>
          ConfirmDeletePopUp
          <button onClick={confirmDelete}>Confirm Delete</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      )
);
jest.mock(
  "../../components/pop-ups/AddIncomeOrFixedExpensesPopUp",
  () =>
    ({ cancel, confirmAdd, errorState }: AddIncomeOrFixedExpensesPopUpProps) =>
      (
        <div>
          AddIncomeOrFixedExpensesPopUp
          <button onClick={() => confirmAdd("Income", 100)}>Confirm Add</button>
          <button onClick={cancel}>Cancel</button>
          {errorState.name && <div>{errorState.name}</div>}
          {errorState.amount && <div>{errorState.amount}</div>}
        </div>
      )
);
jest.mock(
  "../../components/pop-ups/ChangeNumberPopUp",
  () =>
    ({ title, cancel, confirmChange }: ChangeNumberPopUpProps) =>
      (
        <div>
          ChangeNumberPopUp - {title}
          <button onClick={() => confirmChange(100)}>Confirm Change</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      )
);
jest.mock(
  "../../components/pop-ups/AddSpendingPopUp",
  () =>
    ({ cancel, confirmAdd }: AddSpendingPopUpProps) =>
      (
        <div>
          AddSpendingPopUp
          <button onClick={() => confirmAdd(1, "Spending", 100)}>
            Confirm Add
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>
      )
);

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

describe("DashboardPage", () => {
  it("renders without crashing", () => {
    const initialState = getMockInitialState();
    renderWithProviders(<DashboardPage />, { initialState });
    expect(screen.getByText("IncomeBlock")).toBeTruthy();
    expect(screen.getByText("ProgressBlock")).toBeTruthy();
    expect(screen.getByText("StatisticsBlock")).toBeTruthy();
  });

  it("opens and closes ConfirmDeletePopUp", () => {
    const initialState = getMockInitialState();
    renderWithProviders(<DashboardPage />, { initialState });

    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("ConfirmDeletePopUp")).toBeTruthy();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("ConfirmDeletePopUp")).toBeNull();
  });

  it("opens and closes AddIncomeOrFixedExpensesPopUp", () => {
    const initialState = getMockInitialState();
    renderWithProviders(<DashboardPage />, { initialState });

    fireEvent.click(screen.getByText("Add Income"));
    expect(screen.getByText("AddIncomeOrFixedExpensesPopUp")).toBeTruthy();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("AddIncomeOrFixedExpensesPopUp")).toBeNull();
  });

  it("opens and closes ChangeNumberPopUp", () => {
    const initialState = getMockInitialState();
    renderWithProviders(<DashboardPage />, { initialState });

    fireEvent.click(screen.getByText("Move Money"));
    expect(screen.getByText("ChangeNumberPopUp - Title")).toBeTruthy();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("ChangeNumberPopUp - Title")).toBeNull();
  });

  it("opens and closes AddSpendingPopUp", () => {
    const initialState = getMockInitialState();
    renderWithProviders(<DashboardPage />, { initialState });

    fireEvent.click(screen.getByText("Add Spending"));
    expect(screen.getByText("AddSpendingPopUp")).toBeTruthy();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("AddSpendingPopUp")).toBeNull();
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
    renderWithProviders(<DashboardPage />, { initialState });
    expect(screen.queryByText(/Зареєструватися!/)).toBeNull();
  });
});
