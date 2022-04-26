import './employees-list-item.scss';

const EmployeesListItem = (props) => {
	const { 
		increase, 
		like, 
		onToggleLike, 
		id, 
		name, 
		currency, 
		onToggleIncrease 
	} = props;

	let classNames = 'list-group-item';
	if (increase) classNames += ' increase';
	if (like) classNames += ' like';

	return (
		<li className={`${classNames} d-flex justify-content-between`}>
			<span
				onClick={() => {
					onToggleLike(id);
				}}
				className="list-group-item-label"
			>
				{name}
			</span>
			<label htmlFor="currency"></label>
			<input
				type="text"
				className="list-group-item-input"
				defaultValue={currency + ' kč'}
				name="[employees-list]text"
				id="currency"
			/>
			<div className="d-flex justify-content-center align-items-center">
				<button
					onClick={() => {
						onToggleIncrease(id);
					}}
					type="button"
					className="btn-cookie btn-sm "
				>
					<i className="fas fa-cookie"></i>
				</button>

				<button
					type="button"
					onClick={() => {
						props.deleteItem(id);
					}}
					className="btn-trash btn-sm "
				>
					<i className="fas fa-trash"></i>
				</button>
				<i className="fas fa-star"></i>
			</div>
		</li>
	);
};

export default EmployeesListItem;
