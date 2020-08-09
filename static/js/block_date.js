//блокируем даты записи среду и воскресенье
const blockDate = (formatDate) => {
    let resultArr = []
    let currentDate = new Date()

    const finalDay = new Date()
    finalDay.setMonth(finalDay.getMonth() + 3)
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
const getFinalDay = (formatDate) => {
    const finalDay = new Date()
    finalDay.setMonth(finalDay.getMonth() + 3)
    return formatDate(finalDay)
}
