const { useState, useEffect } = React
const { useNavigate } = ReactRouter


import { noteService } from './../services/note.service.js'
import { Textbox } from './Textbox.jsx'

export function NoteEdit({ noteId, onClose }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect(() => {
        if (noteId && noteId !== 'search' && noteId !== 'trash') {
            noteService.get(noteId).then(setNote)
        }
    }, [noteId])


    function onSaveNote(ev) {
        ev.preventDefault()

        noteService.save(note)
            .then(() => {
                console.log('Note saved successfully')
                navigate(`/note`)
                onClose()
            })
            .catch(() => {
                alert('Could not save the note')
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target
        console.log('value', value)

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

    return (
        <dialog open={true} className="note-dialog" onClick={(ev) => ev.stopPropagation()}>
            <form onSubmit={onSaveNote} >
                <Textbox handleChange={handleChange} name="txt" txt={note.info.txt} />
                <button onClick={onClose} className="close-edit-button">x</button>
                <button>Save</button>
            </form>
        </dialog>
    )
}
