import { formatFormErrors } from './login.container.business';
import { UserFormErrors } from './viewmodel';
import { ValidateError } from 'async-validator';

describe('Login container business', () => {
  it('should return userFormErrors with properties as null if errors is null', () => {
    // Assert
    const expectedResult: UserFormErrors = { email: null, organization: null, token: null };
    const errors: ValidateError[] = null;

    // Act
    const result = formatFormErrors(errors);

    // Arrange
    expect(result).toEqual(expectedResult);
  });

  it('should userFormErrors with properties as null if errors is empty array', () => {
    // Assert
    const expectedResult: UserFormErrors = { email: null, organization: null, token: null };
    const errors: ValidateError[] = [];

    // Act
    const result = formatFormErrors(errors);

    // Arrange
    expect(result).toEqual(expectedResult);
  });

  it('should return the expected UserFormErrors', () => {
    // Assert
    const error1: ValidateError = { field: 'test', message: 'test' };
    const error2: ValidateError = { field: 'test2', message: 'test2' };
    const errors: ValidateError[] = [error1, error2];
    let expectedResult: UserFormErrors = { email: null, organization: null, token: null };
    errors.forEach((error) => expectedResult = { ...expectedResult, [error.field]: error.message });

    // Act
    const result = formatFormErrors(errors);

    // Arrange
    expect(result).toEqual(expectedResult);
  });
})
