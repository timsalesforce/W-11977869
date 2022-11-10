public with sharing class InteractionController {
    private static final String LONG_RUNNING_SERVICE_URL = 'https://httpbin.org/drip?delay=5&duration=2&numbytes=5&code=201';

    public InteractionController() {

    }
    
    public class IdTuple {
        public Id interactionId { get; set; }
        public Id billingAccountId { get; set; }

        public IdTuple(Id interactionId, Id billingAccountId) {
            this.interactionId = interactionId;
            this.billingAccountId = billingAccountId;
        }
    }

    @AuraEnabled(continuation = true)
    public static Continuation doUpdate(Id interactionId, Id billingAccountId) {
        Continuation con = new Continuation(40);
        con.continuationMethod = 'processResponse';
        con.state = new IdTuple(interactionId, billingAccountId);
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint(LONG_RUNNING_SERVICE_URL);
        // Add callout request to continuation
        con.addHttpRequest(req);
        return con;
    }

    @AuraEnabled(continuation = true)
    public static Object processResponse(List<String> labels, Object state) {
        HttpResponse response = Continuation.getResponse(labels[0]);
        System.debug(response);
        IdTuple t = (IdTuple)state;
        Interaction__c interaction = [select Id, Billing_Account__c from Interaction__c where Id =:t.interactionId LIMIT 1];
        interaction.Billing_Account__c = t.billingAccountId;
        update interaction;
        return interaction;
    }
}
