export const formatCustomDate = (inputDate) => {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(new Date(inputDate));
};

export const formatAgoDate = (inputDate) => {
    const currentDate = new Date();
    const timestamp = new Date(inputDate);
    const timeDifference = currentDate - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
        return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    }
};
