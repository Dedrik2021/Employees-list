const Spinner = () => {
    return (
        <div className="spinner-border mx-auto mt-5" role="status" style={{color: 'white'}} >
            <span className="visually-hidden" style={{opacity: '0'}}>Loading...</span>
        </div>
    )
}

export default Spinner;