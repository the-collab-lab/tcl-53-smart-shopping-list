import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';
import { getItemData, streamListItems } from '../api';
import FormModal from '../components/FormModal';

export function Home({ listToken, setListToken }) {
	const [existingToken, setExistingToken] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [displayForm, setDisplayForm] = useState(false);

	const navigate = useNavigate();

	const createToken = async () => {
		console.log('Creating lists is no longer supported');
	};

	useEffect(() => {
		if (listToken) {
			navigate('/list');
		}
	});

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
			if (nextData) {
				setListToken(caseSensitiveToken);
			} else {
				setErrorMessage("List doesn't exist");
			}
		});
	};

	function openForm() {
		setDisplayForm(true);
	}

	function closeForm() {
		setDisplayForm(false);
	}

	return (
		<div className="h-screen flex flex-col items-center justify-between pt-[25%] relative">
			<div className="flex flex-col items-center gap-6">
				<img src="/img/logo.svg" alt="Shroomy logo" className="w-20" />
				<h1 className="text-6xl font-logo -my-2">Shroomy</h1>
				<p className="text-2xl font-logo text-center px-5">
					your groovy shopping companion
				</p>

				<div className="flex flex-col items-center gap-6 mt-6">
					<button
						onClick={createToken}
						className="bg-main-darkest text-white border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-white hover:text-main-darkest hover:border-main-darkest"
					>
						Create a new list
					</button>

					<button
						className="bg-white text-main-darkest border-[1.5px] border-main-darkest rounded-3xl shadow-[0_4px_4px_rgba(0,0,0,0.4)] py-2 px-12 hover:bg-main-darkest hover:text-white"
						onClick={openForm}
					>
						Join Existing List
					</button>

					{displayForm &&
						ReactDOM.createPortal(
							<FormModal
								handleSubmit={handleSubmit}
								existingToken={existingToken}
								handleChange={handleChange}
								closeForm={closeForm}
								errorMessage={errorMessage}
							/>,
							document.getElementById('overlay-root'),
						)}
				</div>
			</div>

			<div className="bg-[url('/img/home-bg.svg')] w-full h-[20rem] bg-cover"></div>
			<ArchivalNoticeModal />
		</div>
	);
}
