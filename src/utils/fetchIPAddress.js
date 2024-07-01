import axios from "axios";

async function fetch_ip_Address_() {
    try {
        const response = await axios.get('https://api.ipify.org/?format=json');
        return response.data.ip;
    } catch (error) {
        console.log('Error fetching IP address:', error);
        return 'Unknown';
    }
}
export default fetch_ip_Address_