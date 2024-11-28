import { Itinerary, Segment } from "../types/types";
import Segments from "./segments";

export default function Itineraries(props: Itinerary) {


    return (
        <div>
            {props.segments.map((s) => (
                <div>
                    <Segments {...s as Segment}/>
                </div>
            ))}
        </div>
    )
}