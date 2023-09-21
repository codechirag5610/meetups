import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const router = useRouter(0);

    const addMeetupHandler = async (meetupData) => {
        console.log(meetupData);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            header: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        router.push('/');
    }

    return(
        <>
            <Head>
                <title>Add Your Meetings</title>
                <meta name='description' content='Add your meetings here and remember them' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage;