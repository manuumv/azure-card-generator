import * as mappers from './mapToSelectOptions';

describe('mapToSelectOptions', () => {
  describe('mapToSelectOptions', () => {
    it('should return an empty array if values are null', () => {
      // Arrange
      const values = null;
      const keyName = 'name';
      const expectedResult = [];

      // Act
      const result = mappers.mapToSelectOptions(values, keyName);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array if values are empty', () => {
      // Arrange
      const values = [];
      const keyName = 'name';
      const expectedResult = [];

      // Act
      const result = mappers.mapToSelectOptions(values, keyName);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return the expected result and call mapToSelectOptions with the expected values', () => {
      // Arrange
      const mockedValue1 = { index: '1' };
      const mockedValue2 = { index: '2' };
      const values = [mockedValue1, mockedValue2];
      const keyName = 'index';
      const expectedValue1 = { name: mockedValue1.index, value: 0 };
      const expectedValue2 = { name: mockedValue2.index, value: 1 };
      const expectedResult = [expectedValue1, expectedValue2];
      const spyOnMapToSelectOption = jest.spyOn(mappers, 'mapToSelectOption')
        .mockImplementationOnce(() => expectedValue1)
        .mockImplementationOnce(() => expectedValue2);

      // Act
      const result = mappers.mapToSelectOptions(values, keyName);

      // Assert
      expect(spyOnMapToSelectOption).toHaveBeenNthCalledWith(1, mockedValue1, 0, keyName);
      expect(spyOnMapToSelectOption).toHaveBeenNthCalledWith(2, mockedValue2, 1, keyName);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('mapToSelectOption', () => {
    it('should return null if the key does not exist', () => {
      // Arrange
      const keyName = 'test';
      const value = { name: '1' };
      const index = 0;
      const expectedResult = { name: value.name, value: index };

      // Act
      const result = mappers.mapToSelectOption(value, index, keyName);

      // Assert
      expect(result).toBeNull();
    });

    it('should return the expected result if values are not empty with the expected key as name', () => {
      // Arrange
      const keyName = 'name';
      const value = { name: '1' };
      const index = 0;
      const expectedResult = { name: value.name, value: index };

      // Act
      const result = mappers.mapToSelectOption(value, index, keyName);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
