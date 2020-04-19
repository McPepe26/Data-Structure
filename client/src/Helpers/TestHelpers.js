export const getFormatDate = (date) =>{
    return `${date.year}-${date.month < 10 ? '0':''}${date.month}-${date.day < 10 ? '0':''}${date.day}`;
}

export const getObjectDate = (date) => {
    let dateArray = date.split("-");
    return {
        year: parseInt(dateArray[0],10),
        month: parseInt(dateArray[1],10),
        day: parseInt(dateArray[2],10)
    }
}

export const isTestClosed = (date, hour) => {
    let today = new Date();
    let dateEnd = new Date(date.year, date.month-1, date.day);
    let hourArray = hour.split(':');

    today.setHours(0,0,0,0);
    dateEnd.setHours(0,0,0,0);

    
    if(today.getTime() < dateEnd.getTime()) return false;
    
    if(today.getTime() === dateEnd.getTime()){
        today = new Date();
        dateEnd.setHours(hourArray[0]);
        if(today.getTime() <= dateEnd.getTime()){
            return false;
        }
    }

    return true;
}

export const getTestClosedCount = (tests) => {
    console.log(tests);
    let testCloseCount = 0;
    tests.forEach((test) => {
        if(isTestClosed(test.dateOut, test.hourOut)){
            testCloseCount++;
        }
    });

    console.log(testCloseCount)

    return testCloseCount;
}

export const getTimeToString = (time) => {
    let timeString = '';

    let hour = time.hours >= 10 ? time.hours: `0${time.hours}`;
    let minute = time.minutes >= 10 ? time.minutes: `0${time.minutes}`;
    let second = time.seconds >= 10 ? time.seconds: `0${time.seconds}`;

    timeString = `${hour}:${minute}:${second}`;

    return timeString;
}