import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore, Store } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import {BrowserRouter as Router, MemoryRouter} from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import { rootReducer, RootState } from "../../app/store";
import { getMockInitialState } from "../../mockData/testUtils";
import { mockUser, mockIncomes } from "../../mockData/mockUserData";
import DashboardPage from "../../pages/DashboardPage";
import HomePage from "../../pages/HomePage";

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
    console.log(store)
    return
    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <Provider store={store} >
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        );
    }
    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('LoginPage', () => {


    test('renders LoginPage component', () => {
        const initialState = getMockInitialState();
        let store = configureStore({
            reducer: rootReducer,
            preloadedState: initialState,
        })
        console.log(store)
        renderWithProviders(<LoginPage/>, {initialState}, );
        //
        // expect(screen.getByText(/УВІЙДІТЬ/i)).toBeInTheDocument();
        // expect(screen.getByText(/Немає акаунту?/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/Пошта/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    });


})