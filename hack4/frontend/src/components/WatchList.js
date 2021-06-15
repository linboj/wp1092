import constants from '../constants';  
import {STATSCOUNT_QUERY
} from '../graphql'
import { useQuery } from '@apollo/client';
// Look at this file and see how the watchList is strucutred


export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    console.log(constants.watchList)
    const {loading,error,data,subscribeToMore}=useQuery(STATSCOUNT_QUERY,
        { variables: { severity:1,locationKeywords: constants.watchList} })
    console.log(data)
    console.log(data)
    const counts = data;

    // TODO
    // use subscription
    /*useEffect(()=>{
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: { chatBoxName: activeKey},
            updateQuery: (prev,{subscriptionData})=>{
                if (!subscriptionData.data) return prev
                return subscriptionData.data
            }
        }) 
    },[subscribeToMore])*/
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}