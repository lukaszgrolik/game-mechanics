const runes = ['foo', 'bar', 'baz', 'lo', 'rem', 'ips', 'um', 'do', 'lor', 'sit', 'amet', 'luk', 'gro', 'lik', 'tere', 'fere', 'kil', 'fil', 'bif', 'bof', 'bil', 'fro'];
const bodyArmor = ['Leather Armor', 'Ring Mail', 'Scale Mail', 'Breast Plate', 'Plate Mail'];
const boots = ['boots', 'heavy boots', 'chain boots', 'plate boots'];
const gloves = ['leather gloves', 'heavy gloves', 'chain gloves', 'gauntlets'];
const axes = ['axe', 'double axe', 'broad axe', 'great axe'];
const maces = ['club', 'flail', 'war hammer', 'maul'];
const swords = ['short sword', 'broad sword', 'claymore', 'great sword'];
const bows = ['short bow', 'long bow', 'battle bow', 'war bow'];
const other = ['amulet', 'ring', 'health potion', 'mana potion', 'arrows', 'key'];

const items = [
    ...runes,
    ...bodyArmor,
    ...boots,
    ...gloves,
    ...axes,
    ...maces,
    ...swords,
    ...bows,
    ...other,
];

const agentVersions = [
    {
        name: 'Normal'
    },
    {
        name: 'Champion'
    },
    {
        name: 'Unique'
    },
    {
        name: 'Boss'
    },
]
const agentsClasses = [
    {
        name: 'Ghoul',
    },
    {
        name: 'Skeleton',
    },
    {
        name: 'Possessed Warrior',
    },
    {
        name: 'Orc',
    },
    {
        name: 'Uruk',
    },
    {
        name: 'Ogre',
    },
    {
        name: 'Cave Troll',
    },
    {
        name: 'Mountain Troll',
    },
    {
        name: 'Blood Elf',
    },
    {
        name: 'Night Elf',
    },
    {
        name: 'Dark Elf',
    },
    {
        name: 'Dark Ent'
    },
    {
        name: 'Fungous Ent'
    },
];
const locations = [
    {
        name: 'March',
    },
    {
        name: 'Cave'
    },
    {
        name: 'Forest'
    },
    {
        name: 'Forest Temple'
    },
    {
        name: 'Steppes'
    },
    {
        name: 'Ancient Tomb'
    },
];

function drop() {
    const index = Math.floor(Math.random() * items.length);

    return items[index];
}


function killArea(n) {
    const items = [];

    for (let i = 0; i < n; ++i) {
        // @todo various drop amount per different agent versions
        // @todo prevent dropping the same item
        // @todo no more than 1 key
        // @todo no more than 1 rune
        const enemyDrops = Math.floor(Math.random() * 3);
        for (let j = 0; j <= enemyDrops; ++j) {
            const item = drop();
            items.push(item);
        }
    }

    return items;
}

function logDrops(items) {
    const res = items.reduce((memo, item) => {
        const found = memo.find(i => i.item === item);

        if (!found)
            memo.push({item, count: 1});
        else
            found.count += 1;

        return memo;
    }, []).sort((a, b) => a.count < b.count);

    console.log('drop stats:', res);
}

const totalDroppedItems = [];

for (let i = 0; i < 100; ++i) {
    const droppedItems = killArea(10);
    totalDroppedItems.push(...droppedItems);
}

logDrops(totalDroppedItems);