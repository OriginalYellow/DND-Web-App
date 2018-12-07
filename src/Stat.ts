export class Stat {
    private constructor(
        public readonly shortName: string,
        public readonly longName: string,
        public val: number
    ) { }

    public static AC = Stat.CreateFactory('ac', 'armor class');
    public static Dex = Stat.CreateFactory('dex', 'dexterity');
    public static Str = Stat.CreateFactory('str', 'strength');
    public static Int = Stat.CreateFactory('int', 'intelligence');
    public static Char = Stat.CreateFactory('char', 'charisma');

    private static CreateFactory(shortName: string, longName: string): (val: number) => Stat {
        return (val: number) => new Stat(shortName, longName, val);
    }
}