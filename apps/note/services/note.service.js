
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
const NOTE_TRASH_KEY = 'note_trashDB'

_createNotes()
export const noteService = {
    query,
    get,
    remove,
    save,
    moveToTrash,
    getDefaultFilter,
    getFilterFromSearchParams,
    updateNote,
    getEmptyNote,
    saveNewNote,
    noteTrash,
    recyclingNote,


}

function query(filterBy = {}) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i');
                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt));
            }
            return notes
        })
}

function get(noteId, storage = NOTE_KEY) {
    return asyncStorageService.get(storage, noteId)
        .then(note => {
            return note
        })
}

function remove(noteId, storage) {
    if (storage === NOTE_KEY) {
        return asyncStorageService.remove(NOTE_KEY, noteId)
    }
    else if (storage === NOTE_TRASH_KEY) {
        return asyncStorageService.remove(NOTE_TRASH_KEY, noteId)
    }
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}
function saveNewNote(note) {
    return asyncStorageService.post(NOTE_KEY, note)
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

function updateNote(note, newTxt) {
    note.info.txt = newTxt

    console.log('note after from service:', note)
    return Promise.resolve(note)
}
function getEmptyNote(title = '', txt = '') {
    return {
        id: utilService.makeId(),
        createdAt: utilService.getCurrentTime(),
        type: 'NoteTxt',
        isPinned: false,
        isRemoved: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title,
            txt,
        }
    }
}

function getDefaultFilter(filterBy = { txt: '', title: '' }) {
    return { txt: filterBy.txt, title: filterBy.title }
}

function moveToTrash(noteId) {
    let notes = storageService.loadFromStorage(NOTE_TRASH_KEY) || []

    return get(noteId, NOTE_KEY)
        .then(note => {

            note.isRemoved = true
            notes.push(note)
            storageService.saveToStorage(NOTE_TRASH_KEY, notes)
            console.log('note after', note)
            return remove(noteId, NOTE_KEY).then(() => note)

        })
}


function recyclingNote(noteId) {
    let notes = storageService.loadFromStorage(NOTE_KEY) || []

    return get(noteId, NOTE_TRASH_KEY)
        .then(note => {
            note.isRemoved = false
            notes.push(note)
            storageService.saveToStorage(NOTE_KEY, notes)
            return remove(noteId, NOTE_TRASH_KEY).then(() => note)
        })
}


function noteTrash() {
    return asyncStorageService.query(NOTE_TRASH_KEY)
        .then(notes => notes)

}


//privet function 
function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY) || [];

    if (notes && notes.length) return;

    const sampleNotes = [
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#f28b82' }, // Red
            info: {
                title: 'Groceries',
                txt: 'Buy milk, eggs, and bread.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: true,
            isRemoved: false,
            style: { backgroundColor: '#fbbc04' }, // Orange
            info: {
                title: 'Meeting Notes',
                txt: 'Discuss project timeline and milestones.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#fff475' }, // Yellow
            info: {
                title: 'To Do',
                txt: 'Clean the house, water the plants.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#ccff90' }, // Light Green
            info: {
                title: 'Books to Read',
                txt: 'The Great Gatsby, 1984, To Kill a Mockingbird.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#a7ffeb' }, // Light Cyan
            info: {
                title: 'Ideas',
                txt: 'Start a blog about technology and coding.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#cbf0f8' }, // Light Blue
            info: {
                title: 'Workout Plan',
                txt: 'Monday: Cardio, Tuesday: Strength, Wednesday: Yoga.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#d7aefb' }, // Purple
            info: {
                title: 'Vacation Packing List',
                txt: 'Clothes, Passport, Camera, Chargers.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#fdcfe8' }, // Pink
            info: {
                title: 'Birthday Party',
                txt: 'Order cake, send invitations, buy decorations.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#e6c9a8' }, // Brown
            info: {
                title: 'Home Renovation',
                txt: 'Paint walls, replace flooring, buy new furniture.'
            }
        },
        {
            id: utilService.makeId(),
            createdAt: utilService.getCurrentTime(),
            type: 'NoteTxt',
            isPinned: false,
            isRemoved: false,
            style: { backgroundColor: '#e8eaed' }, // Gray
            info: {
                title: 'Chores',
                txt: 'Laundry, dishes, vacuum the living room.'
            }
        }
    ]
    notes.push(...sampleNotes);

    storageService.saveToStorage(NOTE_KEY, notes);
}


// function _createNotes() {
//     let notes = storageService.loadFromStorage(NOTE_KEY) || []

//     if (notes && notes.length) return

//     for (let i = 0; i < 10; i++) {
//         const note = {
//             id: utilService.makeId(),
//             createdAt: utilService.getCurrentTime(),
//             type: 'NoteTxt',
//             isPinned: false,
//             isRemoved: false,
//             style: {
//                 backgroundColor: '#fff'
//             },
//             info: {
//                 title: 'NoteTxt',
//                 txt: 'Fullstack Me Baby!'

//             }
//         }
//         notes.push(note)
//     }

//     storageService.saveToStorage(NOTE_KEY, notes)
// }


function _setNextPrevNoteId(note) {
    return asyncStorageService.query(NOTE_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextNoteId = nextNote.id
        note.prevNoteId = prevNote.id
        return note
    })
}
