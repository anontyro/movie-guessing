export class MovieMetaData {
  constructor(
    total: number,
    totalEmpty: number,
    totalGuessed: number,
    totalUnguessed: number,
    weeksLeft: number,
    monthsLeft: number,
  ) {
    this.Total = total;
    this.TotalEmpty = totalEmpty;
    this.TotalGuessed = totalGuessed;
    this.TotalUnguessed = totalUnguessed;
    this.WeeksLeft = weeksLeft;
    this.MonthsLeft = monthsLeft;
  }
  public Total: number;
  public TotalEmpty: number;
  public TotalGuessed: number;
  public TotalUnguessed: number;
  public WeeksLeft: number;
  public MonthsLeft: number;
}
