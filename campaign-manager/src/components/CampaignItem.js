import React from 'react';

const CampaignItem = ({ campaign, onDelete, onSelect }) => {
    const handleDeleteClick = () => {
        onDelete(campaign.id, campaign.campaignFund);
    };

    return (
        <div className="campaign-item">
            <div>
                <strong>{campaign.name}</strong>
            </div>
            <div>
                Keywords: {campaign.keywords}
            </div>
            <div>
                Bid Amount: {campaign.bidAmount}
            </div>
            <div>
                Campaign Fund: {campaign.campaignFund}
            </div>
            <div>
                Status: {campaign.status}
            </div>
            <div>
                Town: {campaign.town}
            </div>
            <div>
                Radius: {campaign.radius}
            </div>
            <button onClick={() => onSelect(campaign.id)}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
};

export default CampaignItem;
