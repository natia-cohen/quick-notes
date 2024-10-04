
import { eMailService } from "../../mail/services/emailService.js"

const { useEffect, useState } = React
const { Link, useParams } = ReactRouterDOM

export function EmailDetails({ onDisplayUnreadEmailsCnt, removeEmail, filterBy }) {
    const [email, setEmail] = useState({})
    const params = useParams()

    useEffect(() => {
        if (!params.emailId) return
        eMailService.get(params.emailId, filterBy)
            .then(email => {
                setEmail(email)
                onDisplayUnreadEmailsCnt()
            })
    }, [])

    return <div className='email-details'>
        <div className='email-details-actions'>
            <Link to={'/mail/'}>
                <button>
                    <img className='icon' src="./assets/img/mail-icons/back-arrow.png" alt="" />
                </button>
            </Link>
            <button onClick={(ev) => removeEmail(email.id, ev)}>
                <img className='icon-trash' src="./assets/img/mail-icons/trash.png" alt="" />
            </button>
        </div>

        <h3>Subject: {email.subject}</h3>
        <p>From: {email.from}</p>
        <p>To: {email.to}</p>
        <p className='mail-content'>{email.body}</p>
    </div>


}