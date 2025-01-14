const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return { id: `${day}`, name: `${day}` };
    });
};

export default generateDays;
