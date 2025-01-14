const generateYears = (startYear = 2000, endYear = new Date().getFullYear()) => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
        const year = endYear - i;
        return { id: `${year}`, name: `${year}` }; // Add id and name properties
    });
};

export default generateYears;
