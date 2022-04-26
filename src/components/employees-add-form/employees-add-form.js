import { useState, useRef } from 'react';

import './employees-add-form.scss';

const EmployeesAddForm = ({addItem}) => {
	const [employeesName, setEmployeesName] = useState('')
	const [currencySum, setCurrencySum] = useState('')

	const itemRefs = useRef()

	const createName = (e) => {
		setEmployeesName(e.target.value)
	};

	const getCurrencySum = (e) => {
		setCurrencySum(e.target.value)
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (employeesName !== '' && currencySum !== '') {
			addItem(employeesName, currencySum);
			setCurrencySum('')
			setEmployeesName('')
			itemRefs.current.focus()
		}
	};

	return (
		<div className="app-add-form">
			<h3>Add a new employee</h3>
			<form onSubmit={onSubmit} className="add-form d-flex">
				<label htmlFor="name"></label>
				<input
					value={employeesName}
					onChange={createName}
					ref={itemRefs}
					type="text"
					className="form-control new-post-label"
					placeholder="What's his name?"
					name="[add-employees]text"
					id="name"
				/>
				<label htmlFor="salary"></label>
				<input
					value={currencySum}
					onChange={getCurrencySum}
					type="number"
					className="form-control new-post-label"
					placeholder="Salary in kč?"
					name="[add-employees]number"
					id="salary"
				/>

				<button type="submit" className="btn btn-outline-light">
					Add Employee
				</button>
			</form>
		</div>
	);	
}

export default EmployeesAddForm;
