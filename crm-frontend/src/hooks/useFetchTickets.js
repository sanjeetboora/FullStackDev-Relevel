import useFetchTickets from './useFetchTickets';
import { useEffect, useRef, useState } from "react";
import constants from '../utils/constants';
import {getTicketsByStatus} from '../services/tickets';

const updateCardsData = (data, totalTickets) => {
    const info = data;
    const {ticketStatus, ticketCardColor} = constants;
    const cardsData = [];
    for(let i=0; i<ticketStatus.length; i++){
        const data = {
            cardColor: ticketCardColor[i], 
            cardTitle: ticketStatus[i], 
            numberOfTickets : info[ticketStatus[i]].length, 
            percentageOfTickets : info[ticketStatus[i]].length === 0 ? 0 : info[ticketStatus[i]].length *100/totalTickets,
        }
        cardsData.push(data);
    }
    return cardsData;
}
const fetchTickets = async(ticketStatus) =>{
    const ticketsResult = {};
    for (let index = 0; index < ticketStatus.length; index++) {
        const status = ticketStatus[index];
        const res = await getTicketsByStatus(status);
        ticketsResult[status] = res.data.result;
        
    }
    return ticketsResult;
}

const useUpdateTicketCards = async() =>{
    const {ticketStatus} = constants;
    const [ticketsData, setTicketsData] = useState({});
    //const [totalTicketsCount, setTotalTicketsCount] = useState(0);
    const [cardsDetails, setCardsDetails] = useState([]);
    let response = useRef();
    // useEffect(()=>{        
    //     (async()=>{
    //         response.current = await fetchTickets(ticketStatus);
    //     })();
    // }, []);
    response.current = await fetchTickets(ticketStatus);
    setTicketsData(response.current);
    let totalTickets = 0;
    for(const ele in response.current){
        totalTickets += response.current[ele].length;
    }
    //setTotalTicketsCount(totalTickets);
    const cardsData = updateCardsData(response.current, totalTickets);
    // console.log(ticketStatus);
    // console.log(response);
    // for(let i=0; i<ticketStatus.length; i++){
    //     console.log(ticketStatus[i]);
    //     const data = {
    //         cardColor: ticketCardColor[i], 
    //         cardTitle: ticketStatus[i], 
    //         numberOfTickets : response[ticketStatus[i]].length, 
    //         percentageOfTickets : response[ticketStatus[i]].length*100/totalTickets,
    //     }
    //     cardsData.push(data);
    // }
    setCardsDetails(cardsData);
    const result = {ticketsData, cardsDetails};
    return result;
}



export default useUpdateTicketCards;