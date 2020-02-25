import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
require('jest-fetch-mock').enableMocks()

// Setup enzyme's react adapter
configure({ adapter: new Adapter() });
