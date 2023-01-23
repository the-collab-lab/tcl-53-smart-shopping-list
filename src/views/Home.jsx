import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getItemData, streamListItems } from '../api';

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

		// conects to db
		// checks if the token that user inputted is associated with any lists
		streamListItems(existingToken, (snapshot) => {
			const nextData = getItemData(snapshot);

			// if there is a list, set the token to the listToken state
			if (nextData.length > 0) {
				setListToken(existingToken);
			} else {
				setErrorMessage("List doesn't exist");
			}
		});
	};
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>

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
		</div>
	);
}
