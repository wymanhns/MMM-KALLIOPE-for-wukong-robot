# MagicMirror-KALLIOPE for wukong-robot mod 悟空語音修改

This [MagicMirror²][mm] - [MMM-kalliope](https://github.com/kalliope-project/kalliope) Module allows you to have pages in your magic mirror!
Modified for wukong-robot.  
Module to bind [Kalliope](https://github.com/kalliope-project/kalliope) with your Magic Mirror.

This module allow you to:
- show what Kalliope say on the screen
- control your Magic Mirror by sending notification to other active modules

此為 [MagicMirror²][mm] 中 [MMM-kalliope](https://github.com/kalliope-project/kalliope) 模塊修改版，可讓您在魔術鏡中放置頁面！
為悟空語音的小修改。

本模塊可讓您：
- 在屏幕上顯示Kalliope所說的話
- 通過向其他活動模塊發送通知來控制您的魔鏡



> **Note:** On Kalliope, [a neuron is available](https://github.com/kalliope-project/kalliope_neuron_magic_mirror) to talk with this module directly.

![Demo](images/KALLIOPE.png)


## Installation

Clone this repo into `~/MagicMirror/modules` directory.

Configure your `~/MagicMirror/config/config.js`:

```js
{
    module: "MMM-kalliope",
    position: "upper_third",
    config: {
        title: "Kalliope"
    }
}
```

## Configuration option

| Option       | Default  | Description                                                                                                |
|--------------|----------|------------------------------------------------------------------------------------------------------------|
| max          | 5        | How many messages should be keept on the screen.                                                           |
| keep_seconds | 5        | Number of seconds received messages will stay displayed. If set to "0", then message will never be removed |
| title        | Kalliope | The name placed above received messages                                                                    |

## API documentation

#### POST /kalliope/
Query parameters

| Parameter          | Value            | Description |
| --------------- | ------------------------ | --------- |
| `notification`       | `KALLIOPE` or `ROBOT`| *Font Color = Green* or *Font Color = Yellow & Robot Icon*|
| `payload`       | `You message`    | * |
| `http://localhost/kalliope`       | `You Host`    | * |

## Curl examples

This command will send a message that will be printed by the MMM-kalliope module

#### Green Text
```bash
curl -H "Content-Type: application/json" -X POST -d '{"notification":"KALLIOPE", "payload": "Test1"}' http://localhost/kalliope

```

#### Yellow Text & Robot icon
```bash
curl -H "Content-Type: application/json" -X POST -d '{"notification":"ROBOT", "payload": "Test1"}' http://localhost/kalliope
```

## How to control my MM module from this module

All notifications that are not concerned by this module (when the notification name is not "KALLIOPE") will be send to other installed module on your Magic Mirror.

To add a notification receptor to your module, you just need to implement the `notificationReceived` method like bellow.

```js
notificationReceived: function(notification, payload){
		....

		if (notification === "NOTIFICAION_NAME" && payload=="bla"){
			// Do some magic here with your module
		}

		if (notification === "NOTIFICAION_NAME" && payload=="blablabla"){
			// Do some magic here with your module
		}

		....
},
```

[mm]: https://github.com/MichMich/MagicMirror
