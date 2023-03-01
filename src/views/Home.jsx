import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { getItemData, streamListItems } from '../api';

import './Home.css';

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
		const caseSensitiveToken = existingToken.toLowerCase();

		// conects to db
		// checks if the token that user inputted is associated with any lists
		streamListItems(caseSensitiveToken, (snapshot) => {
			const nextData = getItemData(snapshot);

			// if there is a list, set the token to the listToken state
			if (nextData.length > 0) {
				setListToken(caseSensitiveToken);
			} else {
				setErrorMessage("List doesn't exist");
			}
		});
	};

	return (
		<div className="Home h-screen flex flex-col items-center justify-around pt-8">
			<div className="flex flex-col items-center gap-6">
				<img src="/img/logo.svg" alt="Shroomy logo" className="w-20 mt-6" />
				<h1 className="text-6xl font-logo -my-2">Shroomy</h1>
				<p className="text-2xl font-logo">your groovy shopping companion</p>

				<div className="flex flex-col items-center gap-6 mt-6">
					<button
						onClick={createToken}
						className="bg-main-darkest text-white py-2 px-12 rounded-3xl shadow-lg hover:bg-white hover:text-main-darkest hover:border-main-darkest hover:border-[1.5px]"
					>
						Create a new list
					</button>

					<button className="bg-white text-main-darkest py-2 px-12 border-[1.5px] border-main-darkest rounded-3xl shadow-lg hover:bg-main-darkest hover:text-white">
						Join Existing List
					</button>

					<form onSubmit={handleSubmit}>
						<label htmlFor="existingToken">
							Join an existing list
							<input
								type="text"
								id="existingToken"
								value={existingToken}
								onChange={handleChange}
								required
							/>
						</label>

						<button type="submit">Submit</button>
					</form>

					{errorMessage && <p>{errorMessage}</p>}
				</div>
			</div>

			<div className="bg-[url('/img/home-bg.svg')] w-full h-64 mb-6"></div>
		</div>
	);
}
