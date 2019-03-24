
const TalkType = require('PanelTalk').TalkType;
const Game = require('Game');

function showTalk(title, talkList, type, callback) {
    Game.openPanel('talk', title, talkList, type);
    Game.onPanelClosed('talk', () => callback(null));
}

cc.Class({
    extends: require('BaseEvent'),

    properties: {
    },

    onLoad () {
    },

    init (event) {
        this.event = event;
        this.title = event.NAME;
        this.state = Game.taskState.getTaskState(event.ID);
    },

    doBeforeEnter (sender, callback) {
        if (this.state === 0) {
            this.state = 1;
            Game.taskState.setTaskState(this.event.ID, 1);
            showTalk(this.title, this.event.TASK, TalkType.Task, callback);
        } else if (this.state === 1) {
            if (Game.bag.getNumOfItem(this.event.TASKNEEDED) > 0) {
                this.state = 2;
                Game.taskState.setTaskState(this.event.ID, 2);

                this.node.destroy();
                Game.mapState.removeEntity(this.floorId, this.grid);

                showTalk(this.title, this.event.TASKEND, TalkType.Normal, callback);
            } else {
                showTalk(this.title, this.event.TASKING, TalkType.Normal, callback);
            }
        }
    },
});