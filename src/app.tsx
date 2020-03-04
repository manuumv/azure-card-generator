import * as React from 'react';
import { CardGeneratorContainer } from './containers/cardGenerator/cardGenerator.container';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

setConfig({
   reloadHooks: false,
});

export const App: React.FunctionComponent = hot(() => <CardGeneratorContainer />)
