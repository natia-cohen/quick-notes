const { useEffect, useState } = React

export function SideMenu({ unreadMails, toggleCompose, filterBy, onFilter, isMenuActive, toggleSideMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(newLabel) {
        setFilterByToEdit({ ...filterByToEdit, status: newLabel })
    }

    const menuStyle = isMenuActive ? 'active-menu' : ''

    return <div className={`side-menu-container ${menuStyle}`} onClick={() => toggleSideMenu()}>
        <button className='compose-btn' onClick={() => toggleCompose()}>
            <img className='icon' src="./assets/img/mail-icons/pencil.png" alt="" />
            Compose
        </button>

        <aside className='side-menu'>
            <p className={`${filterByToEdit.status === 'inbox' ? 'active-label' : ''}`}
                onClick={() => handleChange('inbox')}>
                <img className='icon' src="./assets/img/mail-icons/inbox.png" alt="" />
                Inbox
                {unreadMails > 0 && <span className='unread-counter'>{unreadMails}</span>}
            </p>
            <p>
                <img className='icon' src="./assets/img/mail-icons/star.png" alt="" />
                Starred
            </p>
            <p>
                <img className='icon' src="./assets/img/mail-icons/draft.png" alt="" />
                Draft
            </p>
            <p className={`${filterByToEdit.status === 'sent' ? 'active-label' : ''}`}
                onClick={() => handleChange('sent')}>
                <img className='icon' src="./assets/img/mail-icons/sent.png" alt="" />
                Sent
            </p>
            <p>
                <img className='icon' src="./assets/img/mail-icons/trash.png" alt="" />
                Trash
            </p>
        </aside>
    </div>

}