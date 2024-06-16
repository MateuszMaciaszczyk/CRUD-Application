import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CampaignForm from './CampaignForm';
import CampaignItem from './CampaignItem';
import './CampaignList.css';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [totalCampaignFunds, setTotalCampaignFunds] = useState(0);
    const [accountBalance, setAccountBalance] = useState(10000 - totalCampaignFunds);

    useEffect(() => {
        fetchCampaigns();
        fetchTotalCampaignFunds();
    }, []);

    useEffect(() => {
        setAccountBalance(10000 - totalCampaignFunds);
    }, [totalCampaignFunds]);

    const fetchCampaigns = () => {
        axios.get('/api/campaigns')
            .then(response => setCampaigns(response.data))
            .catch(error => console.error(error));
    };

    const fetchTotalCampaignFunds = () => {
        axios.get('/api/campaigns/funds')
            .then(response => setTotalCampaignFunds(response.data))
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axios.delete(`/api/campaigns/${id}`)
            .then(() => {
                setCampaigns(campaigns.filter(campaign => campaign.id !== id));
                if (selectedCampaign === id) {
                    setSelectedCampaign(null);
                }
                fetchTotalCampaignFunds();
            })
            .catch(error => console.error(error));
    };

    const handleSelectCampaign = (id) => {
        setSelectedCampaign(id);
    };

    return (
        <div>
            <div className="balance-display">Account Balance: {accountBalance}</div>
            <h2>Campaign List</h2>
            <div className="campaign-list">
                {campaigns.map(campaign => (
                    <CampaignItem
                        key={campaign.id}
                        campaign={campaign}
                        onDelete={handleDelete}
                        onSelect={handleSelectCampaign}
                    />
                ))}
            </div>
            {selectedCampaign && (
                <CampaignForm
                    campaignId={selectedCampaign}
                    onSuccess={() => {
                        setSelectedCampaign(null);
                        fetchCampaigns();
                        fetchTotalCampaignFunds();
                    }}
                />
            )}
        </div>
    );
};

export default CampaignList;