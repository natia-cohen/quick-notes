export function Listbox({ handleChange, name, selectedOption, options }) {

    function onSelectOption(event) {
        handleChange({ target: { name, value: event.target.value, type: 'select' } })
    }

    return (
        <select
            className='note-list'
            name={name}
            value={selectedOption}
            onChange={onSelectOption}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}