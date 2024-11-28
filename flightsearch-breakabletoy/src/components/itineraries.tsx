import { Itinerary, Segment } from "../types/types";
import Segments from "./segments";

export default function Itineraries(props: Itinerary) {


    return (
        <div>
            {
                props.duration
            }
        </div>
    )
}