
export function ColorInput({selectedColor, onSetFooterStyle }) {

    const colors = [
        '#efeff1',
        '#e9e3d4',
        '#f6e2dd',
        '#d3bfdb',
        '#aeccdc',
        '#b4ddd3',
        '#e2f6d3',
        '#fff8b8',
        '#f39f76',
        '#faafa8',
        "#fff"
    ]


    function onSetColor(color) {
        const newStyle = { backgroundColor: color }
        onSetFooterStyle(newStyle)
    }
    
    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${selectedColor.backgroundColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>

        </section >
    )
}