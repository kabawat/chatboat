export function formatTimeDifference(givenDate) {
    const currentDate = new Date();
    const timeDifference = currentDate - new Date(givenDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
        return `${seconds} sec ago`;
    } else if (minutes < 60) {
        return `${minutes} min ago`;
    } else if (hours < 24) {
        return `${hours} hrs ago`;
    } else if (days < 7) {
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(givenDate));
    } else {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(givenDate)).replace(',', ' -');
    }
}

