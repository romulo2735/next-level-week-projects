import Orphanages from "../models/Orphanages";
import imageView from "./image_view";

export default {
    index(orphanages: Orphanages[]) {
        return orphanages.map(orphanage => this.show(orphanage));
    },
    show(orphanage: Orphanages) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imageView.index(orphanage.images)
        };
    },
};