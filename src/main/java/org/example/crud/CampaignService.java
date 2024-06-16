package org.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {
    @Autowired
    private CampaignRepository campaignRepository;

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(Long id) {
        return campaignRepository.findById(id);
    }

    public Campaign createCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Campaign updateCampaign(Long id, Campaign campaignDetails) {
        Campaign campaign = campaignRepository.findById(id).orElse(null);

        if (campaign == null) {
            return null;
        }

        campaign.setName(campaignDetails.getName());
        campaign.setKeywords(campaignDetails.getKeywords());
        campaign.setBidAmount(campaignDetails.getBidAmount());
        campaign.setCampaignFund(campaignDetails.getCampaignFund());
        campaign.setStatus(campaignDetails.getStatus());
        campaign.setTown(campaignDetails.getTown());
        campaign.setRadius(campaignDetails.getRadius());
        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(Long id) {
        Campaign existingCampaign = campaignRepository.findById(id).orElse(null);

        if (existingCampaign == null) {
            return;
        }

        campaignRepository.deleteById(id);
    }

    public double getCampaignsFunds() {
        List<Campaign> campaigns = campaignRepository.findAll();
        double funds = 0;
        for (Campaign campaign : campaigns) {
            funds += campaign.getCampaignFund();
        }

        return funds;
    }
}
