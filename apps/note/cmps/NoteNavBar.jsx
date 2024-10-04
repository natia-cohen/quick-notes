const { useState } = React
const { useNavigate } = ReactRouter

export function NoteNavBar({ isNavOpen, onActiveLink, setIsNavOpen }) {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(null)

    function handleLinkClick(link) {
        setActiveLink(link)
        if (link !== 'note') {
            onActiveLink(link)
        } else {
            navigate(`/note`)
        }
    }

    return (
        <div className={`side-nav ${isNavOpen ? 'open' : ''}`} onClick={() => setIsNavOpen(false)}>
            <button
                className={`nav-link ${activeLink === 'note' ? 'active' : ''}`}
                onClick={() => handleLinkClick('note')}
            >
                <span className="material-icons">note</span>
                Notes
            </button>

            <button
                className={`nav-link ${activeLink === 'trash' ? 'active' : ''}`}
                onClick={() => handleLinkClick('trash')}
            >
                <span className="material-icons">delete</span>
                Trash
            </button>
        </div>
    );
}
