export class Stat {
    private constructor(
        public readonly shortName: string,
        public readonly longName: string,
        public val: number
    ) { }

    public static AC(val: number) {
        return new Stat('AC', 'Armor Class', val);
    }

    public static Dex(val: number) {
        return new Stat('DEX', 'Dexterity', val);
    }

    public static Str(val: number) {
        return new Stat('STR', 'Strength', val);
    }

    public static Int(val: number) {
        return new Stat('INT', 'Intelligence', val);
    }

    public static Char(val: number) {
        return new Stat('Char', 'Charisma', val);
    }
}