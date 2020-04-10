import * as React from 'react';
import { shallow } from "enzyme";
import { CardGeneratorContainer } from './cardGenerator.container';
import { CardPageComponent, FilterComponent, SelectOptionsComponent, TopBarComponent } from './components';

describe('cardGeneratorContainer' , () => {
  it('should render the expected component', async() => {
      // Act
      const container = shallow(<CardGeneratorContainer />);
      const selectOptions = container.find(SelectOptionsComponent);
      const filter = container.find(FilterComponent);
      const cardPage = container.find(CardPageComponent);
      const toolbar = container.find(TopBarComponent);

      // Assert
      expect(selectOptions.length).toBe(1);
      expect(cardPage.length).toBe(1);
      expect(filter.length).toBe(1);
      expect(toolbar.length).toBe(1);
  });
});
