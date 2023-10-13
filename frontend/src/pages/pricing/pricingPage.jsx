import PricingPageFetcher from "./holders/pricingPageFetcher";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import config from "../../config";

function PricingPage() {
    const stripePromise = loadStripe(config.stripe_pk);

    return (
        <Elements stripe={stripePromise}>
            <PricingPageFetcher/>
        </Elements>
    )
}

export default PricingPage;