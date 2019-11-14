window.addEventListener('load', loadPage)

/**
 * This is where the script starts
 */
function loadPage() {
    loadInfoAboutMidsommar()
}


/**
 * Async function that loads info about midsummer past few year
 */
async function loadInfoAboutMidsommar() {
    // utgå ifrån ett år
    let year = 2019

    // loopa över åren 2019-2015
    while (year >= 2015) {
        // hämta info om alla dagar för juni månad
        let response = await fetch(`https://api.dryg.net/dagar/v2.1/${year}/06`)
        // läs ut json datan till ett javascript objekt
        let data = await response.json()
        // skriv ut dagarna
        printMidsammarDate(data.dagar)
        // byt år
        year--
    }

}

/**
 * Helper function that prints all dates for when midsummer was
 * @param {Array<Day>} allDays list of days to look through
 */
function printMidsammarDate(days) {
    for (const day of days) {
        if (day.helgdag === "Midsommarafton") {
            document.write(day.datum + '<br>')
        }
    }
}