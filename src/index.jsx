import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.css';

console.log('ran');
console.log(document.getElementById('root'));

const root = createRoot(document.getElementById('root'));
root.render(<App />);
