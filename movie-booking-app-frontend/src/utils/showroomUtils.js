export const getTimeByTimeSlot = (timeslot)=>{
    const showroomTimeSlots = {
        T1: "9:00AM - 12:00Noon",
        T2: "1:00PM - 4:00PM",
        T3: "5:00PM - 8:00PM",
        T4: "9:00PM - 12:00Midnight",
        T5: "1:00AM - 4:00AM",
    }
    return showroomTimeSlots[timeslot];
}