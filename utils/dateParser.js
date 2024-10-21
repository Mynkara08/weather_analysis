const getTimestamps=(startDate, endDate)=>{
    const startTimestamp = new Date(`${startDate}T00:00:00Z`).getTime()/1000; 
    const endTimestamp = new Date(`${endDate}T23:59:59Z`).getTime()/1000; 

    console.log(startTimestamp,endTimestamp);
    

    return {
        startTimestamp,
        endTimestamp
    };
}
module.exports = getTimestamps;