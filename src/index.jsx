import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.css';

const root = createRoot(document.getElementById('root'));
console.log(root);
root.render(<App />);
