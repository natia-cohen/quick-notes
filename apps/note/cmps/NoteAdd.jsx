const { useState, useEffect} = React
const { useNavigate } = ReactRouter


import { noteService } from './../services/note.service.js'
import { NoteEditor } from './NoteEditor.jsx'

export function NoteAdd({ onLoad,setIsEditing,isEditing}) {

    const [note, setNote] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect(() => {
        console.log('isEditing changed:', isEditing)
    }, [isEditing])

     function handleNewNoteClick(event){
        event.stopPropagation()
        setIsEditing(!isEditing)
    }

    function onSaveNote() {
        if (note.info.txt === '') return

         noteService.saveNewNote(note)
            .then(() => {
                setNote(noteService.getEmptyNote())
                setIsEditing(false)
            })
            .catch(() => {
                alert('Could not save the note');
            })
            .finally(() => {
                onLoad()
                navigate('/note')
            })
    }

  

    return ( 
        <section>
            {isEditing && <NoteEditor onSaveNote={onSaveNote} setNote={setNote} note={note} />}
            {!isEditing && (
                <div className="note-box new-note" onClick={handleNewNoteClick}>
                    new note...
                </div>
            )}
        </section>

    )

}






// const { useState, useEffect, useRef } = React
// const { useParams, useNavigate } = ReactRouter

// import { Textbox } from './Textbox.jsx'
// import { noteService } from './../services/note.service.js'
// import { ColorInput } from "./ColorInput.jsx";

// export function NoteAdd({ onLoad }) {
//     const [cmpType, setCmpType] = useState('')
//     const [note, setNote] = useState(noteService.getEmptyNote())


 
//     const wrapperRef = useRef(null)

//     const [selectedColor, setSelectedColor] = useState({
//         backgroundColor: '#fff',
//     })


//     function onSaveNote() {
//         if (note.info.txt === '') return;

     

//         noteService.saveNewNote(note)
//             .then(() => {
               
//                 setNote(noteService.getEmptyNote())
            
//             })
//             .catch(() => {
//                 alert('Could not save the note');
//             })
//             .finally(() => {
        
//                 onLoad()

//             })
//     }

//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//                 onSaveNote()
//             }
//         }

  
//             document.addEventListener('mousedown', handleClickOutside)
//             return () => {
//                 document.removeEventListener('mousedown', handleClickOutside)
               
//             }
      
//     }, [note])


//     function handleChange({ target }) {
//         const { type, name: prop } = target
//         let { value } = target

//         switch (type) {
//             case 'range':
//             case 'number':
//                 value = +value
//                 break
//             case 'checkbox':
//                 value = target.checked
//                 break
//         }
          
//         setNote(prevNote => ({
//             ...prevNote,
//             info: {
//                 ...prevNote.info,
//                 [prop]: value
//             }
//         }))
//     }

//     function onchangeCmpType(selectedType) {
//         setCmpType(prevType => (prevType === selectedType ? '' : selectedType))
//     }

//     function onSetFooterStyle(newStyle) {
//         setSelectedColor(prevStyle => ({ ...prevStyle, ...newStyle }))

//         setNote(prevNote => ({
//             ...prevNote,
//             style: {
//                 ...prevNote.style,
//                 ...newStyle
//             }
//         }))
//     }


//     return (
//         <div className='note-add-txt'>
//             <div style={selectedColor} className='note-add' ref={wrapperRef}>
//                 <form onSubmit={onSaveNote}>
//                     <input
//                         style={selectedColor}
//                         type='text'
//                         name='title'
//                         placeholder='Title'
//                         value={note.info.title}
//                         onChange={handleChange}
//                         className='note-title'
//                     />
//                     <Textbox className='note-text' handleChange={handleChange} name='txt' value={note.info.txt}  />

//                     <button type='button' className="color-picker-button" onClick={() => onchangeCmpType('color')}>
//                         <i className="fas fa-palette"></i>
//                     </button>

//                     <DynamicCmp selectedColor={selectedColor} cmpType={cmpType} onSetFooterStyle={onSetFooterStyle} />
//                 </form>
//             </div>
//         </div>
//     )


// }

// function DynamicCmp(props) {

//     switch (props.cmpType) {
//         case 'color':
//             return <ColorInput {...props} />

//     }
// }

