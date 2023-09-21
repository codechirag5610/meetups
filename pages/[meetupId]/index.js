import Head from "next/head";
import { Fragment } from "react";
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
    return(
        <Fragment>
        <Head>
            <title>{props.meetup.title}</title>
            <meta name='description' content={props.meetup.description} />
        </Head>
        <MeetupDetail
         img={props.meetup.img} 
         title={props.meetup.title} 
         address={props.meetup.address} 
         description={props.meetup.description}
          />
        </Fragment>
    )
}

export const getStaticPaths = async () => {
    try{
        const client = await MongoClient.connect('mongodb+srv://chirag6510:Chirag6510@cluster0.gkmogtq.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log("Error Connecting db", error);
    }
    const db = client?.db();

    const meetupsCollection = db?.collection('meetups');

    const meetups = await meetupsCollection?.find({}, {_id: 1}).toArray();
    
    client?.close();

    return {
        fallback: 'blocking',
        paths: meetups?.map(meetup => ({
             params: { meetupId: meetup._id.toString() },
    })),
    };
}

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;

    try{
        const client = await MongoClient.connect('mongodb+srv://chirag6510:Chirag6510@cluster0.gkmogtq.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log("Error Connecting db", error);
    }
    const db = client?.db();

    const meetupsCollection = db?.collection('meetups');

    const meetup = await meetupsCollection?.findOne({_id: ObjectId(meetupId)}).toArray();
    
    client?.close();

    return {
        props: {
            meetup: {
                id: meetup?._id.toString(),
                title: meetup?.title,
                img: meetup?.img,
                address: meetup?.address,
                description: meetup?.description,
            },
        },
        revalidate: 10
    }
}

export default MeetupDetails;