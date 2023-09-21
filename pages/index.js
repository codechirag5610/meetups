import { useState, useEffect } from 'react';
import Head from 'next/head';
// import NewsletterSubscribe from '../components/layout/Footer'
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

const HomePage = (props) => {
    // const [meetups, setMeetups] = useState([]);
    // useEffect(() => {
      
    // }, []);
    

    return (
        <>
            <Head>
                <title>My Meetings</title>
                <meta name='description' content='Add your meetings here and remember them' />
            </Head>
            <MeetupList meetups={props.meetups} />
            
             {/* <NewsletterSubscribe /> */}
             
        </>
    )
}


// only use getServerSideProps when data is to be changed multiple times a second because it slows down the pgae.
// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;
    
//     return {
//                 props: {
//                     meetups: dummy
//                 },
//                 revalidate: 10
//             }
// }

// only use getStaticProps when data is not needed to be changed multiple times because it fastens up the pgae.
export const getStaticProps = async () => {

    try{
        const client = await MongoClient.connect('mongodb+srv://chirag6510:Chirag6510@cluster0.gkmogtq.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log("Error Connecting db", error);
    }

        const db = client?.db("meetings");
        const meetupsCollection = db?.collection('meetups');

        const meetups = await meetupsCollection?.find().toArray();
    
        client?.close();

    

    return {
        // console.log("connected")
        props: {
            meetups: meetups?.map(meetup => ({
                title: meetup?.title,
                address: meetup?.address,
                img: meetup?.img,
                description: meetup?.description,
                id: meetup?._id.toString(),
            }))
        },
        revalidate: 10
    }
}

export default HomePage;