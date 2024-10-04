const { useState, useEffect } = React
const { useNavigate } = ReactRouter
const { useParams, useSearchParams } = ReactRouterDOM

import { eMailService } from '../services/emailService.js'
import { SideMenu } from '../cmps/SideManu.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { EmailDetails } from '../cmps/EmailDetails.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

export function MailIndex() {
    const [emails, setEmails] = useState([])
    const [emailsCounter, setEmailsCounter] = useState(0)
    const [composeFlag, setComposeFlag] = useState(false)
    const [keepEmail, setKeepEmail] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(eMailService.getFilterFromSearchParams(searchParams))
    const [mobileMenu, setMobileMenu] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setSearchParams(filterBy)
        eMailService.query(filterBy)
            .then(emailsList => {
                setEmails(emailsList)
                onDisplayUnreadEmailsCnt()
            })
    }, [emailsCounter, filterBy])

    function onDisplayUnreadEmailsCnt() {
        if (filterBy.status === 'sent') return
        eMailService.query(filterBy)
            .then(emailsList => {
                let counter = emailsList.filter(email => !email.isRead).length
                setEmailsCounter(prevCounter => prevCounter = counter)
            })
    }

    function onToggleCompose(email = {}) {
        if (email) setKeepEmail(prevEmail => prevEmail = email)
        setComposeFlag(prevCompose => !prevCompose)
    }

    function onSaveSentEmail(sentEmail) {
        eMailService.saveSendEmail(sentEmail, filterBy)
    }

    function onRemoveEmail(emailId, ev) {
        ev.stopPropagation()
        eMailService.remove(emailId, filterBy)
            .then(() => {
                setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
                navigate('/mail')
            })
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy({ ...newFilter })
    }

    function toggleMenu() {
        setMobileMenu(prev => !prev)
    }

    const screenStyle = mobileMenu ? 'main-screen' : ''

    return <div className='emails-container'>
        <div className={`${screenStyle}`} onClick={() => toggleMenu()}></div>
        <img className='nav-main-icon' src="./assets/img/mail-icons/gmail-icon.png" alt="gmail-icon" />
        <img className='menu-icon' src="./assets/img/mail-icons/menu.png" alt="menu-icon" onClick={() => toggleMenu()} />

        <EmailFilter filterBy={filterBy} onFilter={onSetFilterBy} />

        <SideMenu unreadMails={emailsCounter} toggleCompose={onToggleCompose}
            filterBy={filterBy} onFilter={onSetFilterBy} isMenuActive={mobileMenu} toggleSideMenu={toggleMenu} />

        {params.emailId && <EmailDetails unreadMails={emailsCounter} filterBy={filterBy}
            onDisplayUnreadEmailsCnt={onDisplayUnreadEmailsCnt} removeEmail={onRemoveEmail} />}

        {!params.emailId &&
            <table>
                {emails.length > 0 && <MailList
                    emails={emails} removeEmail={onRemoveEmail}
                    filterBy={filterBy}
                    toggleCompose={onToggleCompose} />}
            </table>}

        {composeFlag && <EmailCompose onKeepEmail={keepEmail} toggleCompose={onToggleCompose} saveSentEmail={onSaveSentEmail} />}

    </div>
}

