export class Author {

  private idA: number;
  private nameA: string;
  private birthDateA: Date;
  private imageA: string;
  private descriptionA: string;

  constructor(id?: number, name?: string, birthDate?: Date, image?: string,
              description?: string) {
    this.idA = id;
    this.nameA = name;
    this.birthDateA = birthDate;
    this.imageA = image;
    this.descriptionA = description;
  }

  get id(): number { return this.idA; }

  /**
   * The author's name
   */
  get name(): string { return this.nameA; }
  set name(pName) {this.nameA = pName; }

  /**
   * Author's date of birth
   */
  get birthDate(): Date { return this.birthDateA; }
  set birthDate(pBirthDate) {this.birthDateA = pBirthDate; }

  /**
   * The location of the author's profile picture
   */
  get image(): string { return this.imageA; }
  set image(pImage) {this.imageA = pImage; }

  /**
   * A brief description of the author's life
   */
  get description(): string { return this.descriptionA; }
  set description(pDescription) {this.descriptionA = pDescription; }
}
