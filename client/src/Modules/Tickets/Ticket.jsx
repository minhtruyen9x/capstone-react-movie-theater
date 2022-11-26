import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import useRequest from '../../Hook/useRequest';
import ticketboxAPI from '../../Services/ticketboxAPI';

import BookTicket from './BookTicket';
import BookSeat from "./BootSeat"

import "./Ticket.css"

const Ticket = () => {
    const [checkLists, setCheckLists] = useState([])

    const handleCheck = (seat) => {
        const index = checkLists.findIndex((seatList) => {
            return seatList.maGhe === seat.maGhe;
        });

        let newList = [...checkLists]
        if (index !== -1) {
            newList = newList.filter((item) => {
                return item.maGhe !== seat.maGhe
            })
        } else {
            newList.push(seat)
        }
        setCheckLists(newList)
    }

    const { ticketId } = useParams();
    const { data: tickets } = useRequest(() => ticketboxAPI.getTicket(ticketId))
    return (
        <div className='ticket'>
            <div className='ticket-main'>
                <div className='ticket-seat-list'>
                    <BookSeat
                        tickets={tickets}
                        checkLists={checkLists}
                        handleCheck={handleCheck} />
                </div>

                <div className='ticket-booking'>
                    <BookTicket ticketId={ticketId} tickets={tickets} checkLists={checkLists} />
                </div>
            </div>
        </div>
    )
}

export default Ticket