
import { eMailService } from "../services/emailService.js"
import { noteService } from "../../note/services/note.service.js"

const { useState, useEffect } = React
const { useNavigate } = ReactRouter
const { useSearchParams } = ReactRouterDOM

export function EmailCompose({ toggleCompose, saveSentEmail, onKeepEmail }) {
    const [searchParams, setSearchParams] = useSearchParams({ compose: 'new' })
    const [composeStatus, setComposeStatus] = useState(searchParams)
    const navigate = useNavigate()

    const [newEmail, setNewEmail] = useState(
        onKeepEmail.id ?
            onKeepEmail : {
                from: eMailService.getLoggedInUser().email,
                to: '',
                subject: '',
                body: '',
                sentAt: new Date()
            })

    const { from, to, subject, body } = newEmail

    useEffect(() => {
        setSearchParams(composeStatus)
    }, [newEmail])

    function handleChange({ target }) {
        const { value, name: prop } = target
        setNewEmail((prevEmail) => ({ ...prevEmail, [prop]: value }))
    }

    function onSaveEmail(ev) {
        ev.preventDefault()
        if (onKeepEmail.id) onSaveToKeep()
        else {
            saveSentEmail(newEmail)
            toggleCompose()
            navigate('/mail')
        }
    }

    function onSaveToKeep() {
        console.log('newEmail:', newEmail)
        const newNote = noteService.getEmptyNote()

        newNote.id = newEmail.id
        newNote.info.title = newEmail.subject
        newNote.info.txt = newEmail.body

        console.log('newNote:', newNote)
        noteService.saveNewNote(newNote)

        toggleCompose()
    }

    return <section className='compose-container'>
        <form className='compose-form' onSubmit={onSaveEmail}>
            <div className='compose-modal'>
                <button onClick={() => toggleCompose()} className='btn-close-compose'>x</button>
                <p className='sent-email-header'>{onKeepEmail.id ? 'Send to keep' : 'New Message'}</p>

                <div className='input-area'>
                    <div className='sent-from'>
                        <label htmlFor='from'>From:</label>
                        <input
                            placeholder=''
                            name='from'
                            type='text'
                            id='from'
                            value={from}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        placeholder='To'
                        name='to'
                        type='text'
                        id='to'
                        value={to}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    <input
                        placeholder='Subject'
                        name='subject'
                        type='text'
                        id='subject'
                        value={subject}
                        onChange={handleChange}
                        autoComplete='off'
                    />

                    <textarea
                        name='body'
                        cols='30'
                        rows='15'
                        value={body}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button className='sent-email-btn'>Send</button>
            </div>
        </form>
    </section>
}