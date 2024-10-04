import { asyncStorageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

const EMAIL_KEY = 'emailsDB'
const SENT_EMAIL_KEY = 'sentEmailsDB'

_createEmailsList()

export const eMailService = {
    query,
    get,
    save,
    remove,
    saveSendEmail,
    getFilterFromSearchParams,
    getLoggedInUser
}

window.ems = eMailService

function query(filterBy = {}) {
    return asyncStorageService.query(_getCurrDBKey(filterBy.status))
        .then(emails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email =>
                    regExp.test(email.from) || regExp.test(email.body) ||
                    regExp.test(email.subject)
                )
            }
            if (filterBy.isRead === 'unread') {
                emails = emails.filter(email => !email.isRead)

            }
            if (filterBy.isRead === 'all') {
                emails = emails.filter(email => email.id)
            }
            if (filterBy.subject) {
                emails = _sortBySubject(emails, 'subject')
            }
            if (filterBy.sentAt === true || filterBy.sentAt === false) {
                emails = _sortByDate(emails, 'sentAt', filterBy.sentAt)
            }

            return emails
        })
}

function getLoggedInUser() {
    return {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
}

function get(mailId, filterBy) {
    return asyncStorageService.get(_getCurrDBKey(filterBy.status), mailId)
        .then(mail => {
            // mail = _setNextPrevMailId(mail)
            return mail
        })
}

function save(email, filterBy) {

    if (email.id) {
        return asyncStorageService.put(_getCurrDBKey(filterBy.status), email)
    }
    else {
        return asyncStorageService.post(_getCurrDBKey(filterBy.status), email)
    }
}

function remove(email, filterBy) {
    return asyncStorageService.remove(_getCurrDBKey(filterBy.status), email)
}

function saveSendEmail(email) {
    const currEmail = _createEmail(email)
    return asyncStorageService.post(SENT_EMAIL_KEY, currEmail)
}

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || 'inbox',
        txt: searchParams.get('txt') || '',
        isRead: searchParams.get('isRead') || 'all',
        subject: searchParams.get('subject') || '',
        sentAt: searchParams.get('sentAt') || 'true',
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~ LOCAL FUNC ~~~~~~~~~~~~~~~~

function _getCurrDBKey(filterBy) {
    var keyDB = ''
    if (filterBy === '' || filterBy === 'inbox')
        keyDB = 'emailsDB'
    else if (filterBy === 'sent') keyDB = 'sentEmailsDB'
    return keyDB
}

function _sortBySubject(emails, keyWord) {
    return emails.sort((a, b) => a[keyWord].localeCompare(b[keyWord], 'en', { sensitivity: 'base' }))
}

function _sortByDate(emails, keyWord, dir) {
    if (dir)
        return emails.sort((a, b) => {
            const dateA = new Date(a[keyWord])
            const dateB = new Date(b[keyWord])
            return dateB - dateA
        })
    else {
        return emails.sort((a, b) => {
            const dateA = new Date(a[keyWord])
            const dateB = new Date(b[keyWord])
            return dateA - dateB
        })
    }
}

function _createEmail(emailToSave) {
    return {
        id: utilService.makeId(),
        ...emailToSave,
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(EMAIL_KEY)
        .then((emails) => {
            const mailIdx = emails.findIndex((currMail) => currMail.id === mail.id)
            const nextMail = emails[mailIdx + 1] ? emails[mailIdx + 1] : emails[0]
            const prevMail = emails[mailIdx - 1] ? emails[mailIdx - 1] : emails[emails.length - 1]
            mail.nextCarId = nextMail.id
            mail.prevCarId = prevMail.id
            return car
        })
}

function _createEmailsList() {
    let emailsList = storageService.loadFromStorage(EMAIL_KEY) || []
    if (!emailsList || !emailsList.length) {
        for (let i = 0; i < 15; i++) {
            const email = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(3),
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: utilService.getRandomTimestamp('2000-01-01T00:00:00Z', '2024-05-26T23:59:59Z')
                    .toISOString().slice(0, 10),
                removedAt: null,
                from: `${utilService.getUserEmail()}`,
                to: getLoggedInUser().email
            }
            emailsList.push(email)
        }
        storageService.saveToStorage(EMAIL_KEY, emailsList)
    }
}
