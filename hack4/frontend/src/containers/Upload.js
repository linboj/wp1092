import Uploader from '../components/Uploader';

import "./Upload.css";
import {useMutation } from '@apollo/react-hooks'
import {INSERTPEOPLE
} from '../graphql'

export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const [insertPeople]=useMutation(INSERTPEOPLE)

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={insertPeople}/>
        </div>
    </div>;
}
