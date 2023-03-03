import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function FormModal({
	handleSubmit,
	closeForm,
	existingToken,
	handleChange,
	errorMessage,
}) {
	return (
		<div className="bg-[rgba(0,0,0,0.4)] w-screen h-screen flex justify-center items-center fixed">
			<form
				onSubmit={handleSubmit}
				className="bg-white h-64 flex flex-col items-start justify-center gap-4 rounded-md px-10"
			>
				<FontAwesomeIcon
					icon={faXmark}
					className="text-xl self-end cursor-pointer hover:text-main -mr-5"
					onClick={closeForm}
				></FontAwesomeIcon>
				<label htmlFor="existingToken" className="text-xl font-bold">
					Want to join an existing list?
					<p className="text-base font-normal mb-6">
						Enter the list's three word token below
					</p>
					<input
						type="text"
						id="existingToken"
						value={existingToken}
						onChange={handleChange}
						required
						className="text-base font-normal w-[90%] border-main border-2 mb-4 p-2"
					/>
				</label>

				<div className="flex items-center gap-6">
					<button
						type="submit"
						className="text-white bg-main-darkest border-[1.5px] border-main-darkest rounded-3xl py-2 px-8 mb-2 hover:bg-white hover:text-main-darkest hover:border-main-darkest hover:border-[1.5px]"
					>
						Submit
					</button>

					{errorMessage && (
						<p className="text-overdue text-sm mb-2">{errorMessage}</p>
					)}
				</div>
			</form>
		</div>
	);
}
