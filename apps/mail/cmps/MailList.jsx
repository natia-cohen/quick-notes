
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ emails, removeEmail, filterBy, toggleCompose }) {

    return <tbody className={'emails-list'}>
        {emails.map(email =>
            <tr key={email.id}>
                <td>
                    <MailPreview mail={email} email
                        removeEmail={removeEmail}
                        filterBy={filterBy}
                        toggleCompose={toggleCompose} />
                </td>
            </tr>)}
    </tbody>
}
