import { useState, useEffect, useRef } from 'react';
import { v4 as uuiv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../../employees-list/employees-list';
import EmploeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesService from '../../service/EmployeesService';
import Modal from '../modal/Modal';

import './app.scss';

const App = () => {
	const [employeesData, setEmployeesData] = useState([]);
	const [buttons, setButtons] = useState([]);
	const [term, setTerm] = useState('');
	const [status, setStatus] = useState('all');
	const [loadingBtn, setLoadingBtn] = useState(true);
	const [loadingEmployees, setLoadingEmployees] = useState(true);
	const [errorBtn, setErrorBtn] = useState(false);
	const [errorEmployees, setErrorEmployees] = useState(false);
	const [currencyValue, setCurrencyValue] = useState('');
	const [modal, setModal] = useState(false);
	const [blurContent, setBlurContent] = useState(false);

	const employeesService = new EmployeesService();
	const currencyRefs = useRef([]);
	const nameRefs = useRef();
	const sumRefs = useRef();

	useEffect(() => {
		requestEmployeesData();
	}, []);

	useEffect(() => {
		requestButtons();
	}, []);

	const requestButtons = () => {
		employeesService.getButtons().then(btnLoaded).catch(onErrorBtn);
	};

	const requestEmployeesData = () => {
		employeesService.getEmployees().then(employeesLoaded).catch(onErrorEmployees);
	};

	const btnLoaded = (buttons) => {
		setLoadingBtn(false);
		setButtons(buttons);
	};

	const employeesLoaded = (employeesData) => {
		setEmployeesData(employeesData);
		setLoadingEmployees(false);
	};

	const onErrorEmployees = () => {
		setLoadingEmployees(false);
		setErrorEmployees(true);
	};

	const onErrorBtn = () => {
		setLoadingBtn(false);
		setErrorBtn(true);
	};

	const addItem = (name, currency, image) => {
		const newItem = { id: uuiv4(), name, currency, image, increase: false, like: false };
		const newArray = [...employeesData, newItem];
		employeesService.postEmployees(newItem);
		setEmployeesData(newArray);
	};

	const deleteItem = (id) => {
		const newArray = employeesData.filter((item) => item.id !== id);
		employeesService.deleteEmployees(newArray, id);
		setEmployeesData(newArray);
	};

	const onToggleClass = (id, params) => {
		const elementToUpdate = employeesData.find((employee) => employee.id === id);
		elementToUpdate[params] = !elementToUpdate[params];

		employeesService.changeElement(elementToUpdate);
		setEmployeesData(
			employeesData.map((el) => {
				return el.id === id ? elementToUpdate : el;
			}),
		);
	};

	const onToggleLike = (id) => {
		onToggleClass(id, 'like');
	};

	const onToggleIncrease = (id) => {
		onToggleClass(id, 'increase');
	};

	const changeCurrency = (value) => {
		setCurrencyValue(value);
	};

	const onClickToEnter = (id) => {
		if (!isNaN(currencyValue) && currencyValue !== '' && currencyValue > 0) {
			const elementToUpdate = employeesData.find((item) => item.id === id);
			elementToUpdate.currency = Number(currencyValue);
			employeesService.changeElement(elementToUpdate);
			currencyRefs.current[id].blur();
		} else {
			setModal(true);
			setBlurContent(true);
			currencyRefs.current[id].focus();
		}
	};

	const closeModal = () => {
		setModal(false);
		setBlurContent(false);
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
		setTerm(term);
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
		setStatus(status);
	};

	const employees = employeesData.length;
	const increased = employeesData.filter((item) => item.increase).length;
	const filteredBySearch = search(term, employeesData);
	const filteredByStatus = filterByStatus(status, filteredBySearch);

	let blurCss = {
		filter: 'blur(0)',
	};

	if (blurContent) {
		blurCss = {
			filter: 'blur(10px)',
		};
	}

	return (
		<div className="app">
			{modal ? <Modal closeModal={closeModal} /> : null}
			<div className="blur-content" style={blurCss}>
				<AppInfo increased={increased} employees={employees} />
				<div className="search-panel">
					<SearchPanel changeTerm={changeTerm} term={term} />
					<AppFilter
						changeStatus={changeStatus}
						statusBtn={status}
						buttons={buttons}
						loading={loadingBtn}
						error={errorBtn}
					/>
				</div>

				<EmployeesList
					onToggleLike={onToggleLike}
					onToggleIncrease={onToggleIncrease}
					deleteItem={deleteItem}
					changeCurrency={changeCurrency}
					employeesData={filteredByStatus}
					loading={loadingEmployees}
					error={errorEmployees}
					onClickToEnter={onClickToEnter}
					currencyRefs={currencyRefs}
				/>
				<EmploeesAddForm addItem={addItem} setModal={setModal} nameRefs={nameRefs} sumRefs={sumRefs} setBlurContent={setBlurContent}/>
			</div>
		</div>
	);
};

export default App;
