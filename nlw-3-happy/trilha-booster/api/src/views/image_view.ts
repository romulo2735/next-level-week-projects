import Image from "../models/Image";

export default {
    index(images: Image[]) {
        return images.map(image => this.show(image));
    },
    show(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads${image.path}`,
        };
    },
};