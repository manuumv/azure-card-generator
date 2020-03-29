import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
require('jest-fetch-mock').enableMocks();

configure({ adapter: new Adapter() });
