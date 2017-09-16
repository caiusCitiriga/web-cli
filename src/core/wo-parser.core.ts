import { WebOnionSDK } from '../web-onion';

import { WOInput } from './wo-input.core';
import { WODispatcher } from './wo-dispatcher.core';

import { WOCommandSet } from '../entities/wo-command-set.entity';
import { WODispatcherConfiguration } from '../entities/wo-dispatcher-configuration.entity';

export class WOParser {

    private command_set: WOCommandSet = {
        command: null,
        flags: null
    };

    public startParser(dispatcher_conf: WODispatcherConfiguration[], sdk: WebOnionSDK) {
        $('input.wc-input-field').on('keypress', (k: any) => {
            if (
                k.keyCode !== 13 ||
                k.currentTarget.classList.value.indexOf('wc-input-wait') !== -1
            ) { return; } // if not ENTER or in input wait mode

            const raw_command = <string>$('input.wc-input-field').val();
            this.command_set.command = raw_command.split('--')[0]; //  This will take only what's before any flag

            const flags = raw_command.split('--');
            flags.shift(); // remove the command from the flags array;
            this.command_set.flags = flags;

            sdk.dispatcher_lib.dispatch(dispatcher_conf, this.command_set, sdk);
            this.resetCommandSet();

            sdk.clearAfterSubmit ? sdk.input_lib.clearInput() : null;
        });
    }

    private resetCommandSet() {
        this.command_set.command = null;
        this.command_set.flags = null;
    }
}