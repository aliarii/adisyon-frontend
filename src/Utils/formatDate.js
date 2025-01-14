import months from "./months";

const separateDateTime = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString();
    const formattedTime = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateTime = { date: formattedDate, time: formattedTime };

    return dateTime;
}

const combinedDateTime = (date) => {
    const newDate = new Date(date);
    return `${String(newDate.getDate()).padStart(2, '0')}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${String(newDate.getFullYear()).slice(-2)} - ${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}`;
}

const localDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    return new Date(date).toLocaleDateString('default', options);
}

const monthName = (monthIndex) => {
    return months[monthIndex - 1].name;
}
export { separateDateTime, combinedDateTime, localDate, monthName };
