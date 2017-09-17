declare const require: any;
require("./matrix.css");

declare const $: any;

import { WOSDKConfiguration } from './entities/wo-sdk-configuration.entity';
import { WODispatcherConfiguration } from './entities/wo-dispatcher-configuration.entity';
import { WOOutput } from './core/wo-output.core';
import { WOInput } from './core/wo-input.core';
import { WODispatcher } from './core/wo-dispatcher.core';
import { WOParser } from './core/wo-parser.core';

export class WebOnionSDK {
    public readonly out_lib: WOOutput;
    public readonly input_lib: WOInput;
    public readonly parser_lib: WOParser;
    public readonly dispatcher_lib: WODispatcher;

    private configuration: WOSDKConfiguration = {
        dispatcher: [
            {
                command: 'echo',
                flags: ['m'],
                action: (flags) => {
                    const message = flags[0].split(':')[1];
                    this.out_lib.printMessage(message);
                }
            },
            {
                command: 'wo',
                flags: ['info', 'inspire'],
                action: (flags) => {
                    if (flags[0] === 'info') {
                        this.out_lib.printMessage('Web Onion. A easy to use, open source and extensible SDK for building browser CLI web applications.', 3);
                        this.out_lib.printMessage('Current version: 1.1.0', 3);
                    }

                    if (flags[0] === 'inspire') {
                        $.get({
                            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
                            cache: false
                        }).then((data: any) => {
                            data = data[0];

                            this.out_lib.printMessage('');
                            this.out_lib.printMessage(data.content);
                            this.out_lib.printMessage(`-${data.title}`, 3);
                            this.out_lib.printMessage('');
                        })
                    }
                }
            },
            {
                command: 'clear',
                aliases: ['clr', 'ccl', 'cls', 'kk'],
                action: (flags) => this.out_lib.clearConsole()
            }
        ],

        input_field: {
            clear_after_submit: true
        },

        general: {
            theme: 'matrix',    // not yet handled
            loading_screen_time: 1000
        }
    }

    public constructor() {
        this.out_lib = new WOOutput();
        this.input_lib = new WOInput();
        this.parser_lib = new WOParser();
        this.dispatcher_lib = new WODispatcher();

        //  Start a listener for the double click on console
        $('body').dblclick((c: any) => {
            if (c.currentTarget.classList.contains('wo-dbl-click-autofocus')) {
                this.input_lib.focusInput();
            }
        });
    }

    /**
     * Returns the array containing the dispatcher configurations
     * 
     * @readonly
     * @type {WODispatcherConfiguration[]}
     * @memberof WebOnionSDK
     */
    public get dispatcherConfiguration(): WODispatcherConfiguration[] {
        return this.configuration.dispatcher;
    }

    /**
     * Returns true if the input gets cleared after each ENTER press.
     * False otherwise
     * 
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    public get clearAfterSubmit(): boolean {
        return this.configuration.input_field.clear_after_submit ? true : false;
    }

    /**
     * Returns the loading screen timeout if set.
     * Null will be returned otherwise
     *
     * @readonly
     * @type {(number | null)}
     * @memberof WebOnionSDK
     */
    public get loadTimeout(): number | null {
        return this.configuration.general.loading_screen_time ?
            this.configuration.general.loading_screen_time :
            null;
    }

    /**
     * Returns true if the input focuses automatically when
     * double clicking on the console. False otherwise
     * 
     * @readonly
     * @type {boolean}
     * @memberof WebOnionSDK
     */
    public get dblClickFoucsToInput(): boolean {
        return $('body').hasClass('wo-dbl-click-autofocus');
    }

    /**
     * Enables or disables the input focus
     * when double clicking on the console
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set dbl_click_focus_to_input(value: boolean) {
        if (!value) {
            $('body').removeClass('wo-dbl-click-autofocus');
            return;
        }

        $('body').addClass('wo-dbl-click-autofocus');
    }

    /**
     * Enables or disables the input field
     * auto clear on each ENTER press
     *
     * @param {boolean} value
     * @memberof WebOnionSDK
     */
    public set clear_after_submit(value: boolean) {
        this.configuration.input_field.clear_after_submit = value;
    }

    /**
     * Sets the amount of time to wait before
     * the legacy loading screen hides
     *
     * @param {number} value
     * @memberof WebOnionSDK
     */
    public set load_timeout(value: number) {
        this.configuration.general.loading_screen_time = value;
    }

    /**
     * Initializes the SDK with the given configurations
     * 
     * @memberof WebOnionSDK
     */
    public initialize() {
        this.out_lib.showInitializationScreen();

        setTimeout(() => {
            this.clearDocument();
            this.createConsole();
            this.parser_lib.startParser(this.configuration.dispatcher, this);
        }, this.configuration.general.loading_screen_time);
    }

    /**
     * Adds the array of dispatcher configurations
     * to the current configurations.
     * 
     * @param {WODispatcherConfiguration[]} configurations 
     * @memberof WebOnionSDK
     */
    public addConfigurationsToDispatcher(configurations: WODispatcherConfiguration[]) {
        configurations.forEach(s => {
            this.configuration.dispatcher.push(s);
        });
    }

    /**
     * Clears the content of the body
     * 
     * @private
     * @memberof WebOnionSDK
     */
    private clearDocument() {
        $('body').empty();
    }

    /**
     * Creates the HTML elements needed to render
     * the console and focuses the input
     * 
     * @private
     * @memberof WebOnionSDK
     */
    private createConsole() {
        $('body').append('<div class="wc-wrp"></div>');
        $('.wc-wrp').append('<div class="wc-console"></div>');
        $('.wc-wrp').append('<div class="wc-input"></div>');
        $('.wc-input').append('<div class="wc-input-pointer">></div>');
        $('.wc-input').append('<input type="text" class="wc-input-field"/>');

        this.input_lib.focusInput();
    }
}