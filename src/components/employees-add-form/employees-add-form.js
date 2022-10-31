import { useState } from 'react';

import './employees-add-form.scss';

const EmployeesAddForm = (props) => {
	const { addItem, setModal, nameRefs, sumRefs, setBlurContent } = props;
	const [employeesName, setEmployeesName] = useState('');
	const [currencySum, setCurrencySum] = useState('');
	const [imageInput, setImageInput] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (!isNaN(currencySum) && currencySum > 0) {
			addItem(employeesName, currencySum, imageInput);
			setCurrencySum('');
			setEmployeesName('');
			nameRefs.current.focus();
		} else {
			setModal(true);
			setBlurContent(true);
			sumRefs.current.focus();
		}
	};

	const previewFile = (e) => {
		let reader = new FileReader()
		const files = e.target.files
		const file = files[0]
		reader.readAsDataURL(file)
		reader.onload = () => {
			setImageInput(reader.result)
		}
	}

	return (
		<div className="app-add-form">
			<h3>Add a new employee</h3>
			<form onSubmit={onSubmit} className="add-form d-flex">

				<input type="file" onChange={(e) => previewFile(e)} />

				<label htmlFor="name"></label>
				<input
					value={employeesName}
					onChange={(e) => setEmployeesName(e.target.value)}
					ref={nameRefs}
					type="text"
					className="form-control new-post-label"
					placeholder="What's his name?"
					name="[add-employees]text"
					id="name"
				/>
				<label htmlFor="salary"></label>
				<input
					value={currencySum}
					onChange={(e) => setCurrencySum(e.target.value)}
					type="text"
					className="form-control new-post-label"
					placeholder="Salary in kč?"
					name="[add-employees]number"
					id="salary"
					ref={sumRefs}
				/>

				<button type="submit" className="btn btn-outline-light">
					Add Employee
				</button>
			</form>
		</div>
	);
};

export default EmployeesAddForm;
