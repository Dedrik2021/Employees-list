import { useState, useEffect } from 'react';
import { v4 as uuiv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../../employees-list/employees-list';
import EmploeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesService from '../../service/EmployeesService';

import './app.scss';

const App = () => {

	const [employeesData, setEmployeesData] = useState([])
	const [buttons, setButtons] = useState([])
	const [term, setTerm] = useState('')
	const [status, setStatus] = useState('all')
	const [loadingBtn, setLoadingBtn] = useState(true)
	const [loadingEmployees, setLoadingEmployees] = useState(true)
	const [errorBtn, setErrorBtn] = useState(false)
	const [errorEmployees, setErrorEmployees] = useState(false)

	const employeesService = new EmployeesService()

	useEffect(() => {
		requestEmployeesData()
	}, [])

	useEffect(() => {
		requestButtons()
	}, [])

	const requestButtons = () => {
		employeesService.getButtons().then(btnLoaded).catch(onErrorBtn)
	}

	const requestEmployeesData = () => {
		employeesService.getEmployees().then(employeesLoaded).catch(onErrorEmployees)
	}

	const btnLoaded = (buttons) => {
		setLoadingBtn(false)
		setButtons(buttons)
	}

	const employeesLoaded = (employeesData) => {
		setEmployeesData(employeesData)
		setLoadingEmployees(false)
	}

	const onErrorEmployees = () => {
		setLoadingEmployees(false)
		setErrorEmployees(true)
	}

	const onErrorBtn = () => {
		setLoadingBtn(false)
		setErrorBtn(true)
	}

	const addItem = (name, currency) => {
		const newItem = { id: uuiv4(), name: name, currency: currency, increase: false, like: false };
		const newArray = [...employeesData, newItem];
		employeesService.postEmployees(newItem)
		setEmployeesData(newArray)
	};

	const deleteItem = (id) => {
		const newArray = employeesData.filter(item => item.id !== id)
		employeesService.deleteEmployees(newArray, id)
		setEmployeesData(newArray)
	};

	const onToggleClass = (id, params) => {
		const elementToUpdate = employeesData.find(employee => employee.id === id)
		elementToUpdate[params] = !elementToUpdate[params]

		employeesService.putEmployees(elementToUpdate)
		setEmployeesData(employeesData.map((el) => {
			return el.id === id ? elementToUpdate : el
		}))
	};

	const onToggleLike = (id) => {
		onToggleClass(id, 'like');
	};

	const onToggleIncrease = (id) => {
		onToggleClass(id, 'increase');
	};

	const search = (term, items) => {
		if (term.trim().length === 0) {
			return items;
		}

		return items.filter((item) => {
			if (item.name.toLowerCase().indexOf(term.toLowerCase().trim()) > -1) {
				return true;
			}
		});
	};

	const changeTerm = (term) => {
		setTerm(term)
	};

	const filterByStatus = (status, items) => {
		switch (status) {
			case 'all':
				return items;
			case 'increase':
				return items.filter((item) => item.increase === true);
			case 'salary':
				return items.filter((item) => item.currency > 50000);
			case 'marked':
				return items.filter((item) => item.like === true);
			default:
				return items;
		}
	};

	const changeStatus = (status) => {
		setStatus(status)
	};

	const employees = employeesData.length;
	const increased = employeesData.filter((item) => item.increase).length;
	const filteredBySearch = search(term, employeesData);
	const filteredByStatus = filterByStatus(status, filteredBySearch);

	return (
		<div className="app">
			<AppInfo increased={increased} employees={employees} />
			<div className="search-panel">
				<SearchPanel changeTerm={changeTerm} term={term} />
				<AppFilter changeStatus={changeStatus} statusBtn={status} buttons={buttons} loading={loadingBtn} error={errorBtn} />
			</div>
			
			<EmployeesList
				onToggleLike={onToggleLike}
				onToggleIncrease={onToggleIncrease}
				deleteItem={deleteItem}
				employeesData={filteredByStatus}
				loading={loadingEmployees}
				error={errorEmployees}
			/>
			<EmploeesAddForm addItem={addItem} />
		</div>
	);			
}	

export default App;
