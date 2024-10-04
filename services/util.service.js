export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getRandomTimestamp,
    getUserEmail,
    getCurrentTime,
    getDayName,
    getMonthName,
    getYear
}

window.us = utilService

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function getUserEmail(size = 1) {
    var names = ['samantha', 'robert', 'elizabeth', 'samantharobert', 'james0202', 'david1999', 'daniel_01', 'markMe', 'paul', 'thomasTomi', 'danielGG']
    var domain = ['gmail', 'hot', 'yahoo', 'walla']
    var txt = ''
    while (size > 0) {
        size--
        txt += names[Math.floor(Math.random() * names.length)] + '@' +
            domain[Math.floor(Math.random() * domain.length)] + '.com'

    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getCurrentTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}`
}

function getRandomTimestamp(start, end) {
    const startTimestamp = new Date(start).getTime();
    const endTimestamp = new Date(end).getTime();
    const randomTimestamp = new Date(startTimestamp + Math.random() * (endTimestamp - startTimestamp));
    return randomTimestamp;
}

function getDayName(date, locale = 'en-US') {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
    const monthName = new Date(date)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[monthName.getMonth()]
}

function getYear(date) {
    date = new Date(date);
    return date.getFullYear();
}


