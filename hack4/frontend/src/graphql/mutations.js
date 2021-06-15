import { gql } from "@apollo/client"

export const INSERTPEOPLE=gql`
    mutation insertPeople(
        $data: [Person!]
        ){
            insertPeople(data:$data) 
        }
`