import './modal.scss';

const Modal = ({ closeModal }) => {
	return (
		<div className="modal-field">
			<span className="modal-field gradient"></span>
			<div className="modal-field block">
				<h1 className="modal-field title">The field is filled in incorrectly !!!</h1>
				<div className="modal-field text">
					<p>The field must contain: NUMBERS, and should not contain: SPACES !!!</p>
					<p>Check the input field !</p>
				</div>
				<button tabIndex='0' type='button' className="modal-field button" onClick={closeModal}>
					OK
				</button>
			</div>
		</div>
	);
};

export default Modal;
