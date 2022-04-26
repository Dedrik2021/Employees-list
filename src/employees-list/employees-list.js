import EmployeesListItem from '../employees-list-item/employees-list-item';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../components/app/errorMessage/ErrorMessage';

const EmployeesList = (props) => {

	const { 
		onToggleLike, 
		onToggleIncrease, 
		deleteItem, 
		employeesData, 
		error, 
		loading 
	} = props;

	const elements = employeesData.map((el) => {
		return (
			<EmployeesListItem
				key={el.id}
				{...el}
				onToggleLike={onToggleLike}
				onToggleIncrease={onToggleIncrease}
				deleteItem={deleteItem}
				/>
		);
	});

	const spinner = loading ? <Spinner/> : null
	const errorMessage = error ? <ErrorMessage/> : null
	const content = !(loading || error) ? elements : null
	
	return (
		<ul className="app-list list-group">
			{content},
			{errorMessage},
			{spinner}
		</ul>
	)
};

export default EmployeesList;
