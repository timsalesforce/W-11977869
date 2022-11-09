import { LightningElement, api } from 'lwc';
import doUpdate from '@salesforce/apexContinuation/InteractionController.doUpdate';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class Hookup extends LightningElement {
    @api recordId;

    baValue;

    handleInputChange(event) {
        this.baValue = event.detail.value;
    }

    async hookupAsyncAwait() {
        try {
            const result = await doUpdate({interactionId: this.recordId, billingAccountId: this.baValue})
        } catch (error) {
            console.log(`error ${error}`);
        } finally {
            getRecordNotifyChange([{recordId: this.recordId}]);
        }
    }

    hookupPromise() {
        doUpdate({interactionId: this.recordId, billingAccountId: this.baValue}).then((result) => {
            getRecordNotifyChange([{recordId: this.recordId}]);
        }).catch((error) => {
            console.log(`error ${error}`);
        });
    }
}