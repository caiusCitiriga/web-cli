# WebOnion
A library for creating browser based applications with a old school CLI interface.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

### Installing
Install the library
```
npm i web-cli
```

### Setup
You can configure the CLI however you like. WebOnion offers a configuration object that can be tweaked using specific methods. Although you could directly access the object properties, it's always better to use the specific method, since it could do some other processes that you're unaware of.

The configuration object strucure:

I will use the Typescript notation since it explains better the possible values for each field.
```typescript
{
    dispatcher: {
        command: string, 
        alaiases: string[] | null,
        flags: string[] | null,
        action: (flags) => void
    }[],

    input_field: {
        clear_after_submit: boolean
    },

    general: {
        theme: string, // not yet handled
        allow_raw_html: boolean
    }
}
```
## Dispatcher configuration
The dispatcher property holds all the configurations for the commands. As you can see, its simple configuration is composed by 4 properties, and 2 of these can be omitted.

* **command**: Is a string that defines the command full name. This string can be used to trigger the action of the command
* **aliases**: can be an array of strings or omitted. These strings will be the aliases of the full command name
* **flags**: If the command takes some extra configuration or inputs from the user, you can specify here the flags to be used to trigger the specific functionality.
* **action**: This is the code that will be executed when the command fires. If your command can be used in combination with any flag, here you'll have access to a parameter called flags. In this parameter you will find an array of strings. Your choiche on how to separe the value from the flag. 

#### Flag - value speparation tip
You could ask the user to insert a command following this syntax:
```
command --flag value
```
So when you'll recieve the flag in your <b>action</b> you will simply split it by spaces and take the last value. 

## Input field configuration
The input field can be configured to automatically be cleared when the user presses ENTER or not.

By default it automatically clears.

## General configuration
Here you can tweak the general CLI's options.
* **theme**: here you can chose the graphical theme for the CLI. For now only <i>Matrix</i> is supported
* **allow_raw_html**: this will prevent or not the parsing of HTML strings in what will be rendered on the console. If you plan to write custom HTML code during the prints, this is the option for you.

# Setters
## addSetsToDispatcher

Adds the given array of sets to the dispatcher configuration

**Parameters**: sets {Array<DispatcherSet>}
```typescript
const DispatcherSet = {
    command: string, 
    alaiases: string[] | null,
    flags: string[] | null,
    action: (flags) => void
}
```
### Example
```javascript
WebOnionSdk.addSetsToDispatcher([
    {
        command: 'xx',
        aliases: null,
        flags: null,
        action: (flags) => {
            WCGenericOutputLibrary.printMessage('This is a message with warn severity', 2);
        }
    },
    {
        command: 'rr',
        aliases: null,
        flags: null,
        action: (flags) => {
            WCGenericOutputLibrary.printMessage('This is a message with info severity', 3);
        }
    }
]);
```

## allowRawHtml
Allows raw HTML to be rendered in the console

**Parameters**: value {boolean}

### Example
```javascript
WebOnionSdk.allowRawHtml(true);
```


## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/caiuscitiriga/smart-cli/tags). 

## Authors
* [**Caius Citiriga**](https://github.com/caiuscitiriga)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details