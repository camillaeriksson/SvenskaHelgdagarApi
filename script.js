window.addEventListener('load', loadPage)

function loadPage() {
    listHolidaysWithAjaxCallback()
    listHolidaysWithAjaxPromise()
    listHolidaysWithAjaxAsyncAwait()

    listHolidaysWithFetchAsyncAwait()
    listHolidaysWithFetchPromise()
}

function listHolidaysWithAjaxCallback() {
    $.ajax({
        url: 'https://api.dryg.net/dagar/v2.1/1989',
        type: 'GET',
        complete: function (response) {
            const allDays = response.responseJSON.dagar
            printHolidays(allDays)
        }
    })
}

function listHolidaysWithAjaxPromise() {
    $.ajax({ url: 'https://api.dryg.net/dagar/v2.1/2006' })
        .then(function (data) {
            printHolidays(data.dagar)
        }).catch(function (response) {
            console.error(response.statusText)
        })
}

async function listHolidaysWithAjaxAsyncAwait() {
    try {
        const data = await $.ajax({
            url: 'https://api.dryg.net/dagar/v2.1/2020'
        })
        printHolidays(data.dagar)
    } catch (error) {
        console.error(error)
    }
}

async function listHolidaysWithFetchAsyncAwait() {
    try {
        const response = await fetch('https://api.dryg.net/dagar/v2.1/2030')
        const data = await response.json()
        printHolidays(data.dagar)
    } catch (error) {
        console.error(error)
    }
}

function listHolidaysWithFetchPromise() {
    fetch('https://api.dryg.net/dagar/v2.1/2990')
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            printHolidays(data.dagar)
        }).catch(function (error) {
            console.error(error)
        })
}


/**
 * Helper function that prints all the holidays and it's date
 * for a given set of days.
 * @param {Array<Day>} allDays list of days to look through for holidays
 */
function printHolidays(allDays) {
    const ul = $('<ul>')
    for (const day of allDays) {
        if (day.helgdag) {
            const li = $('<li>').append(day.helgdag + " " + day.datum)
            ul.append(li)
        }
    }
    $('body').append(ul)
}

/**
 * An object that defined part of what is returned in the day
 * @typedef {{ helgdag: String, datum: String, vecka: String, veckodag: String }} Day
 */
