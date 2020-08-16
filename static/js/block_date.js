//проверяет есть ли открытые месяцы
const hasOpenMonths = async(monthsNumber) => {
    if (monthsNumber === undefined) {
        monthsNumber = await Urls.getMonths()
    }

    return Object.getOwnPropertyNames(monthsNumber).some(num => monthsNumber[num])
}

//блокируем даты записи среду и воскресенье
const blockDate = async (formatDate, monthsNumber) => {
    if (monthsNumber === undefined) {
        monthsNumber = await Urls.getMonths()
    }

    let resultArr = []
    let currentDate = new Date()

    const finalDay = formatStringToDate(await getFinalDay(formatDate, monthsNumber));
    const finalDayMilliseconds = finalDay.getTime()

    while (currentDate.getTime() <= finalDayMilliseconds) {
        if (!monthsNumber[currentDate.getMonth() + 1] || currentDate.getDay() === 0 || currentDate.getDay() === 3) {
            resultArr.push(formatDate(currentDate))
        }

        //увеличваем дату
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return resultArr.join(",")
}

//получаем первый день для записи, иначе вернёт текущую дату
const getMinDate = async (formatDate, monthsNumber) => {
    const currentDate = new Date()

    if (monthsNumber === undefined) {
        monthsNumber = await Urls.getMonths()
    }

    const finalDay = formatStringToDate(await getFinalDay(formatDate, monthsNumber));
    const finalDayMilliseconds = finalDay.getTime()

    while (currentDate.getTime() <= finalDayMilliseconds) {
        if (monthsNumber[currentDate.getMonth() + 1] && currentDate.getDay() !== 0 && currentDate.getDay() !== 3) {
            return formatDate(currentDate)
        } 

        //увеличваем дату
        if(!monthsNumber[currentDate.getMonth() + 1]) {
            currentDate.setDate(1)
            currentDate.setMonth(currentDate.getMonth() + 1)
        } else {
            currentDate.setDate(currentDate.getDate() + 1)
        }
    }

    return formatDate(new Date())
}

//получаем последний день для записи, если его нет, то вернёт текущую дату
const getFinalDay = async (formatDate, monthsNumber) => {
    const finalDay = new Date()
    let initMonth = finalDay.getMonth()

    if (monthsNumber === undefined) {
        monthsNumber = await Urls.getMonths()
    }

    let hasFinalDay = false

    for (let monthNum = initMonth; monthNum < 12; monthNum++) {
        if (!monthsNumber[monthNum + 1]) continue;

        finalDay.setMonth(monthNum)
        hasFinalDay = true
    };

    finalDay.setFullYear(finalDay.getFullYear() + 1)

    let isNewYear = false

    for (let monthNum = 0; monthNum < initMonth; monthNum++) {
        if (!monthsNumber[monthNum + 1]) continue;

        finalDay.setMonth(monthNum)
        isNewYear = true
        hasFinalDay = true
    }

    if (!isNewYear) {
        finalDay.setFullYear(finalDay.getFullYear() - 1)
    }

    if (hasFinalDay) {
        finalDay.setDate(getLastDayOfMonth(finalDay.getMonth(), finalDay.getFullYear()))
    }

    return formatDate(finalDay)
}

const getLastDayOfMonth = (month, year) => {
    const date = new Date(year, month + 1, 0)
    return date.getDate()
}

const formatStringToDate = (stringDate) => {
    const arrStrings = stringDate.split('/')
    return new Date(arrStrings[2], arrStrings[0] - 1, arrStrings[1])
}
