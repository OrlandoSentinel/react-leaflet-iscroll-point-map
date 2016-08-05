import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import getFontsAsync from './fonts';

render(<App />, document.getElementById('root'));
getFontsAsync();