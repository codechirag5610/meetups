import classes from './MeetupDetail.module.css';
import { Fragment } from "react";

const MeetupDetail = (props) => {
    return(
        <section className={classes.detail}>
            <Fragment>
                <img src={props.img} alt="meetup place" />
                <h1>{props.title}</h1>
                <address>{props.address}</address>
                <p>{props.description}</p>
            </Fragment>
        </section>
    )
}

export default MeetupDetail;