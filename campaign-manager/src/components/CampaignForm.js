import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CITIES = [
    "Warszawa",
    "Kraków",
    "Łódź",
    "Wrocław",
    "Poznań",
    "Gdańsk",
    "Szczecin",
    "Bydgoszcz",
    "Lublin",
    "Katowice"
];

const CampaignForm = ({ campaignId, onSuccess }) => {
    const [campaign, setCampaign] = useState({
        name: '',
        keywords: '',
        bidAmount: 0,
        campaignFund: 0,
        status: 'on',
        town: '',
        radius: 0
    });

    useEffect(() => {
        if (campaignId) {
            axios.get(`/api/campaigns/${campaignId}`)
                .then(response => setCampaign(response.data))
                .catch(error => console.error(error));
        } else {
            // Reset form fields if no campaignId is selected
            setCampaign({
                name: '',
                keywords: '',
                bidAmount: 0,
                campaignFund: 0,
                status: 'on',
                town: '',
                radius: 0
            });
        }
    }, [campaignId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign({ ...campaign, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (campaignId) {
            axios.put(`/api/campaigns/${campaignId}`, campaign)
                .then(response => onSuccess())
                .catch(error => console.error(error));
        } else {
            axios.post('/api/campaigns', campaign)
                .then(response => onSuccess())
                .catch(error => console.error(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Campaign Name</label>
                <input type="text" name="name" value={campaign.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Keywords</label>
                <input type="text" name="keywords" value={campaign.keywords} onChange={handleChange} required />
            </div>
            <div>
                <label>Bid Amount</label>
                <input type="number" name="bidAmount" value={campaign.bidAmount} onChange={handleChange} required />
            </div>
            <div>
                <label>Campaign Fund</label>
                <input type="number" name="campaignFund" value={campaign.campaignFund} onChange={handleChange} required />
            </div>
            <div>
                <label>Status</label>
                <select name="status" value={campaign.status} onChange={handleChange} required>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                </select>
            </div>
            <div>
                <label>Town</label>
                <select name="town" value={campaign.town} onChange={handleChange} required>
                    <option value="">Select a town</option>
                    {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Radius</label>
                <input type="number" name="radius" value={campaign.radius} onChange={handleChange} required />
            </div>
            <button type="submit">{campaignId ? 'Update' : 'Create'} Campaign</button>
        </form>
    );
};

export default CampaignForm;
