import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { rootReducer, RootState } from "../app/store";
import {
  mockUser,
  mockTransactions,
  mockGoalTransactions,
  mockFixedExpenses,
  mockIncomes,
} from "./mockUserData";

export const getMockInitialState = (overrides: Partial<RootState> = {}): RootState => ({
  auth: {
    isAuthenticated: false,
    user: mockUser,
    accessToken: "",
    refreshToken: "",
    loading: false,
    error: null,
    ...overrides.auth,
  },
  user: {
    userInfo: mockUser,
    loading: false,
    error: null,
    updatePasswordSuccess: false,
    deleteUserSuccess: false,
    ...overrides.user,
  },
  transactions: {
    transactions: mockTransactions,
    loading: false,
    error: null,
    selectedTransaction: mockTransactions[0],
    ...overrides.transactions,
  },
  goalTransactions: {
    goalTransactionsCurrent: mockGoalTransactions,
    goalTransactionsAll: mockGoalTransactions,
    loading: false,
    error: null,
    ...overrides.goalTransactions,
  },
  fixedExpenses: {
    fixedExpenses: mockFixedExpenses,
    loading: false,
    error: null,
    ...overrides.fixedExpenses,
  },
  goals: {
    goals: mockUser.goals,
    loading: false,
    error: null,
    ...overrides.goals,
  },
  incomes: {
    incomes: mockIncomes,
    loading: false,
    error: null,
    ...overrides.incomes,
  },
  // Add other slices as needed
});
