export interface AmadeusAirlines {
    meta: Meta;
    data: Datum[];
}

export interface Datum {
    type:         string;
    iataCode:     string;
    icaoCode:     string;
    businessName: string;
    commonName:   string;
}

export interface Meta {
    count: number;
    links: Links;
}

export interface Links {
    self: string;
}
