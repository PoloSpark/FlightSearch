export interface Types {
    meta:         Meta;
    data:         Datum[];
    dictionaries: Dictionaries;
}

export interface Datum {
    type:                     string;
    id:                       string;
    source:                   string;
    instantTicketingRequired: boolean;
    nonHomogeneous:           boolean;
    oneWay:                   boolean;
    isUpsellOffer:            boolean;
    lastTicketingDate:        Date;
    lastTicketingDateTime:    Date;
    numberOfBookableSeats:    number;
    itineraries:              Itinerary[];
    price:                    DatumPrice;
    pricingOptions:           PricingOptions;
    validatingAirlineCodes:   string[];
    travelerPricings:         TravelerPricing[];
}

export interface Itinerary {
    duration: string;
    segments: Segment[];
}

export interface Segment {
    departure:       Arrival;
    arrival:         Arrival;
    carrierCode:     string;
    number:          string;
    aircraft:        Aircraft;
    operating:       Operating;
    duration:        string;
    id:              string;
    numberOfStops:   number;
    blacklistedInEU: boolean;
}

export interface Aircraft {
    code: string;
}

export interface Arrival {
    iataCode: IataCode;
    at:       Date;
}

export enum IataCode {
    Jfk = "JFK",
    Lax = "LAX",
    Sfo = "SFO",
}

export interface Operating {
    carrierCode: string;
}

export interface DatumPrice {
    currency:            string;
    total:               string;
    base:                string;
    fees:                AdditionalService[];
    grandTotal:          string;
    additionalServices?: AdditionalService[];
}

export interface AdditionalService {
    amount: string;
    type:   Type;
}

export enum Type {
    CheckedBags = "CHECKED_BAGS",
    Supplier = "SUPPLIER",
    Ticketing = "TICKETING",
}

export interface PricingOptions {
    fareType:                string[];
    includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
    travelerId:           string;
    fareOption:           string;
    travelerType:         string;
    price:                TravelerPricingPrice;
    fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
    segmentId:           string;
    cabin:               string;
    fareBasis:           string;
    class:               string;
    includedCheckedBags: IncludedCheckedBags;
}

export interface IncludedCheckedBags {
    quantity: number;
}

export interface TravelerPricingPrice {
    currency: string;
    total:    string;
    base:     string;
}

export interface Dictionaries {
    locations:  { [key: string]: Location };
    aircraft:   { [key: string]: string };
    currencies: Currencies;
    carriers:   Carriers;
}

export interface Carriers {
    "7X": string;
    "6X": string;
}

export interface Currencies {
    EUR: string;
}

export interface Location {
    cityCode:    string;
    countryCode: string;
}

export interface Meta {
    count: number;
    links: Links;
}

export interface Links {
    self: string;
}
