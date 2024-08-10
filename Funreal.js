// Funreal.js
import axios from 'axios';
import { db, storage} from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function geocodeAddress(address) {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            }
        });
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error("Error geocoding address: ", error);
        return null;
    }
}

async function addFuneralHome(home) {
    try {
        const coordinates = await geocodeAddress(home.address);
        if (!coordinates) throw new Error("Failed to geocode address");

        const logoRef = ref(storage, `logos/${home.name}/logo`);
        const logoSnapshot = await uploadBytes(logoRef, home.logo);
        const logoUrl = await getDownloadURL(logoSnapshot.ref);

        await addDoc(collection(db, 'domyPogrzebowe'), {
            name: home.name,
            address: home.address,
            hours: home.hours,
            email: home.email,
            phone: home.phone,
            services: home.services,
            description: home.description,
            reviews: home.reviews,
            rating: home.rating,
            logoUrl: logoUrl,
            latitude: coordinates.lat,
            longitude: coordinates.lng
        });
        console.log("Funeral home added successfully!");
    } catch (error) {
        console.error("Error adding Funeral home: ", error);
    }
}

export default addFuneralHome;
