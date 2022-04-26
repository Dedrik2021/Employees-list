import Spinner from '../../spinner/Spinner';

import './app-filter.scss';

const AppFilter = (props) => {

	const {
		buttons, 
		statusBtn, 
		changeStatus, 
		loading, 
		error
	} = props
	
	const filteredBtns = (arr) => {
		if (error === true) {
			return <button style={{width: '500px', padding: '5px 0', fontWeight: 'bold', fontSize: '24px'}}>Buttons loading Error!!!</button>
		}

		return arr.map(({id, status, name}) => {
			const cssClass = statusBtn === status ? 'btn btn-outline-light' : 'btn btn-light';
			return (
				<button onClick={() => {changeStatus(status)}} key={id} className={cssClass} type="button">
					{name}
				</button>
			);
		});
	}

	const elements = filteredBtns(buttons)
	const spinner = loading ? <Spinner/> : null
	const content = !loading ? elements : null

	return <div className="btn-group"> {spinner} {content}</div>;
};

export default AppFilter;
