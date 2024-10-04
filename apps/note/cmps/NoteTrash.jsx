const { useState, useEffect } = React
import { noteService } from './../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'

export function NoteTrash({ onLoad }) {
    const [notesTrash, setNotesTrash] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.noteTrash()
            .then(notes => {
                console.log('notes from noteService:', notes)
                setNotesTrash(notes);
                console.log('notesTrash', notesTrash)
            })
            .catch(err => console.error('Error fetching notes:', err))
    }

    function onRecycling(noteId) {
        noteService.recyclingNote(noteId)
            .then(() => {
                setNotesTrash(prevNots => prevNots.filter(note => note.id != noteId))
                onLoad()
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onMoveTrash(noteId) {

        noteService.remove(noteId, 'note_trashDB')
            .then(() => {
                setNotesTrash(prevNots => prevNots.filter(note => note.id != noteId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    return (
        <section className="note-trash-list">
            {notesTrash.length > 0 ? notesTrash.map(note => (
                <div key={note.id} className="note">
                    <NotePreview note={note} onMoveTrash={onMoveTrash} onRecycling={onRecycling} />
                </div>
            )) : <p>No notes in trash</p>}
        </section>
    )
}


