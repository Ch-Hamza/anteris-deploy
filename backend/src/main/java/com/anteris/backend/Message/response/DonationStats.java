package com.anteris.backend.Message.response;

import java.util.List;

public class DonationStats {

    private long total_donations;
    private long total_month_donations;
    private List<TopDonation> top_donations;

    public long getTotal_donations() {
        return total_donations;
    }

    public void setTotal_donations(long total_donations) {
        this.total_donations = total_donations;
    }

    public long getTotal_month_donations() {
        return total_month_donations;
    }

    public void setTotal_month_donations(long total_month_donations) {
        this.total_month_donations = total_month_donations;
    }

    public List<TopDonation> getTop_donations() {
        return top_donations;
    }

    public void setTop_donations(List<TopDonation> top_donations) {
        this.top_donations = top_donations;
    }
}
