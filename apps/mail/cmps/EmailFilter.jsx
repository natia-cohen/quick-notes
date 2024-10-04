const { useState, useEffect } = React

export function EmailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const { txt } = filterByToEdit

    function handleChange({ target }) {
        const { name, type } = target
        let value = (type === 'checkbox') ? target.checked : target.value
        setFilterByToEdit(prevFilterBy =>
            ({ ...prevFilterBy, [name]: value })
        )
    }

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    return <div className='email-search-container'>
        <input
            type="text"
            name='txt'
            className='email-search-input'
            value={txt}
            onChange={handleChange}
        />

        <div className='sorting-container'>
            <label htmlFor="subject">
                <input id='subject' type="checkbox"
                    name='subject'

                    onChange={handleChange} />
                <span className='sort-by-subject'>
                    <span className="arrow">^</span>
                    Subject
                </span>
            </label>

            <label htmlFor="sentAt">
                <input id='sentAt' type="checkbox"
                    name='sentAt'

                    onChange={handleChange} />
                <span className='sort-by-sentAt'>
                    <span className="arrow">^</span>
                    Date
                </span>
            </label>
        </div>

        <div className='radio-inputs'>
            <label className="radio">
                <input id='all'
                    value='all'
                    type="radio"
                    name="isRead"
                    onChange={handleChange} />
                <span className={`name`}>All</span>
            </label>

            <label className="radio">
                <input id='unread'
                    value='unread'
                    type="radio"
                    name="isRead"
                    onChange={handleChange} />
                <span className={`name`}>Unread</span>
            </label>

        </div>

    </div>

}