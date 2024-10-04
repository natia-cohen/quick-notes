const { useState } = React

import { noteService } from './../services/note.service.js'

export function NotePreview({ note, onMoveTrash, onRecycling, onStickyNotes }) {

    const [isPinned, setIsPinned] = useState(note.isPinned);

    function handleClick(ev) {
        ev.stopPropagation()
        ev.preventDefault()

        if (ev.target.name === 'remove') {
            console.log('remove')
            onMoveTrash(note.id)
        }

        if (ev.target.name === 'recycling') {
            console.log('recycling')
            onRecycling(note.id)
        }
    }

    function onSelect(ev) {
        ev.stopPropagation()
        ev.preventDefault()

        note.isPinned = !note.isPinned

        noteService.save(note)
            .then(() => {
                setIsPinned(note.isPinned)
                onStickyNotes(note)
            })
    }

    return (
        <article className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
            {!note.isRemoved && (
                <span style={{ cursor: 'pointer' }} onClick={onSelect}>
                    {isPinned ? '★' : '☆'}
                </span>
            )}

            <h3>{note.info.title}</h3>
            <p>{typeof note.info.txt === 'string' ? note.info.txt : ''}</p>
            <span style={{ fontSize: '0.8em', color: '#888' }}>last update {note.createdAt}</span>
            <div className="button-container">
                {note.isRemoved && (
                    <button name='recycling' onClick={handleClick} className="recycling-button">♻️</button>
                )}
                <button name='remove' onClick={handleClick} className="close-button">🗑️</button>
            </div>
        </article>
    )
}