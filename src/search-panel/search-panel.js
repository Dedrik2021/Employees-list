import { useEffect, useRef } from 'react'

import './search-panel.scss'

const SearchPanel = ({changeTerm, term}) => {

    const itemRefs = useRef()

    useEffect(() => {
		itemRefs.current.focus()
	}, [])

    return (
        <label htmlFor="search"></label>,
        <input 
            value={term}
            onChange={(e) => {changeTerm(e.target.value)}}
            type="text"
            ref={itemRefs}
            className="form-control search-input" 
            placeholder='Find an employee'
            id="search"
            name="[search-panel]text"
        />
    )
}

export default SearchPanel