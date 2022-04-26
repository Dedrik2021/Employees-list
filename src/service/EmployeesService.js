class EmployeesService {
    _apiBase = 'http://localhost:3001/items';

    getEmployees = async () => {
        const response = await fetch(this._apiBase);
        if (!response.ok) {
            throw new Error('Employees data not found!!!')
        }
        return await response.json();
    };

    getButtons = async () => {
        const response = await fetch(`${'http://localhost:3001/buttons'}`);
        if (!response.ok) {
            throw new Error('Buttons data not found!!!')
        }
        return await response.json();
    };

    postEmployees = async (newArray) => {
        const response = await fetch(this._apiBase, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newArray),
        });
        if (!response.ok) {
            throw new Error('The employee was not add to server!!!')
        }
        return await response.json();
    };

    deleteEmployees = async (newArray, id) => {
        const response = await fetch(`${this._apiBase}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newArray),
        });
        if (!response.ok) {
            throw new Error('The employee was not deleted from server!!!')
        }
        return await response.json();
    };

    putEmployees = async (elementToUpdate) => {
        const response = await fetch(`${this._apiBase}/${elementToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(elementToUpdate),
        });
        if (!response.ok) {
            throw new Error('The employee was not changed on server!!!')
        }
        return await response.json();
    };
}

export default EmployeesService;
