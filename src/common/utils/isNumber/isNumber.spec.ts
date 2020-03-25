import { isNumber } from "./isNumber";

describe('isNumber', () => {
  it('should return false if value is null', () => {
    // Arrange
    const value = null;

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is undefined', () => {
    // Arrange
    const value = undefined;

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is NaN', () => {
    // Arrange
    const value = NaN;

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is string and is not a number value', () => {
    // Arrange
    const value = '1test';

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is boolean', () => {
    // Arrange
    const value = true;

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is an array', () => {
    // Arrange
    const value = [];

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false if value is an object', () => {
    // Arrange
    const value = {};

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true if value is a string and is a number value', () => {
    // Arrange
    const value = '1';

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true if value is a number', () => {
    // Arrange
    const value = 1;

    // Act
    const result = isNumber(value);

    // Assert
    expect(result).toBeTruthy();
  });
});
