import React from 'react'
import Button from '../ui/Button';
import classes from './ResultTitle.module.css'

interface ResultTitleProps {
    date: Date
}

const ResultTitle: React.FC<ResultTitleProps> = (props) => {
    const { date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <Button link='/events'>Show all events</Button>
        </section>
    );
}

export default ResultTitle