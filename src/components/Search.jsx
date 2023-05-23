export default function Search(props) {
    return (
        <div className="search--wrapper">
            <form className="search--form" action="">
                <input 
                    className="search--input" 
                    placeholder="Finn pokemon..." 
                    value={props.query} 
                    type="name" 
                    onChange={props.handleOnChange}
                />
                <button className="search--btn">Finn pokemon!</button>
            </form>
        </div>
    )
}
