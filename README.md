# Repro with Continuations and LWC where data is stale
# Repro
- Clone the repository
- Deploy to scratch org
- Open Sales App
- Create a new Interaction
- Do not specify a billing account, just pick a name
- Create a Billing Account
- Copy the ID of the Billing Account
- Open the Interaction
- In the right side, paste the Billing Account Id into the text field
- Click either 'Async/Await' or 'Promise'

Observe that the Billing Account field does not always update as it should
If you refresh that page, you will see it.