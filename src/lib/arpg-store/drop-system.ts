// const runes = ['foo', 'bar', 'baz', 'lo', 'rem', 'ips', 'um', 'do', 'lor', 'sit', 'amet', 'luk', 'gro', 'lik', 'tere', 'fere', 'kil', 'fil', 'bif', 'bof', 'bil', 'fro'];

import { IItem } from "./item-system";
import * as random from '../../lib/random';

namespace ItemConfig {
  export const items_runes = `
  El | 11
  Eld | 11
  Tir | 13
  Nef | 13
  Eth | 15
  Ith | 15
  Tal | 17
  Ral | 19
  Ort | 21
  Thul | 23
  Amn | 25
  Sol | 27
  Shael | 29
  Dol | 31
  Hel | 0
  Io | 35
  Lum | 37
  Ko | 39
  Fal | 41
  Lem | 43
  Pul | 45
  Um | 47
  Mal | 49
  Ist | 51
  Gul | 53
  Vex | 55
  Ohm | 57
  Lo | 59
  Sur | 61
  Ber | 63
  Jah | 65
  Cham | 67
  Zod | 69
  `.trim().split('\n').map(r => {
    const [name, requiredLevel] = r.trim().split(' | ');

    return {name, requiredLevel: parseInt(requiredLevel)}
  });

  export const items_bodyArmor = ['Leather Armor', 'Ring Mail', 'Scale Mail', 'Breast Plate', 'Plate Mail'];
  export const items_boots = ['boots', 'heavy boots', 'chain boots', 'plate boots'];
  export const items_gloves = ['leather gloves', 'heavy gloves', 'chain gloves', 'gauntlets'];
  export const items_axes = ['axe', 'double axe', 'broad axe', 'great axe'];
  export const items_maces = ['club', 'flail', 'war hammer', 'maul'];
  export const items_swords = ['short sword', 'broad sword', 'claymore', 'great sword'];
  export const items_bows = ['short bow', 'long bow', 'battle bow', 'war bow'];
  export const items_other = ['health potion', 'mana potion', 'arrows', 'key', 'portal scroll', 'identification scroll'];

  // 30 + 20 + 3x2 + 1x3
  export const items_uniqueRings = `
  Nagelring | 15/59 | 7
  Manald Heal | 15/59 | 15
  Stone of Jordan | 1/59 | 29
  Dwarf Star | 10/59 | 45
  Raven Frost | 10/59 | 43
  Bul-Kathos' Wedding Band | 1/59 | 58
  Carrion Wind | 3/59 | 60
  Nature's Peace | 3/59 | 69
  Wisp Projector | 1/59 | 76
  `.trim().split('\n').map(r => {
    const [name, rarity, requiredLevel] = r.trim().split(' | ');

    return {name, rarity: rarity.split('/').map(n => parseInt(n)), requiredLevel};
  });

  export const items_regular = [
    ...items_bodyArmor,
    ...items_boots,
    ...items_gloves,
    ...items_axes,
    ...items_maces,
    ...items_swords,
    ...items_bows,
    ...items_uniqueRings,
  ]
  export const items_all = [
    ...items_regular,
    ...items_runes,
    ...items_other,
  ];

  const agentVersions = [
    { name: 'Normal' },
    { name: 'Champion' },
    { name: 'Unique' },
    { name: 'Boss' },
  ]
  const agentClasses = [
    { name: 'Ghoul', },
    { name: 'Skeleton', },
    { name: 'Possessed Warrior', },
    { name: 'Orc', },
    { name: 'Uruk', },
    { name: 'Ogre', },
    { name: 'Cave Troll', },
    { name: 'Mountain Troll', },
    { name: 'Blood Elf', },
    { name: 'Night Elf', },
    { name: 'Dark Elf', },
    { name: 'Dark Ent' },
    { name: 'Fungous Ent' },
  ];
  const locations = [
    { name: 'March', },
    { name: 'Cave' },
    { name: 'Forest' },
    { name: 'Forest Temple' },
    { name: 'Steppes' },
    { name: 'Ancient Tomb' },
  ];
}

export class DropSystem {
  // drop(items: IItem[] = ItemConfig.items_all): IItem[] {
  drop(): IItem[] {
    // @todo normal or geometric distrubution
    // @todo various drop amount per different agent versions
    // @todo prevent dropping the same item
    // @todo no more than 1 potion of each kind
    // @todo no more than 1 key
    // @todo no more than 1 rune
    const res: IItem[] = [];

    // regular item

    if (Math.random() < 1 / 3) {

      // const count = random.range(0, 5 + 1);
      const count = random.weighted.value([24, 15, 7, 3, 1]) + 1;

      const newItems = random.samples(ItemConfig.items_regular, count);
      res.push(...newItems);
    }

    // rune

    if (Math.random() < 0.04) {
      // const count = random.weighted.value([95, 4, 1]) + 1;
      const count = 1;

      const geoSeq = (base: number, mp = 2, start = 0, parts = 1) => (x: number) => base * mp ** ((x + start) / parts);
      const g1 = geoSeq(1, 1.5);
      const weights = new Array(ItemConfig.items_runes.length).fill(null).map((_, x) => Math.round(g1(x))).reverse();

      for (let i = 0; i < count; i++) {
        // 14
        // 11
        // 8

        const newItem = random.weighted.sample(weights, ItemConfig.items_runes);
        res.push(newItem);
      }
    }

    // other .25 = 40/50 1 item | 6/50 2 items | 3/50 3 items | 1/50 4 items

    if (Math.random() < 1 / 6) {
      // const count = random.range(1, ItemConfig.items_other.length + 1);
      const count = random.weighted.value([40, 6, 3, 1]) + 1;
      const newItems = random.samples(ItemConfig.items_other, count);
      res.push(...newItems);
    }

    return res;
  }

  areaDrop(dropperCount: number) {
    if (dropperCount < 0) throw new Error("droppers count must be positive");

    const items: IItem[] = [];

    for (let i = 0; i < dropperCount; ++i) {
      const droppedItems = this.drop();

      if (droppedItems.length > 0) {
        items.push(...droppedItems);
      }
    }

    return items;
  }

  // killAreas(areasCount: number) {
  //   const totalDroppedItems: IItem[] = [];

  //   for (let i = 0; i < areasCount; ++i) {
  //     const droppedItems = this.killArea(10);
  //     totalDroppedItems.push(...droppedItems);
  //   }

  //   this.logDrops(totalDroppedItems);
  // }

  logDrops(items: IItem[]) {

    // console.log('drop stats:', res);
    const regular = listItems(items, ItemConfig.items_regular)
    const runes = listItems(items, ItemConfig.items_runes)
    const other = listItems(items, ItemConfig.items_other)
    const all = listItems(items, ItemConfig.items_all)

    return {
      count: {
        regular: regular.count,
        runes: runes.count,
        other: other.count,
        total: all.count,
      },
      regular: regular.items,
      runes: runes.items,
      other: other.items,
      all: all.items,
    };

    function listItems(items: IItem[], allowedItems: IItem[]) {
      type Res = { items: { item: IItem; count: number; }[], count: number; };

      let count = 0;
      const resItems = items.reduce<Res['items']>((memo, item) => {
        if (allowedItems.includes(item) === false) return memo;

        const found = memo.find(i => i.item === item);

        if (!found)
          memo.push({ item, count: 1 });
        else
          found.count += 1;

        count += 1;

        return memo;
      }, []).sort((a, b) => b.count - a.count);

      return { items: resItems, count };
    }
  }

  itemStats() {
    const attrs = [
      {text: '+$x to all skills', min: 1, max: 3},
      {text: '+$x to strength', min: 5, max: 15},
      {text: '+$x to life', min: 10, max: 30},
      {text: '+$x increased cast rate', min: 10, max: 20, step: 10},
      {text: '+$x faster hit recovery', min: 10, max: 15, step: 5},
      {text: '$x% life stolen after hit', min: 1, max: 5},
      {text: '+$x to mana after kill', min: 3, max: 8},
      {text: '+$x to all resistances', min: 10, max: 20},
      {text: '+$x fire resistance', min: 10, max: 25},
    ];

    const res = attrs.map(attr => {
      // @todo step
      const val = random.range(attr.min, attr.max + 1);

      const text = attr.text.replace('$x', val.toString());

      return `${text} (${attr.min}-${attr.max})`;
    });


    return res;
  }
}