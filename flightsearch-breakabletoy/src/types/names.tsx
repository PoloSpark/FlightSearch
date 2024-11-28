export interface AmadeusLocations {
    meta: Meta;
    data: Datum[];
}

export interface Datum {
    type:           string;
    subType:        string;
    name:           string;
    detailedName:   string;
    id:             string;
    self:           Self;
    timeZoneOffset: string;
    iataCode:       string;
    geoCode:        GeoCode;
    address:        Address;
    analytics:      Analytics;
}

export interface Address {
    cityName:    string;
    cityCode:    string;
    countryName: string;
    countryCode: string;
    stateCode:   string;
    regionCode:  string;
}

export interface Analytics {
    travelers: Travelers;
}

export interface Travelers {
    score: number;
}

export interface GeoCode {
    latitude:  number;
    longitude: number;
}

export interface Self {
    href:    string;
    methods: string[];
}

export interface Meta {
    count: number;
    links: Links;
}

export interface Links {
    self: string;
}