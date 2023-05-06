namespace Data {
    const itemAttributes = `
        +$x to all skills
        +$x to strength
        +$x to life
        +$x increased cast rate
        +$x faster hit recovery
        $x% life stolen after hit
        +$x to mana after kill
        +$x to all resistances
        +$x fire resistance
    `;

    const itemCategories = `
        Armor
            Body Armor
                Leather Armor
                Ring Mail
                Scale Mail
                Breast Plate
                Plate Mail
            Helm
            Boots
                'boots', 'heavy boots', 'chain boots', 'plate boots'
            Gloves
                'leather gloves', 'heavy gloves', 'chain gloves', 'gauntlets'
        Weapon
            axes = ['axe', 'double axe', 'broad axe', 'great axe'];
            maces = ['club', 'flail', 'war hammer', 'maul'];
            swords = ['short sword', 'broad sword', 'claymore', 'great sword'];
            bows = ['short bow', 'long bow', 'battle bow', 'war bow'];
        Jewelry
            Ring
            Amulet
        Other
            health potion
            mana potion
            arrows
            key
    `

    class ItemCategory {
        category;

        constructor(category: ItemCategory) {
            this.category = category;
        }
    }

    class ItemProperty {

    }

    class ItemAttribute {

    }

    class Item {
        category;

        constructor(category: ItemCategory) {
            this.category = category
        }
    }
}

export interface IItem {

}

class Item {

}

