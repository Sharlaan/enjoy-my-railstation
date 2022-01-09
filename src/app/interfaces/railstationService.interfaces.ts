export type RailStationServices<WithBest = false> = Record<
  // ServiceName,
  string,
  {
    stations: string[]; // Rail station names
  } & (WithBest extends false
    ? unknown
    : {
        // One single rail station name for the final output
        // Or a temp array of ratios for computeBestStations()
        bestStation: string | number[];
      })
>;
