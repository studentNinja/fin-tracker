import { formatDate, getMonthAndYearFromDate } from '../utils/dateUtils';

describe('formatDate', () => {
    test('should format date correctly', () => {
        expect(formatDate('2023-06-13T12:00:00Z')).toBe('13.06.2023');
    });

    test('should return empty string for undefined input', () => {
        expect(formatDate(undefined)).toBe('');
    });

    test('should format date with single digit day and month correctly', () => {
        expect(formatDate('2023-01-05T12:00:00Z')).toBe('05.01.2023');
    });

    test('should format date with double digit day and month correctly', () => {
        expect(formatDate('2023-10-15T12:00:00Z')).toBe('15.10.2023');
    });
});


describe('getMonthAndYearFromDate', () => {
    test('should return month and year correctly', () => {
        expect(getMonthAndYearFromDate('2023-06-13T12:00:00Z')).toEqual([5, 2023]);
    });

    test('should return month and year for empty string input', () => {
        expect(getMonthAndYearFromDate('')).toEqual("");
    });

    test('should return correct month and year for January', () => {
        expect(getMonthAndYearFromDate('2023-01-15T12:00:00Z')).toEqual([0, 2023]);
    });

    test('should return correct month and year for December', () => {
        expect(getMonthAndYearFromDate('2023-12-25T12:00:00Z')).toEqual([11, 2023]);
    });
});
