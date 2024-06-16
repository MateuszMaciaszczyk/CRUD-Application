import React from 'react';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';

const App = () => {
    return (
        <div>
            <h1>Campaign Manager</h1>
            <CampaignForm onSuccess={() => window.location.reload()} />
            <CampaignList />
        </div>
    );
};

export default App;
