type ErrorMessageProps = {
	message: string;
	handleClose: () => void;
};

const ErrorMessage = ({ message, handleClose }: ErrorMessageProps) => {
	return (
		<div className="modal" onClick={handleClose}>
			<div
				className="modal-content"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2>{`${message}`}</h2>
			</div>
		</div>
	);
};

export default ErrorMessage;
