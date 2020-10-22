interface OrphanageInterface {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    description: string;
    about: string;
    opening_hours: string
    open_on_weekends: string;
    images: Array<{
        id: number;
        url: string;
    }>;
}

export default OrphanageInterface;