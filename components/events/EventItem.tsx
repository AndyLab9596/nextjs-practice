import Image from 'next/image';
import React, { Fragment } from 'react';
import { EventItem } from '../../dummyData';
import Button from '../ui/Button';
import classes from './EventItem.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

interface EventItemProps {
    eventItem: EventItem
}

const EventItemComponent: React.FC<EventItemProps> = ({ eventItem }) => {

    const { id, title, description, location, date, image, isFeatured } = eventItem;
    const eventTime = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const formattedLocation = location.replace(', ', '\n');
    const exploreLink = `events/${id}`;
    
    return (
        <li className={classes.item}>
            <Image src={'/' + image} alt={title} width={'200px'} height={'250px'} className={classes.img} />
            <div className={classes.content}>
                <div>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{eventTime}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedLocation}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <Fragment>
                            <span>
                                Explore Event
                            </span>
                            <span className={classes.icon}>
                                <ArrowRightIcon />
                            </span>
                        </Fragment>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItemComponent