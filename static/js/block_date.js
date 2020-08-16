//блокируем даты записи среду и воскресенье
const blockDate = async (formatDate) => {
    let monthsNumber = await Urls.getMonths()
    
    let resultArr = []
    let currentDate = new Date()

    const finalDay = formatStringToDate(await getFinalDay(formatDate, monthsNumber));
    const finalDayMilliseconds = finalDay.getTime()

    while (currentDate.getTime() <= finalDayMilliseconds) {
        if (currentDate.getDay() === 0 || currentDate.getDay() === 3) {
            resultArr.push(formatDate(currentDate))
        }

        //увеличваем дату
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return resultArr.join(",")
}

//получаем последний день для записи
const getFinalDay = async (formatDate, monthsNumber) => {
    const finalDay = new Date()
    
    if (monthsNumber === undefined) {
        monthsNumber = await Urls.getMonths()
    }
    
    for (monthName of Object.getOwnPropertyNames(monthsNumber).sort((a, b) => b - a)) {
        if (!monthsNumber[monthName]) continue;

        finalDay.setMonth(monthName - 1)

        break;
    };

    finalDay.setDate(getLastDayOfMonth(finalDay.getMonth(), finalDay.getFullYear()))

    return formatDate(finalDay)
}

const getLastDayOfMonth = (month, year) => {
    const date = new Date(year, month + 1, 0)
    return date.getDate()
}

const formatStringToDate = (stringDate) => {
    const arrStrings = stringDate.split('/')
    return new Date(arrStrings[2], arrStrings[0], arrStrings[1])
}
