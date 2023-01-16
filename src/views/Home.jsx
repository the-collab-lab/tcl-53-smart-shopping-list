import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Home({ listToken, setListToken }) {
	const navigate = useNavigate();

	const createToken = async () => {
		const token = await generateToken();

		setListToken(token);
	};

	useEffect(() => {
		if (listToken) {
			navigate('/list');
		}
	}, [listToken, navigate]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{!listToken && <button onClick={createToken}>Create a new list</button>}
		</div>
	);
}
