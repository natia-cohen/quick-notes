
const { useState, useEffect, useRef } = React


import { Textbox } from './Textbox.jsx'
import { ColorInput } from "./ColorInput.jsx";

export function NoteEditor({ onSaveNote, setNote, note }) {
    const wrapperRef = useRef(null)
    const [cmpType, setCmpType] = useState('')
    const [selectedColor, setSelectedColor] = useState({
        backgroundColor: '#fff',
    })

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onSaveNote()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)

        }

    }, [note, onSaveNote])


    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [prop]: value
            }
        }))
    }

    function onchangeCmpType(selectedType) {
        console.log('selectedType', selectedType)
        if (selectedType === 'list ') return
        setCmpType(prevType => (prevType === selectedType ? '' : selectedType))
    }

    function onSetFooterStyle(newStyle) {
        setSelectedColor(prevStyle => ({ ...prevStyle, ...newStyle }))

        setNote(prevNote => ({
            ...prevNote,
            style: {
                ...prevNote.style,
                ...newStyle
            }
        }))
    }

    return (
        <div className='note-add-txt'>
            <div style={selectedColor} className='note-add' ref={wrapperRef}>
                <form onSubmit={onSaveNote}>
                    <input
                        style={selectedColor}
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={note.info.title}
                        onChange={handleChange}
                        className='note-title'
                    />
                    <Textbox
                        handleChange={handleChange}
                        value={note.info.txt} />

                    <div className="button-group">

                        <button type='button' className="color-picker-button" onClick={() => onchangeCmpType('color')}>
                            <span className="material-icons">format_color_fill</span>
                        </button>

                        <button className='note-list-button' onClick={() => onchangeCmpType('list')}>
                            <span className="material-icons">list</span>
                        </button>

                        {/* <button className='note-txt-button' onClick={() => onchangeCmpType('textbox')}>
                            <span className="material-icons">description</span>
                        </button> */}
                    </div>

                    <DynamicCmp
                        cmpType={cmpType}

                        selectedColor={selectedColor}
                        onSetFooterStyle={onSetFooterStyle}
                    />

                </form>
            </div>
        </div>
    )

}

function DynamicCmp(props) {
    console.log(props)
    switch (props.cmpType) {
        case 'color':
            return <ColorInput {...props} />
        // case 'textbox':
        //     return <Textbox  {...props} />

    }
}

