import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Home({ listToken, setListToken }) {
	const [existingToken, setExistingToken] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const createToken = async () => {
		const token = await generateToken();

		setListToken(token);
	};

	useEffect(() => {
		if (listToken) {
			navigate('/list');
		}
	}, [listToken]);

	const handleChange = (e) => {
		setExistingToken(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// if list doesn't exist, show error message
		if (!listToken) {
			setErrorMessage("List doesn't exist");
		}
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

			{!listToken && (
				<div>
					<button onClick={createToken}>Create a new list</button>

					<form onSubmit={handleSubmit}>
						<label htmlFor="existingToken">
							Join an existing list
							<input
								type="text"
								id="existingToken"
								value={existingToken}
								onChange={handleChange}
							/>
						</label>

						<button type="submit">Submit</button>
					</form>

					{errorMessage.length > 0 && <p>{errorMessage}</p>}
				</div>
			)}
		</div>
	);
}
