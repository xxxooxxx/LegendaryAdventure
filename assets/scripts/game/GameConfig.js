
/**
 * sceneId和floorId均从0开始计数
 */

cc.js.get(exports, 'maxSceneId', function () {
    return 10;
});

cc.js.get(exports, 'maxFloors', function () {
    return 101;
});

cc.js.get(exports, 'maxTasks', function () {
    return 21;
});

cc.js.get(exports, 'maxLevels', function () {
    return 99;
});

exports.getSceneId = function (floorId) {
    let sceneId = Math.floor(floorId / 10);
    if (floorId % 10 !== 0) {
        sceneId += 1;
    }
    cc.assert(sceneId <= 10, `floorId exceeds maxSceneId: ${sceneId}`);
    return sceneId;
};

exports.getFirstFloorOfScene = function (sceneId) {
    if (sceneId === 0) {
        return 0;
    } else {
        return (sceneId-1)*10 + 1;
    }
};

const sceneNames = [
    '前厅', 
    '王宫', '花园', '海城', '墓地', '森林', 
    '雪原', '洞窟', '机械', '天空', '魔域',
];
exports.getSceneName = function (sceneId) {
    return sceneNames[sceneId];
};

const specialMonsterSet = new Set([
    102, 103, 109, 110, 111,
    126, 127, 128, 129, 130, 131, 132, 133, 134,
]);
exports.isMonster = function (gid) {
    return (gid >= 226 && gid <= 329) || specialMonsterSet.has(gid);
};

const itemRanges = [
    [39, 50], [64, 75], [89, 100], [114, 125], [139, 193],
];
const itemSet = new Set([
    360,
]);
itemRanges.forEach(range => {
    for (let i = range[0]; i <= range[1]; i++) {
        itemSet.add(i);
    }
});
exports.isItem = function (gid) {
    return itemSet.has(gid);
};

const specialNpcSet = new Set([
    101, 104, 105, 106, 107,
]);
exports.isNpc = function (gid) {
    return (gid >= 1 && gid <= 22) || specialNpcSet.has(gid);
};

exports.isPrincess = function (gid) {
    return gid >= 1 && gid <= 22;
};

const doorSet = new Set([
    351, 352, 353, 354, 355, 356, 357, 358, 359,
    410, 411, 412, 413, 414, 415,
    403, 404, 409, 821, 1001,
]);
exports.isDoor = function (gid) {
    return doorSet.has(gid);
};

const staticSet = new Set([
    401, 402, 405, 406, 416, 417, 418, 419, 421, 422, 423,
    23, 24,
]);
exports.isStaticItem = function (gid) {
    return staticSet.has(gid);
};

exports.isTrigger = function (gid) {
    return gid === 408;
};

const unknownSet = new Set([
    204,
]);
exports.isUnknown = function (gid) {
    return unknownSet.has(gid);
};

const infiniteItemSet = new Set([
    176, 177, 178, 179, 180, 181,
    2001,
]);
exports.isInfiniteItem = function (gid) {
    return infiniteItemSet.has(gid);
};

exports.isKeyItem = function (gid) {
    return gid == 155 || gid == 156 || gid == 157;
};

exports.isSwordItem = function (gid) {
    return gid >= 176 && gid <= 181;
};

exports.isShieldItem = function (gid) {
    return gid >= 182 && gid <= 187;
};

exports.isBoxItem = function (gid) {
    return gid == 401 || gid == 402 || gid == 419;
};

exports.isBloodItem = function (gid) {
    return gid == 151 || gid == 152;
};

exports.isGemItem = function (gid) {
    return gid == 153 || gid == 154;
};

exports.isBombItem = function (gid) {
    return gid == 360;
};

const swordStoneSet = new Set([
    39, 40, 41, 42, 43, 44,
    64, 65, 66, 67, 68, 69,
    89, 90, 91, 92, 93, 94,
    114, 115, 116, 117, 118, 119,
    139, 140, 141, 142, 143, 144,
]);
exports.isSwordStoneItem = function (gid) {
    return swordStoneSet.has(gid);
};

const shieldStoneSet = new Set([
    45, 46, 47, 48, 49, 50,
    70, 71, 72, 73, 74, 75,
    95, 96, 97, 98, 99, 100,
    120, 121, 122, 123, 124, 125,
    145, 146, 147, 148, 149, 150,
]);
exports.isShieldStoneItem = function (gid) {
    return shieldStoneSet.has(gid);
};

exports.getEquipmentLevel = function (gid) {
    if (exports.isSwordItem(gid)) {
        return gid - 176 + 1;
    } else if (exports.isShieldItem(gid)) {
        return gid - 182 + 1;
    }
};

exports.isEquipmentMaxLevel = function (gid) {
    const level = exports.getEquipmentLevel(gid);
    return level && level >= 6;
};

exports.isInstantUseItem = function (gid) {
    return gid == 153 || gid == 154;
};

exports.NPC_BEI_ER = 9;
exports.KEY_YELLOW = 155;
exports.KEY_BLUE = 156;
exports.KEY_RED = 157;
exports.ITEM_RESPAWN = 2002;
