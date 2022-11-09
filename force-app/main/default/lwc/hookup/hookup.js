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
            await doUpdate({interactionId: this.recordId, billingAccountId: this.baValue})
        } catch (error) {
            console.log(`error ${error}`);
        } finally {
            console.log('created');
            getRecordNotifyChange([{recordId: result.Id}]);
        }
    }

    hookupPromise() {
        doUpdate({interactionId: this.recordId, billingAccountId: this.baValue}).then(() => {
            console.log('created');
            getRecordNotifyChange([{recordId: result.Id}]);
        }).catch((error) => {
            console.log(`error ${error}`);
        });
    }
}