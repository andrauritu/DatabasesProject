export interface Ecosystem {
    _id: string; // ? makes the _id property optional, as it's not required when creating a new ecosystem
    type: string;
    description: string;
    greenhouseId: string; // or number if your IDs are numeric
}