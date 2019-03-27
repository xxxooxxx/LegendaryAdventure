
const GameProfile = require('GameProfile');
const GameConfig = require('GameConfig');

cc.Class({
    mixins: [cc.EventTarget],

    ctor () {
        this._coins = GameProfile.coins;
        this._items = GameProfile.items;
    },

    addItem (gid, num = 1) {
        gid = this._parseGid(gid);
        let item = this._getItem(gid);
        if (!item) {
            item = {gid: gid, num: num};
            this._items.push(item);
        } else {
            item.num += num;
        }
        cc.assert(item.num >= 0, `don't has enough item to be removed`);

        this.emit('add-item', gid, num);
    },

    reduceItem (gid, num = 1) {
        gid = this._parseGid(gid);
        const item = this._getItem(gid);
        cc.assert(item, `item not exist ${gid}`);
        if (GameConfig.isInfiniteItem(gid)) return;

        item.num -= num;
        cc.assert(item.num >= 0, `don't has enough item to be removed`);

        this.emit('remove-item', gid, num);
    },

    getNumOfItem (gid) {
        gid = this._parseGid(gid);
        const item = this._getItem(gid);
        return item ? item.num : 0;
    },

    getItems () {
        return this._items.map(item => ({gid: item.gid, num: item.num}))
            .filter(item => item.num > 0);
    },

    hasItem (gid) {
        gid = this._parseGid(gid);
        const item = this._getItem(gid);
        return item && item.num > 0;
    },

    plusCoins (num) {
        this._coins += num;
        cc.assert(tihs._coins >= 0, 'coins less than 0');
    },

    minusCoins (num) {
        this._coins -= num;
        cc.assert(tihs._coins >= 0, 'coins less than 0');
    },

    getNumOfCoins () {
        return this._coins;
    },

    _getItem (gid) {
        gid = this._parseGid(gid);
        const index = this._items.findIndex(item => item.gid === gid);
        return index >= 0 ? this._items[index] : null;
    },

    _parseGid (gid) {
        return Number.parseInt(gid);
    },
});
